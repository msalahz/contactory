import { createAuthClient } from 'better-auth/react'
import { adminClient } from 'better-auth/client/plugins'

import { envClient } from '@/env.client'

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: envClient.VITE_BETTER_AUTH_BASE_URL,
  plugins: [adminClient()],
  fetchOptions: {
    throw: true, // Throw errors instead of returning { data, error }
  },
})

export const { useSession } = createAuthClient()

export type Session = typeof authClient.$Infer.Session
export type User = Omit<
  typeof authClient.$Infer.Session.user,
  'banned' | 'role' | 'banReason' | 'banExpires'
> & {
  banned?: boolean | null
  role?: string | null
  banReason?: string | null
  banExpires?: Date | null
}
