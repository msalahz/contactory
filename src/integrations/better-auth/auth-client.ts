import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: cenv.VITE_BETTER_AUTH_BASE_URL!,
})

export const { signIn, signUp, useSession } = createAuthClient()

export type Session = authClient.$Infer.Session
export type User = authClient.$Infer.Session.user
