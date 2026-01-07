import { createMiddleware } from '@tanstack/react-start'
import { getInitialPreferences } from '@/server/modules/shared'

export const preferencesMiddleware = createMiddleware().server(async ({ next }) => {
  const { initialTheme, initialLanguage } = getInitialPreferences()
  return next({ context: { initialTheme, initialLanguage } })
})
