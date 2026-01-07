import { I18nextProvider } from 'react-i18next'

import type { Language } from '@/server/schemas/shared'

export interface I18nProviderProps extends React.ComponentProps<typeof I18nextProvider> {
  initialLanguage: Language
}

export function I18nProvider({ initialLanguage, i18n, ...props }: I18nProviderProps) {
  // Synchronously set language before the first render to avoid hydration mismatch.
  // This is safe because initialLanguage comes from the server (beforeLoad),
  // so both SSR and client will have the same value on the first render.
  if (i18n.language !== initialLanguage) {
    i18n.changeLanguage(initialLanguage)
  }

  return <I18nextProvider i18n={i18n} {...props} />
}
