'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { Button } from '@/components/ui/button'
import { Languages } from 'lucide-react'

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'vi' : 'en')
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="gap-2"
    >
      <Languages className="w-4 h-4" />
      {language === 'en' ? 'Tiếng Việt' : 'English'}
    </Button>
  )
}
