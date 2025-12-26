import { betterAuth } from 'better-auth'
import { openAPI } from 'better-auth/plugins'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { tanstackStartCookies } from 'better-auth/tanstack-start'

import { db } from '@/server/db/client'
import { envServer } from '@/env.server'
import { sendEmail } from '@/integrations/resend/resend'
import { VerifyEmail } from '@/integrations/resend/emails/VerifyEmail'
import { ResetPasswordEmail } from '@/integrations/resend/emails/ResetPassword'

export const auth = betterAuth({
  plugins: [tanstackStartCookies(), ...(envServer.BETTER_AUTH_ENABLE_OPENAPI ? [openAPI()] : [])],

  database: drizzleAdapter(db, {
    provider: 'pg',
  }),

  session: {
    maxAge: 60 * 60 * 24, // 24 hours
    updateAge: 60 * 60, // 1 hour
  },

  emailVerification: {
    expiresIn: 3600, // 1 hour
    sendOnSignIn: true,
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    async sendVerificationEmail({ user, url, token }) {
      // Send verification email to a user
      console.log(`Send verification email to ${user.email} with token: ${token} and url: ${url}`)

      try {
        await sendEmail({
          to: user.email,
          from: `Contactory <${envServer.RESEND_FROM_EMAIL}>`,
          subject: 'Contactory - Verify Email',
          react: <VerifyEmail name={user.name} url={url} />,
        })
      } catch (error) {
        console.warn(error)
        return Promise.reject()
      }

      return Promise.resolve()
    },
  },

  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: true,
    revokeSessionsOnPasswordReset: true,
    resetPasswordTokenExpiresIn: 3600, // 1hour
    async sendResetPassword({ url, user, token }) {
      console.log(`Send password reset email to ${user.email} with token: ${token} and url: ${url}`)

      try {
        await sendEmail({
          to: user.email,
          from: `Contactory <${envServer.RESEND_FROM_EMAIL}>`,
          subject: 'Contactory - Reset Password',
          react: <ResetPasswordEmail name={user.name} url={url} />,
        })
      } catch (error) {
        console.warn(error)
        return Promise.reject()
      }

      return Promise.resolve()
    },
  },

  rateLimit: {
    enabled: true,
    window: 10,
    max: 100,
    storage: 'memory',
  },

  advanced: {
    useSecureCookies: envServer.BETTER_AUTH_USE_SECURE_COOKIES, // Secure+HttpOnly on HTTPS in prod
    defaultCookieAttributes: {
      httpOnly: true,
      secure: envServer.BETTER_AUTH_USE_SECURE_COOKIES,
      sameSite: envServer.BETTER_AUTH_USE_SECURE_COOKIES ? 'strict' : 'lax', // 'lax' OK for subdomains & localhost
      path: '/',
    },
    cookies: {
      session_token: { name: 'contactory_token' }, // rename it if you like
    },
  },

  telemetry: {
    debug: false,
    enabled: false,
  },
})
