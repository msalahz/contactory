import { getRequest } from '@tanstack/react-start/server'

import { auth } from '@/integrations/better-auth/auth'

export async function findSession() {
  const request = getRequest()
  return await auth.api.getSession({ headers: request.headers })
}
