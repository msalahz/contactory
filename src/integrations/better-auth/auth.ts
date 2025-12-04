import { betterAuth } from 'better-auth'
import { openAPI } from 'better-auth/plugins'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { tanstackStartCookies } from 'better-auth/tanstack-start'

import { db } from '@/db'
import {
  isDevServerOnly,
  isProdServerOnly,
} from '@/features/abstractions/lib/utils' // your drizzle instance

export const auth = betterAuth({
  plugins: [tanstackStartCookies(), ...(isDevServerOnly() ? [openAPI()] : [])],
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    cookieOptions: {
      secure: isProdServerOnly(),
    },
    rateLimit: {
      enabled: true,
      window: 60, // time window in seconds
      max: 100, // max requests in the window
    },
  },
})
