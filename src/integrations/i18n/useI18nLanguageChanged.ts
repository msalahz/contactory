import i18n from 'i18next'
import { useEffect, useEffectEvent } from 'react'

import type { SupportedLanguage } from '@/integrations/i18n/resources'

export function useI18nLanguageChanged(handleLanguageChange: (lang: SupportedLanguage) => void) {
  const languageChangeEvent = useEffectEvent((lang: SupportedLanguage) =>
    handleLanguageChange(lang),
  )
  useEffect(() => {
    i18n.on('languageChanged', languageChangeEvent)

    // Cleanup function: remove the event listener when the component unmounts
    return () => {
      i18n.off('languageChanged', languageChangeEvent)
    }
  }, [])
}
