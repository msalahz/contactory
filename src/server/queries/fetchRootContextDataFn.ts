import { createServerFn } from '@tanstack/react-start'
import { findSession } from '@/server/modules/auth'
import { parseThemeCookie } from '@/server/modules/cookies'

export const fetchRootContextDataFn = createServerFn().handler(async () => {
  const serverTheme = parseThemeCookie() ?? null
  const session = await findSession()

  return {
    session,
    serverTheme,
  }
})
