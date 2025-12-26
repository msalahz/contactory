import { getRequest } from '@tanstack/react-start/server'

import { authServer } from '@/integrations/better-auth/authServer'

export async function findSession() {
  const request = getRequest()
  return await authServer.api.getSession({ headers: request.headers })
}
