export type Language = 'en' | 'vi';

export interface Translations {
  // Header
  title: string;
  subtitle: string;
  
  // Tabs
  tabInput: string;
  tabAnalysis: string;
  tabRules: string;
  
  // Input Tab
  inputTitle: string;
  inputDescription: string;
  inputPlaceholder: string;
  btnAnalyze: string;
  btnDemo: string;
  btnReset: string;
  
  // Analysis Tab
  analysisTitle: string;
  analysisDescription: string;
  labelRuleId: string;
  labelSeverity: string;
  labelClientIp: string;
  labelHostname: string;
  labelUri: string;
  labelMethod: string;
  labelProtocol: string;
  labelTimestamp: string;
  labelMessage: string;
  labelRuleFile: string;
  labelTags: string;
  btnViewRules: string;
  
  // Rules Tab
  rulesTitle: string;
  rulesDescription: string;
  btnCopy: string;
  btnCopied: string;
  btnNewAnalysis: string;
  
  // Rule Levels
  levelGlobal: string;
  levelHostname: string;
  levelUri: string;
  levelMethod: string;
  levelIp: string;
  levelCombined: string;
  
  // Rule Descriptions
  descGlobal: string;
  descHostname: string;
  descUri: string;
  descMethod: string;
  descIp: string;
  descCombinedHostUri: string;
  descCombinedHostUriMethod: string;
  descCombinedIpUri: string;
  
  // Badges
  badgeRecommended: string;
  
  // Alerts
  alertEmptyLog: string;
  alertParseError: string;
  
  // Warning Alert
  warningTitle: string;
  warningMessage: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Header
    title: 'ModSecurity Whitelist Generator',
    subtitle: 'Generate ModSecurity whitelist rules from raw logs easily',
    
    // Tabs
    tabInput: 'Input Log',
    tabAnalysis: 'Analysis',
    tabRules: 'Whitelist Rules',
    
    // Input Tab
    inputTitle: 'Input ModSecurity Raw Log',
    inputDescription: 'Paste your ModSecurity error log here',
    inputPlaceholder: 'Paste raw log here...',
    btnAnalyze: 'Analyze Log',
    btnDemo: 'Use Demo Log',
    btnReset: 'Reset',
    
    // Analysis Tab
    analysisTitle: 'Log Analysis Results',
    analysisDescription: 'Detailed information extracted from ModSecurity log',
    labelRuleId: 'Rule ID',
    labelSeverity: 'Severity',
    labelClientIp: 'Client IP',
    labelHostname: 'Hostname',
    labelUri: 'URI',
    labelMethod: 'Request Method',
    labelProtocol: 'Protocol',
    labelTimestamp: 'Timestamp',
    labelMessage: 'Message',
    labelRuleFile: 'Rule File',
    labelTags: 'Tags',
    btnViewRules: 'View Whitelist Rules',
    
    // Rules Tab
    rulesTitle: 'Whitelist Rules',
    rulesDescription: 'Choose the appropriate whitelist level for your security needs',
    btnCopy: 'Copy',
    btnCopied: 'Copied!',
    btnNewAnalysis: 'Analyze New Log',
    
    // Rule Levels
    levelGlobal: 'GLOBAL',
    levelHostname: 'HOSTNAME',
    levelUri: 'URI',
    levelMethod: 'METHOD',
    levelIp: 'IP',
    levelCombined: 'COMBINED',
    
    // Rule Descriptions
    descGlobal: 'Disable rule globally (most permissive)',
    descHostname: 'Disable rule for hostname',
    descUri: 'Disable rule for URI',
    descMethod: 'Disable rule for method',
    descIp: 'Disable rule for IP',
    descCombinedHostUri: 'Disable rule for hostname + URI (recommended)',
    descCombinedHostUriMethod: 'Disable rule for hostname + URI + method (most restrictive)',
    descCombinedIpUri: 'Disable rule for IP + URI',
    
    // Badges
    badgeRecommended: '⭐ Recommended',
    
