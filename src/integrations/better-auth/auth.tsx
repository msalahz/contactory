import { betterAuth } from 'better-auth'
import { waitUntil } from 'cloudflare:workers'
import { admin, openAPI } from 'better-auth/plugins'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { tanstackStartCookies } from 'better-auth/tanstack-start'

import { envServer } from '@/env.server'
import { getDb } from '@/integrations/drizzle/db'
import { sendEmail } from '@/integrations/resend/client'

/**
 * Create an auth instance. Must be called within a request context.
 */
export function getAuth() {
  const db = getDb()

  const isGoogleEnabled = Boolean(
    envServer.BETTER_AUTH_GOOGLE_CLIENT_ID && envServer.BETTER_AUTH_GOOGLE_CLIENT_SECRET,
  )

  const isEmailEnabled = Boolean(envServer.RESEND_API_KEY && envServer.RESEND_FROM_EMAIL)

  return betterAuth({
    baseURL: envServer.BETTER_AUTH_URL,

    socialProviders: {
      google: {
        enabled: isGoogleEnabled,
        accessType: 'offline',
        disableImplicitSignUp: false,
        prompt: 'select_account consent',
        clientId: envServer.BETTER_AUTH_GOOGLE_CLIENT_ID!,
        clientSecret: envServer.BETTER_AUTH_GOOGLE_CLIENT_SECRET!,
      },
    },

    account: {
      accountLinking: {
        enabled: false,
        trustedProviders: isGoogleEnabled ? ['google'] : [],
      },
    },

    plugins: [
      admin(),
      tanstackStartCookies(),
      ...(envServer.BETTER_AUTH_ENABLE_OPENAPI === 'true' ? [openAPI()] : []),
    ],

    trustedOrigins: [envServer.BETTER_AUTH_URL],

    database: drizzleAdapter(db, {
      provider: 'pg',
      usePlural: true,
    }),

    emailVerification: {
      expiresIn: 3600, // 1 hour
      sendOnSignIn: isEmailEnabled,
      sendOnSignUp: isEmailEnabled,
      autoSignInAfterVerification: isEmailEnabled,
      async sendVerificationEmail({ user, url }) {
        if (!isEmailEnabled) {
          throw new Error('Email is not enabled')
        }

        console.info('SEND VERIFICATION EMAIL')
        const { VerifyEmailTemplate } =
          await import('@/integrations/resend/templates/VerifyEmailTemplate')
        waitUntil(
          sendEmail({
            to: user.email,
            from: `Contactory <${envServer.RESEND_FROM_EMAIL}>`,
            subject: 'Contactory - Verify Email',
            react: <VerifyEmailTemplate name={user.name} url={url} />,
          })
            .then(() => console.info('SEND VERIFICATION EMAIL SUCCEED'))
            .catch((error) => console.warn('SEND VERIFICATION EMAIL FAILED', error)),
        )
      },
    },

    emailAndPassword: {
      enabled: true,
      autoSignIn: true,
      requireEmailVerification: isEmailEnabled,
      revokeSessionsOnPasswordReset: true,
      resetPasswordTokenExpiresIn: 3600, // 1hour
      async sendResetPassword({ url, user }) {
        if (!isEmailEnabled) {
          throw new Error('Email is not enabled')
        }

        console.info('SEND RESET PASSWORD')
        const { ResetPasswordEmail } =
          await import('@/integrations/resend/templates/ResetPasswordEmailTemplate')
        waitUntil(
          sendEmail({
            to: user.email,
            from: `Contactory <${envServer.RESEND_FROM_EMAIL}>`,
            subject: 'Contactory - Reset Password',
            react: <ResetPasswordEmail name={user.name} url={url} />,
          })
            .then(() => console.info('SEND RESET PASSWORD SUCCEED'))
            .catch((error) => console.warn('SEND RESET PASSWORD FAILED', error)),
        )
      },
    },

    // NOTE: In-memory rate limiting is acceptable for Cloudflare Workers as each
    // isolating handles requests independently. For distributed rate limiting across
    // multiple regions, consider using Cloudflare's native rate limiting or Durable Objects.
    rateLimit: {
      enabled: true,
      window: 10,
      max: 100,
      storage: 'memory',
    },

    advanced: {
      useSecureCookies: envServer.BETTER_AUTH_USE_SECURE_COOKIES === 'true',
      defaultCookieAttributes: {
        httpOnly: true,
        secure: envServer.BETTER_AUTH_USE_SECURE_COOKIES === 'true',
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
