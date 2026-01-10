import { createMiddleware } from '@tanstack/react-start'
import { getInitialPreferences } from '@/backend/lib/preferences'

export const preferencesMiddleware = createMiddleware().server(async ({ next }) => {
  const { initialTheme, initialLanguage } = getInitialPreferences()
  return next({ context: { initialTheme, initialLanguage } })
})
