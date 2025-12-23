import { createServerFn } from '@tanstack/react-start'

import { themeSchema } from '@/features/abstractions/theme/models'
import { findThemeCookie, setThemeCookie } from '@/features/abstractions/theme/storage'

/**
 * @description Server function to get the theme from the cookie
 */
export const findThemeCookieFn = createServerFn().handler(() => findThemeCookie())

/**
 * @description Server function to set the theme cookie
 */
export const setThemeCookieFn = createServerFn({ method: 'POST' })
  .inputValidator(themeSchema)
  .handler(({ data: theme }) => setThemeCookie(theme))
