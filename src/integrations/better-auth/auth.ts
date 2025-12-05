import { betterAuth } from 'better-auth'
import { openAPI } from 'better-auth/plugins'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { tanstackStartCookies } from 'better-auth/tanstack-start'

import { db } from '@/db'
import { senv } from '@/env'

export const auth = betterAuth({
  plugins: [
    tanstackStartCookies(),
    ...(senv.ENABLE_BETTER_AUTH_OPENAPI ? [openAPI()] : []),
  ],

  database: drizzleAdapter(db, {
    provider: 'pg',
  }),

  session: {
    maxAge: 60 * 60 * 24, // 24 hours
    updateAge: 60 * 60, // 1 hour
  },

  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: false,
    revokeSessionsOnPasswordReset: true,

    rateLimit: {
      enabled: true,
      window: 60, // time window in seconds
      max: 100, // max requests in the window
    },
    telemetry: false,
  },
})
