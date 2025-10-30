'use client'

import { useState } from 'react'
import { parseModSecLog, ParsedLog } from '@/lib/log-parser'
import { generateWhitelistRules, WhitelistRule } from '@/lib/rule-generator'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, AlertTriangle, CheckCircle2, Copy, FileText, Shield } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { LanguageToggle } from '@/components/LanguageToggle'

export default function Home() {
  const { t } = useLanguage()
  const [rawLog, setRawLog] = useState('')
  const [parsedLog, setParsedLog] = useState<ParsedLog | null>(null)
  const [whitelistRules, setWhitelistRules] = useState<WhitelistRule[]>([])
  const [activeTab, setActiveTab] = useState('input')
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleAnalyze = () => {
    if (!rawLog.trim()) {
      alert(t.alertEmptyLog)
      return
    }

    const parsed = parseModSecLog(rawLog)
    if (!parsed) {
      alert(t.alertParseError)
      return
    }

    setParsedLog(parsed)
    const rules = generateWhitelistRules(parsed)
    setWhitelistRules(rules)
    setActiveTab('analysis')
  }

  const handleCopyRule = (rule: string, index: number) => {
    navigator.clipboard.writeText(rule)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const handleReset = () => {
    setRawLog('')
    setParsedLog(null)
    setWhitelistRules([])
    setActiveTab('input')
  }

  const demoLog = `2025/10/30 10:22:36 [error] 36552#36552: *121 [client 206.189.2.13] ModSecurity: Access denied with code 403 (phase 2). Matched "Operator Ge' with parameter 5' against variable TX:BLOCKING_INBOUND_ANOMALY_SCORE' (Value: 5' ) [file "/etc/nginx/modsec/coreruleset/rules/REQUEST-949-BLOCKING-EVALUATION.conf"] [line "222"] [id "949110"] [rev ""] [msg "Inbound Anomaly Score Exceeded (Total Score: 5)"] [data ""] [severity "0"] [ver "OWASP_CRS/4.20.0-dev"] [maturity "0"] [accuracy "0"] [tag "anomaly-evaluation"] [tag "OWASP_CRS"] [hostname "dev.nginxwaf.me"] [uri "/config.json"] [unique_id "176181975684.311840"] [ref ""], client: 206.189.2.13, server: dev.nginxwaf.me, request: "GET /config.json HTTP/1.1", host: "dev.nginxwaf.me"`

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-12 h-12 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              {t.title}
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            {t.subtitle}
          </p>
          <div className="mt-4 flex justify-center">
            <LanguageToggle />
          </div>
        </div>

        {/* Main Content */}
        <Tabs className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger 
              active={activeTab === 'input'}
              onClick={() => setActiveTab('input')}
            >
              <FileText className="w-4 h-4 mr-2" />
              {t.tabInput}
            </TabsTrigger>
            <TabsTrigger 
              active={activeTab === 'analysis'}
              onClick={() => setActiveTab('analysis')}
              disabled={!parsedLog}
            >
              <AlertCircle className="w-4 h-4 mr-2" />
              {t.tabAnalysis}
            </TabsTrigger>
            <TabsTrigger 
              active={activeTab === 'rules'}
              onClick={() => setActiveTab('rules')}
              disabled={!whitelistRules.length}
            >
              <Shield className="w-4 h-4 mr-2" />
              {t.tabRules}
            </TabsTrigger>
          </TabsList>

          {/* Input Tab */}
          <TabsContent className={activeTab === 'input' ? 'block' : 'hidden'}>
            <Card>
              <CardHeader>
                <CardTitle>{t.inputTitle}</CardTitle>
                <CardDescription>
                  {t.inputDescription}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder={t.inputPlaceholder}
                  value={rawLog}
                  onChange={(e) => setRawLog(e.target.value)}
                  className="min-h-[300px] font-mono text-sm"
                />
                <div className="flex gap-3">
                  <Button onClick={handleAnalyze} className="flex-1">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    {t.btnAnalyze}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setRawLog(demoLog)}
                  >
                    {t.btnDemo}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleReset}
                  >
                    {t.btnReset}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analysis Tab */}
          <TabsContent className={activeTab === 'analysis' ? 'block' : 'hidden'}>
            {parsedLog && (
              <Card>
                <CardHeader>
                  <CardTitle>{t.analysisTitle}</CardTitle>
                  <CardDescription>
                    {t.analysisDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoItem label={t.labelRuleId} value={parsedLog.ruleId} />
                    <InfoItem label={t.labelSeverity} value={parsedLog.severity} />
                    <InfoItem label={t.labelClientIp} value={parsedLog.clientIp} />
                    <InfoItem label={t.labelHostname} value={parsedLog.hostname} />
                    <InfoItem label={t.labelUri} value={parsedLog.uri} />
                    <InfoItem label={t.labelMethod} value={parsedLog.requestMethod} />
                    <InfoItem label={t.labelProtocol} value={parsedLog.protocol} />
                    <InfoItem label={t.labelTimestamp} value={parsedLog.timestamp} />
                    <div className="md:col-span-2">
                      <InfoItem label={t.labelMessage} value={parsedLog.ruleMsg} />
                    </div>
                    <div className="md:col-span-2">
                      <InfoItem label={t.labelRuleFile} value={parsedLog.ruleFile} />
                    </div>
                    {parsedLog.tags && parsedLog.tags.length > 0 && (
                      <div className="md:col-span-2">
                        <p className="text-sm font-medium mb-2">{t.labelTags}:</p>
                        <div className="flex flex-wrap gap-2">
                          {parsedLog.tags.map((tag, idx) => (
                            <Badge key={idx} variant="secondary">{tag}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button onClick={() => setActiveTab('rules')}>
                      {t.btnViewRules}
                      <Shield className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Rules Tab */}
          <TabsContent className={activeTab === 'rules' ? 'block' : 'hidden'}>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t.rulesTitle}</CardTitle>
                  <CardDescription>
                    {t.rulesDescription}
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Warning Alert */}
              <Alert variant="warning">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>{t.warningTitle}</AlertTitle>
                <AlertDescription>
                  {t.warningMessage}
                </AlertDescription>
              </Alert>

              {whitelistRules.map((rule, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={
                            rule.level === 'global' ? 'destructive' :
                            rule.level === 'combined' ? 'default' :
                            'secondary'
                          }>
                            {rule.level.toUpperCase()}
                          </Badge>
                          {rule.level === 'combined' && rule.description.includes('recommended') && (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              {t.badgeRecommended}
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="text-base">
                          {getTranslatedDescription(rule, t)}
                        </CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopyRule(rule.rule, index)}
                        className="ml-4"
                      >
                        {copiedIndex === index ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            {t.btnCopied}
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-2" />
                            {t.btnCopy}
                          </>
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{rule.rule}</code>
                    </pre>
                  </CardContent>
                </Card>
              ))}

              <div className="flex justify-center mt-6">
                <Button variant="outline" onClick={handleReset}>
                  {t.btnNewAnalysis}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

function getTranslatedDescription(rule: WhitelistRule, t: any): string {
  const key = rule.descriptionKey as keyof typeof t
  let desc = t[key] || rule.description
  
  // Add dynamic values
  if (rule.hostname) desc += `: ${rule.hostname}`
  if (rule.uri && !rule.hostname) desc += `: ${rule.uri}`
  if (rule.method && !rule.hostname && !rule.uri) desc += `: ${rule.method}`
  if (rule.ip && !rule.hostname && !rule.uri && !rule.method) desc += `: ${rule.ip}`
  
  return desc
}

function InfoItem({ label, value }: { label: string; value?: string }) {
  if (!value) return null
  
  return (
    <div className="space-y-1">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="text-sm font-mono bg-slate-100 dark:bg-slate-800 p-2 rounded border">
        {value}
      </p>
    </div>
  )
}
