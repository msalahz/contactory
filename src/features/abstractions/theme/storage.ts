import { getCookie, setCookie } from '@tanstack/react-start/server'

import type { Theme } from '@/features/abstractions/theme/models'

import { themeSchema } from '@/features/abstractions/theme/models'

/**
 * @description Finds the theme cookie value and parses it into a Theme type.
 */
export const findThemeCookie = () => {
  const theme = getCookie('theme')
  return themeSchema.safeParse(theme).data
}

/**
 * @description Sets the theme cookie value.
 */
export function setThemeCookie(theme: Theme) {
  setCookie('theme', theme, {
    path: '/',
    maxAge: 365 * 24 * 60 * 60, // 1 year
  })
}
