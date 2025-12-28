import { getCookie, setCookie } from '@tanstack/react-start/server'

import type { Theme } from '@/server/schemas/theme'

import { themeSchema } from '@/server/schemas/theme'

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
