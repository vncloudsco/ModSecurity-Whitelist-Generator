import { ParsedLog } from './log-parser';

export type WhitelistLevel = 'global' | 'hostname' | 'uri' | 'method' | 'ip' | 'combined';

export interface WhitelistRule {
  level: WhitelistLevel;
  description: string;
  descriptionKey: string; // Key for translation
  rule: string;
  hostname?: string;
  uri?: string;
  method?: string;
  ip?: string;
}

export function generateWhitelistRules(parsedLog: ParsedLog): WhitelistRule[] {
  const rules: WhitelistRule[] = [];
  const ruleId = parsedLog.ruleId || '0';

  // 1. Global whitelist - Disable rule completely (most permissive)
  rules.push({
    level: 'global',
    description: 'Disable rule globally (most permissive)',
    descriptionKey: 'descGlobal',
    rule: `SecRuleRemoveById ${ruleId}`
  });

  // 2. Hostname-based whitelist
  if (parsedLog.hostname) {
    rules.push({
      level: 'hostname',
      description: `Disable rule for hostname: ${parsedLog.hostname}`,
      descriptionKey: 'descHostname',
      hostname: parsedLog.hostname,
      rule: `SecRule REQUEST_HEADERS:Host "@streq ${parsedLog.hostname}" \\
    "id:${generateCustomId()},\\
    phase:1,\\
    pass,\\
    nolog,\\
    ctl:ruleRemoveById=${ruleId}"`
    });
  }

  // 3. URI-based whitelist
  if (parsedLog.uri) {
    rules.push({
      level: 'uri',
      description: `Disable rule for URI: ${parsedLog.uri}`,
      descriptionKey: 'descUri',
      uri: parsedLog.uri,
      rule: `SecRule REQUEST_URI "@streq ${parsedLog.uri}" \\
    "id:${generateCustomId()},\\
    phase:1,\\
    pass,\\
    nolog,\\
    ctl:ruleRemoveById=${ruleId}"`
    });
  }

  // 4. Request Method-based whitelist
  if (parsedLog.requestMethod) {
    rules.push({
      level: 'method',
      description: `Disable rule for method: ${parsedLog.requestMethod}`,
      descriptionKey: 'descMethod',
      method: parsedLog.requestMethod,
      rule: `SecRule REQUEST_METHOD "@streq ${parsedLog.requestMethod}" \\
    "id:${generateCustomId()},\\
    phase:1,\\
    pass,\\
    nolog,\\
    ctl:ruleRemoveById=${ruleId}"`
    });
  }

  // 5. IP-based whitelist
  if (parsedLog.clientIp) {
    rules.push({
      level: 'ip',
      description: `Disable rule for IP: ${parsedLog.clientIp}`,
      descriptionKey: 'descIp',
      ip: parsedLog.clientIp,
      rule: `SecRule REMOTE_ADDR "@ipMatch ${parsedLog.clientIp}" \\
    "id:${generateCustomId()},\\
    phase:1,\\
    pass,\\
    nolog,\\
    ctl:ruleRemoveById=${ruleId}"`
    });
  }

  // 6. Combined whitelist - Hostname + URI (recommended)
  if (parsedLog.hostname && parsedLog.uri) {
    rules.push({
      level: 'combined',
      description: `Disable rule for hostname + URI (recommended)`,
      descriptionKey: 'descCombinedHostUri',
      hostname: parsedLog.hostname,
      uri: parsedLog.uri,
      rule: `SecRule REQUEST_HEADERS:Host "@streq ${parsedLog.hostname}" \\
    "id:${generateCustomId()},\\
    phase:1,\\
    pass,\\
    nolog,\\
    chain"
SecRule REQUEST_URI "@streq ${parsedLog.uri}" \\
    "ctl:ruleRemoveById=${ruleId}"`
    });
  }

  // 7. Combined whitelist - Hostname + URI + Method (most restrictive)
  if (parsedLog.hostname && parsedLog.uri && parsedLog.requestMethod) {
    rules.push({
      level: 'combined',
      description: `Disable rule for hostname + URI + method (most restrictive)`,
      descriptionKey: 'descCombinedHostUriMethod',
      hostname: parsedLog.hostname,
      uri: parsedLog.uri,
      method: parsedLog.requestMethod,
      rule: `SecRule REQUEST_HEADERS:Host "@streq ${parsedLog.hostname}" \\
    "id:${generateCustomId()},\\
    phase:1,\\
    pass,\\
    nolog,\\
    chain"
SecRule REQUEST_URI "@streq ${parsedLog.uri}" \\
    "chain"
SecRule REQUEST_METHOD "@streq ${parsedLog.requestMethod}" \\
    "ctl:ruleRemoveById=${ruleId}"`
    });
  }

  // 8. Combined whitelist - IP + URI
  if (parsedLog.clientIp && parsedLog.uri) {
    rules.push({
      level: 'combined',
      description: `Disable rule for IP + URI`,
      descriptionKey: 'descCombinedIpUri',
      ip: parsedLog.clientIp,
      uri: parsedLog.uri,
      rule: `SecRule REMOTE_ADDR "@ipMatch ${parsedLog.clientIp}" \\
    "id:${generateCustomId()},\\
    phase:1,\\
    pass,\\
    nolog,\\
    chain"
SecRule REQUEST_URI "@streq ${parsedLog.uri}" \\
    "ctl:ruleRemoveById=${ruleId}"`
    });
  }

  return rules;
}

// Generate a custom rule ID in range 88,000,000 - 89,999,999
// This range ensures no conflicts with existing ModSecurity rules
const MIN_CUSTOM_ID = 88000000;
const MAX_CUSTOM_ID = 89999999;
let customIdCounter = MIN_CUSTOM_ID;

function generateCustomId(): number {
  const id = customIdCounter++;
  // Reset to MIN if we exceed MAX to stay within range
  if (customIdCounter > MAX_CUSTOM_ID) {
    customIdCounter = MIN_CUSTOM_ID;
  }
  return id;
}

// Reset counter if needed
export function resetCustomIdCounter(startId: number = MIN_CUSTOM_ID): void {
  // Ensure startId is within valid range
  if (startId < MIN_CUSTOM_ID || startId > MAX_CUSTOM_ID) {
    customIdCounter = MIN_CUSTOM_ID;
  } else {
    customIdCounter = startId;
  }
}
