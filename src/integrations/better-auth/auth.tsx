import { betterAuth } from 'better-auth'
import { waitUntil } from 'cloudflare:workers'
import { admin, openAPI } from 'better-auth/plugins'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { tanstackStartCookies } from 'better-auth/tanstack-start'

import { envServer } from '@/env.server'
import { getDb } from '@/server/db/client'
import { sendEmail } from '@/server/emails/sendEmail'

/**
 * Create an auth instance. Must be called within a request context.
 */
export function getAuth() {
  const db = getDb()

  return betterAuth({
    baseURL: envServer.BETTER_AUTH_URL,

    socialProviders: {
      google: {
        accessType: 'offline',
        disableImplicitSignUp: false,
        prompt: 'select_account consent',
        clientId: envServer.BETTER_AUTH_GOOGLE_CLIENT_ID,
        clientSecret: envServer.BETTER_AUTH_GOOGLE_CLIENT_SECRET,
      },
    },

    account: {
      accountLinking: {
        enabled: false,
        trustedProviders: ['google'],
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
        console.info('SEND VERIFICATION EMAIL')
        const { VerifyEmailTemplate } =
          await import('@/server/emails/templates/VerifyEmailTemplate')
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
      requireEmailVerification: true,
      revokeSessionsOnPasswordReset: true,
      resetPasswordTokenExpiresIn: 3600, // 1hour
      async sendResetPassword({ url, user }) {
        console.info('SEND RESET PASSWORD')
        const { ResetPasswordEmail } =
          await import('@/server/emails/templates/ResetPasswordEmailTemplate')
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
