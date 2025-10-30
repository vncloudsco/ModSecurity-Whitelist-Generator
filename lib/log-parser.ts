export interface ParsedLog {
  timestamp: string;
  errorLevel: string;
  pid: string;
  clientIp: string;
  ruleFile: string;
  ruleLine: string;
  ruleId: string;
  ruleMsg: string;
  hostname: string;
  uri: string;
  uniqueId: string;
  requestMethod: string;
  protocol: string;
  severity: string;
  tags: string[];
  operator?: string;
  parameter?: string;
  variable?: string;
  variableValue?: string;
  totalScore?: string;
  version?: string;
}

export function parseModSecLog(rawLog: string): ParsedLog | null {
  try {
    const log: Partial<ParsedLog> = {};

    // Extract timestamp
    const timestampMatch = rawLog.match(/^(\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2})/);
    if (timestampMatch) {
      log.timestamp = timestampMatch[1];
    }

    // Extract error level
    const errorLevelMatch = rawLog.match(/\[(\w+)\]/);
    if (errorLevelMatch) {
      log.errorLevel = errorLevelMatch[1];
    }

    // Extract PID
    const pidMatch = rawLog.match(/(\d+)#(\d+)/);
    if (pidMatch) {
      log.pid = pidMatch[0];
    }

    // Extract client IP
    const clientMatch = rawLog.match(/\[client ([^\]]+)\]/);
    if (clientMatch) {
      log.clientIp = clientMatch[1];
    }

    // Extract rule file
    const fileMatch = rawLog.match(/\[file "([^"]+)"\]/);
    if (fileMatch) {
      log.ruleFile = fileMatch[1];
    }

    // Extract rule line
    const lineMatch = rawLog.match(/\[line "([^"]+)"\]/);
    if (lineMatch) {
      log.ruleLine = lineMatch[1];
    }

    // Extract rule ID
    const idMatch = rawLog.match(/\[id "([^"]+)"\]/);
    if (idMatch) {
      log.ruleId = idMatch[1];
    }

    // Extract message
    const msgMatch = rawLog.match(/\[msg "([^"]+)"\]/);
    if (msgMatch) {
      log.ruleMsg = msgMatch[1];
    }

    // Extract hostname
    const hostnameMatch = rawLog.match(/\[hostname "([^"]+)"\]/);
    if (hostnameMatch) {
      log.hostname = hostnameMatch[1];
    }

    // Extract URI
    const uriMatch = rawLog.match(/\[uri "([^"]+)"\]/);
    if (uriMatch) {
      log.uri = uriMatch[1];
    }

    // Extract unique ID
    const uniqueIdMatch = rawLog.match(/\[unique_id "([^"]+)"\]/);
    if (uniqueIdMatch) {
      log.uniqueId = uniqueIdMatch[1];
    }

    // Extract request method and protocol from request line
    const requestMatch = rawLog.match(/request: "(\w+) ([^ ]+) ([^"]+)"/);
    if (requestMatch) {
      log.requestMethod = requestMatch[1];
      log.protocol = requestMatch[3];
    }

    // Extract severity
    const severityMatch = rawLog.match(/\[severity "([^"]+)"\]/);
    if (severityMatch) {
      log.severity = severityMatch[1];
    }

    // Extract tags
    const tagMatches = rawLog.matchAll(/\[tag "([^"]+)"\]/g);
    log.tags = Array.from(tagMatches, m => m[1]);

    // Extract operator
    const operatorMatch = rawLog.match(/Matched "Operator ([^']+)'/);
    if (operatorMatch) {
      log.operator = operatorMatch[1];
    }

    // Extract parameter
    const paramMatch = rawLog.match(/with parameter ([^']+)'/);
    if (paramMatch) {
      log.parameter = paramMatch[1];
    }

    // Extract variable
    const variableMatch = rawLog.match(/against variable ([^']+)'/);
    if (variableMatch) {
      log.variable = variableMatch[1];
    }

    // Extract variable value
    const valueMatch = rawLog.match(/\(Value: ([^']+)'/);
    if (valueMatch) {
      log.variableValue = valueMatch[1];
    }

    // Extract total score
    const scoreMatch = rawLog.match(/Total Score: (\d+)/);
    if (scoreMatch) {
      log.totalScore = scoreMatch[1];
    }

    // Extract version
    const versionMatch = rawLog.match(/\[ver "([^"]+)"\]/);
    if (versionMatch) {
      log.version = versionMatch[1];
    }

    return log as ParsedLog;
  } catch (error) {
    console.error('Error parsing log:', error);
    return null;
  }
}
