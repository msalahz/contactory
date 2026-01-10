import { createServerFn } from '@tanstack/react-start'

import { findAuthSession, findAuthUser } from '@/backend/lib/auth'

export const findAuthSessionFn = createServerFn().handler(() => {
  return findAuthSession()
})

export const findAuthUserFn = createServerFn().handler(() => {
  return findAuthUser()
})
