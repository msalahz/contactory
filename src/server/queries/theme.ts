import { createServerFn } from '@tanstack/react-start'
import { parseThemeCookie } from '@/server/modules/theme'

export const theme = createServerFn().handler(() => parseThemeCookie() ?? null)
