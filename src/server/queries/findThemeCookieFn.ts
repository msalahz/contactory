import { createServerFn } from '@tanstack/react-start'
import { parseThemeCookie } from '@/server/modules/cookies'

export const findThemeCookieFn = createServerFn().handler(() => parseThemeCookie() ?? null)
