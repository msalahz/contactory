import { parseThemeCookie } from '@/server/modules/theme'

export function getInitialPreferences() {
  const initialTheme = parseThemeCookie() ?? 'dark'

  return {
    initialTheme,
  }
}
