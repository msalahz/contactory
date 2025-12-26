import { getCookie, setCookie } from '@tanstack/react-start/server'

import type { Theme } from '@/shared/theme/schemas'

import { themeSchema } from '@/shared/theme/schemas'

export const parseThemeCookie = () => {
  const theme = getCookie('theme')
  return themeSchema.safeParse(theme).data
}

export function setThemeCookie(theme: Theme) {
  setCookie('theme', theme, {
    path: '/',
    maxAge: 365 * 24 * 60 * 60, // 1 year
  })
}
