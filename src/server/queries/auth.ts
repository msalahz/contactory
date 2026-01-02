import { createServerFn } from '@tanstack/react-start'

import { findSession } from '@/server/modules/auth'

export const findSessionFn = createServerFn().handler(async () => {
  return await findSession()
})