    // Alerts
    alertEmptyLog: 'Please enter a raw log',
    alertParseError: 'Unable to parse log. Please check the format.',
    
    // Warning Alert
    warningTitle: '⚠️ Important: Check Rule IDs',
    warningMessage: 'Before applying these rules to your system, please verify that the generated Rule IDs (88,000,000 - 89,999,999) do not conflict with existing rules in your ModSecurity configuration. If conflicts exist, manually modify the IDs to avoid configuration errors.',
  },
  
  vi: {
    // Header
    title: 'Công Cụ Tạo Whitelist ModSecurity',
    subtitle: 'Tạo whitelist rules cho ModSecurity từ raw logs một cách dễ dàng',
    
    // Tabs
    tabInput: 'Nhập Log',
    tabAnalysis: 'Phân Tích',
    tabRules: 'Whitelist Rules',
    
    // Input Tab
    inputTitle: 'Nhập ModSecurity Raw Log',
    inputDescription: 'Paste raw log từ ModSecurity error log của bạn vào đây',
    inputPlaceholder: 'Paste raw log tại đây...',
    btnAnalyze: 'Phân Tích Log',
    btnDemo: 'Sử Dụng Demo Log',
    btnReset: 'Reset',
    
    // Analysis Tab
    analysisTitle: 'Kết Quả Phân Tích Log',
    analysisDescription: 'Thông tin chi tiết được trích xuất từ ModSecurity log',
    labelRuleId: 'Rule ID',
    labelSeverity: 'Mức độ nghiêm trọng',
    labelClientIp: 'IP Client',
    labelHostname: 'Hostname',
    labelUri: 'URI',
    labelMethod: 'Phương thức',
    labelProtocol: 'Giao thức',
    labelTimestamp: 'Thời gian',
    labelMessage: 'Thông báo',
    labelRuleFile: 'File Rule',
    labelTags: 'Tags',
    btnViewRules: 'Xem Whitelist Rules',
    
    // Rules Tab
    rulesTitle: 'Whitelist Rules',
    rulesDescription: 'Chọn mức độ whitelist phù hợp với nhu cầu bảo mật của bạn',
    btnCopy: 'Copy',
    btnCopied: 'Đã Copy!',
    btnNewAnalysis: 'Phân Tích Log Mới',
    
    // Rule Levels
    levelGlobal: 'TOÀN CỤC',
    levelHostname: 'HOSTNAME',
    levelUri: 'URI',
    levelMethod: 'PHƯƠNG THỨC',
    levelIp: 'ĐỊA CHỈ IP',
    levelCombined: 'KẾT HỢP',
    
    // Rule Descriptions
    descGlobal: 'Tắt rule toàn bộ (nguy hiểm nhất)',
    descHostname: 'Tắt rule cho hostname',
    descUri: 'Tắt rule cho URI',
    descMethod: 'Tắt rule cho phương thức',
    descIp: 'Tắt rule cho IP',
    descCombinedHostUri: 'Tắt rule cho hostname + URI (khuyến nghị)',
    descCombinedHostUriMethod: 'Tắt rule cho hostname + URI + phương thức (an toàn nhất)',
    descCombinedIpUri: 'Tắt rule cho IP + URI',
    
    // Badges
    badgeRecommended: '⭐ Khuyến nghị',
    
    // Alerts
    alertEmptyLog: 'Vui lòng nhập raw log',
    alertParseError: 'Không thể phân tích log. Vui lòng kiểm tra định dạng.',
    
    // Warning Alert
    warningTitle: '⚠️ Lưu ý quan trọng: Kiểm tra Rule ID',
    warningMessage: 'Trước khi áp dụng các rules này vào hệ thống, vui lòng kiểm tra các Rule ID được tạo ra (88,000,000 - 89,999,999) có bị trùng với các rules hiện có trong cấu hình ModSecurity của bạn hay không. Nếu có xung đột, hãy thay đổi ID thủ công để tránh lỗi cấu hình.',
  },
};
