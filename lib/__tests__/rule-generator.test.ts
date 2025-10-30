import { generateWhitelistRules, resetCustomIdCounter } from '../rule-generator';
import { ParsedLog } from '../log-parser';

describe('Rule Generator', () => {
  beforeEach(() => {
    // Reset counter before each test
    resetCustomIdCounter();
  });

  const mockLog: ParsedLog = {
    timestamp: '2025/10/30 10:22:36',
    errorLevel: 'error',
    pid: '36552#36552',
    clientIp: '206.189.2.13',
    ruleFile: '/etc/nginx/modsec/coreruleset/rules/REQUEST-949-BLOCKING-EVALUATION.conf',
    ruleLine: '222',
    ruleId: '949110',
    ruleMsg: 'Inbound Anomaly Score Exceeded',
    hostname: 'dev.nginxwaf.me',
    uri: '/config.json',
    uniqueId: '176181975684.311840',
    requestMethod: 'GET',
    protocol: 'HTTP/1.1',
    severity: '0',
    tags: ['anomaly-evaluation', 'OWASP_CRS'],
  };

  test('should generate rules with IDs in range 88,000,000 - 89,999,999', () => {
    const rules = generateWhitelistRules(mockLog);
    
    // Extract all IDs from generated rules
    const idMatches = rules.map(rule => {
      const match = rule.rule.match(/id:(\d+)/);
      return match ? parseInt(match[1]) : null;
    }).filter(id => id !== null);

    // Check all IDs are in valid range
    idMatches.forEach(id => {
      expect(id).toBeGreaterThanOrEqual(88000000);
      expect(id).toBeLessThanOrEqual(89999999);
    });
  });

  test('should generate sequential IDs', () => {
    const rules1 = generateWhitelistRules(mockLog);
    const rules2 = generateWhitelistRules(mockLog);

    const getFirstId = (rules: any[]) => {
      const match = rules[1].rule.match(/id:(\d+)/);
      return match ? parseInt(match[1]) : 0;
    };

    const firstId1 = getFirstId(rules1);
    const firstId2 = getFirstId(rules2);

    // Second batch should have higher IDs
    expect(firstId2).toBeGreaterThan(firstId1);
  });

  test('should reset counter correctly', () => {
    // Generate some rules
    generateWhitelistRules(mockLog);
    
    // Reset counter
    resetCustomIdCounter(88500000);
    
    const rules = generateWhitelistRules(mockLog);
    const match = rules[1].rule.match(/id:(\d+)/);
    const id = match ? parseInt(match[1]) : 0;

    expect(id).toBe(88500000);
  });

  test('should handle invalid reset values', () => {
    // Try to reset with invalid value (too low)
    resetCustomIdCounter(1000);
    
    const rules = generateWhitelistRules(mockLog);
    const match = rules[1].rule.match(/id:(\d+)/);
    const id = match ? parseInt(match[1]) : 0;

    // Should default to MIN_CUSTOM_ID
    expect(id).toBe(88000000);
  });

  test('should generate all rule types', () => {
    const rules = generateWhitelistRules(mockLog);

    // Should have multiple rules
    expect(rules.length).toBeGreaterThan(5);

    // Check for different rule types
    const levels = rules.map(r => r.level);
    expect(levels).toContain('global');
    expect(levels).toContain('hostname');
    expect(levels).toContain('uri');
    expect(levels).toContain('method');
    expect(levels).toContain('ip');
    expect(levels).toContain('combined');
  });
});
