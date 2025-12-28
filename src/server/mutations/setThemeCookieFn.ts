import { createServerFn } from '@tanstack/react-start'

import { themeSchema } from '@/server/schemas/theme'
import { setThemeCookie } from '@/server/modules/cookies'

export const setThemeCookieFn = createServerFn({ method: 'POST' })
  .inputValidator(themeSchema)
  .handler(({ data: theme }) => setThemeCookie(theme))
