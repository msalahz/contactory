import { createServerFn } from '@tanstack/react-start'
import { parseThemeCookie } from '@/shared/theme/server/cookie'

export const findThemeCookieFn = createServerFn().handler(parseThemeCookie)
