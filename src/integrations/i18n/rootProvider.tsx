import { I18nextProvider } from 'react-i18next'
import { useEffect, useEffectEvent } from 'react'

import type { Language } from '@/server/schemas/shared'
import { updateDocument } from '@/integrations/i18n/i18n'

export interface I18nProviderProps extends React.ComponentProps<typeof I18nextProvider> {
  initialLanguage: Language
}

export function I18nProvider({ initialLanguage, i18n, ...props }: I18nProviderProps) {
  i18n.changeLanguage(initialLanguage)

  const updateDocumentDir = useEffectEvent(() => {
    updateDocument(initialLanguage, i18n.dir(initialLanguage))
  })

  useEffect(() => {
    updateDocumentDir()
  }, [])

  return <I18nextProvider i18n={i18n} {...props} />
}
