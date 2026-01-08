import { createServerFn } from '@tanstack/react-start'

import { themeSchema } from '@/server/schemas/shared'
import { setThemeCookie } from '@/server/modules/shared'

export const setThemeCookieFn = createServerFn({ method: 'POST' })
  .inputValidator(themeSchema)
  .handler(({ data: theme }) => setThemeCookie(theme))
