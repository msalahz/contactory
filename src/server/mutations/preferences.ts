import { createServerFn } from '@tanstack/react-start'

import { themeSchema } from '@/server/schemas/preferences'
import { setThemeCookie } from '@/server/lib/preferences'

export const setThemeCookieFn = createServerFn({ method: 'POST' })
  .inputValidator(themeSchema)
  .handler(({ data: theme }) => setThemeCookie(theme))
