import { getRequest } from '@tanstack/react-start/server'

import { getAuth } from '@/integrations/better-auth/auth'

export async function findSession() {
  const request = getRequest()
  const auth = getAuth()
  return await auth.api.getSession({ headers: request.headers })
}
