import { env } from 'cloudflare:workers'
import { betterAuth } from 'better-auth'
import { openAPI } from 'better-auth/plugins'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { tanstackStartCookies } from 'better-auth/tanstack-start'

import { getDb } from '@/server/db/client'
import { sendEmail } from '@/server/emails/sendEmail'

/**
 * Create an auth instance. Must be called within a request context.
 */
export function getAuth() {
  const db = getDb()

  return betterAuth({
    baseURL: env.BETTER_AUTH_URL,

    socialProviders: {
      google: {
        accessType: 'offline',
        disableImplicitSignUp: false,
        prompt: 'select_account consent',
        clientId: env.BETTER_AUTH_GOOGLE_CLIENT_ID,
        clientSecret: env.BETTER_AUTH_GOOGLE_CLIENT_SECRET,
      },
    },

    plugins: [
      tanstackStartCookies(),
      ...(env.BETTER_AUTH_ENABLE_OPENAPI === 'true' ? [openAPI()] : []),
    ],

    trustedOrigins: [env.BETTER_AUTH_URL],

    database: drizzleAdapter(db, {
      provider: 'pg',
      usePlural: true,
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
      async sendVerificationEmail({ user, url }) {
        try {
          const { VerifyEmailTemplate } =
            await import('@/server/emails/templates/VerifyEmailTemplate')
          await sendEmail({
            to: user.email,
            from: `Contactory <${env.RESEND_FROM_EMAIL}>`,
            subject: 'Contactory - Verify Email',
            react: <VerifyEmailTemplate name={user.name} url={url} />,
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
      async sendResetPassword({ url, user }) {
        try {
          const { ResetPasswordEmail } =
            await import('@/server/emails/templates/ResetPasswordEmailTemplate')
          await sendEmail({
            to: user.email,
            from: `Contactory <${env.RESEND_FROM_EMAIL}>`,
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
      useSecureCookies: env.BETTER_AUTH_USE_SECURE_COOKIES === 'true',
      defaultCookieAttributes: {
        httpOnly: true,
        secure: env.BETTER_AUTH_USE_SECURE_COOKIES === 'true',
        sameSite: 'lax', // 'lax' OK for subdomains & localhost
        path: '/',
      },
      cookies: {
        session_token: {
          name: 'contactory_token',
        },
      },
    },

    telemetry: {
      debug: false,
      enabled: false,
    },
  })
}
