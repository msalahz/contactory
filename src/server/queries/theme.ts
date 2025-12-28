import { createServerFn } from '@tanstack/react-start'
import { parseThemeCookie } from '@/server/modules/theme'

export const findThemeCookieFn = createServerFn().handler(() => parseThemeCookie() ?? null)
