import { createServerFn } from '@tanstack/react-start'

import { themeSchema } from '@/core/schemas'
import { setThemeCookie } from '@/backend/lib/preferences'

export const setThemeCookieFn = createServerFn({ method: 'POST' })
  .inputValidator(themeSchema)
  .handler(({ data: theme }) => setThemeCookie(theme))
