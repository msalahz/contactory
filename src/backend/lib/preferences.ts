import { getCookie, setCookie } from '@tanstack/react-start/server'

import type { Language, Theme } from '@/core/schemas'
import {
  COOKIE_OPTIONS,
  LANGUAGE_COOKIE_NAME,
  LANGUAGE_DEFAULT,
  THEME_COOKIE_NAME,
  THEME_DEFAULT,
  languageSchema,
  themeSchema,
} from '@/core/schemas'

export const parseThemeCookie = () => {
  const theme = getCookie(THEME_COOKIE_NAME)
  return themeSchema.safeParse(theme).data
}

export function setThemeCookie(theme: Theme) {
  setCookie(THEME_COOKIE_NAME, theme, COOKIE_OPTIONS)
}

export function parseLanguageCookie() {
  const language = getCookie(LANGUAGE_COOKIE_NAME)
  return languageSchema.safeParse(language).data
}

export function setLanguageCookie(language: Language) {
  setCookie(LANGUAGE_COOKIE_NAME, language, COOKIE_OPTIONS)
}

export function getInitialPreferences() {
  const initialTheme = parseThemeCookie() ?? THEME_DEFAULT
  const initialLanguage = parseLanguageCookie() ?? LANGUAGE_DEFAULT

  return {
    initialTheme,
    initialLanguage,
  }
}
