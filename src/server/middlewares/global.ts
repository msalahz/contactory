import { createMiddleware } from '@tanstack/react-start'
import { getInitialPreferences } from '@/server/modules/global'

export const preferencesMiddleware = createMiddleware().server(async ({ next }) => {
  const { initialTheme } = getInitialPreferences()
  return next({ context: { initialTheme } })
})
