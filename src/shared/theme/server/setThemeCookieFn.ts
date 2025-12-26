import { createServerFn } from '@tanstack/react-start'

import { themeSchema } from '@/shared/theme/schemas'
import { setThemeCookie } from '@/shared/theme/server/cookie'

export const setThemeCookieFn = createServerFn({ method: 'POST' })
  .inputValidator(themeSchema)
  .handler(({ data: theme }) => setThemeCookie(theme))
