import { createAuthClient } from 'better-auth/react'

import { envClient } from '@/env.client'

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: envClient.VITE_BETTER_AUTH_BASE_URL,
})

export const { useSession } = createAuthClient()

export type Session = typeof authClient.$Infer.Session
export type User = typeof authClient.$Infer.Session.user
