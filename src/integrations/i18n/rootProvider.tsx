import { I18nextProvider } from 'react-i18next'

import type { Language } from '@/server/schemas/shared'

export interface I18nProviderProps extends React.ComponentProps<typeof I18nextProvider> {
  initialLanguage: Language
}

export function I18nProvider({ initialLanguage, i18n, ...props }: I18nProviderProps) {
  if (i18n.language !== initialLanguage) {
    i18n.changeLanguage(initialLanguage)
  }

  return <I18nextProvider i18n={i18n} {...props} />
}
