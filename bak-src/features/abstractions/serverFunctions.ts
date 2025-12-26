import { createServerFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'

import { auth } from '@/integrations/better-auth/auth'
import { parseThemeCookie } from '@/shared/theme/server/cookie'

export const getContextDataFn = createServerFn().handler(async () => {
  const request = getRequest()
  const theme = parseThemeCookie()
  const session = await auth.api.getSession({ headers: request.headers })

  return {
    theme,
    session,
    user: session?.user ?? null,
  }
})
