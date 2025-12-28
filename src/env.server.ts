import { z } from 'zod'
import { createEnv } from '@t3-oss/env-core'

export const envServer = createEnv({
  server: {
    BASE_URL: z.url(),
    DATABASE_URL: z.url(),
    BETTER_AUTH_URL: z.string(),
    BETTER_AUTH_SECRET: z.string(),
    BETTER_AUTH_ENABLE_OPENAPI: z
      .string()
      .transform((val) => val === 'true')
      .default(false),
    BETTER_AUTH_USE_SECURE_COOKIES: z
      .string()
      .transform((val) => val === 'true')
      .default(false),
    RESEND_API_KEY: z.string(),
    RESEND_FROM_EMAIL: z.email(),
    BETTER_AUTH_GOOGLE_CLIENT_ID: z.string(),
    BETTER_AUTH_GOOGLE_CLIENT_SECRET: z.string(),
  },

  /**
   * What object holds the environment variables at runtime. This is usually
   * `process.env` or `import.meta.env`.
   */
  runtimeEnv: process.env,

  /**
   * By default, this library will feed the environment variables directly to
   * the Zod validator.
   *
   * This means that if you have an empty string for a value that is supposed
   * to be a number (e.g. `PORT=` in a ".env" file), Zod will incorrectly flag
   * it as a type mismatch violation. Additionally, if you have an empty string
   * for a value that is supposed to be a string with a default value (e.g.
   * `DOMAIN=` in an ".env" file), the default value will never be applied.
   *
   * In order to solve these issues, we recommend that all new projects
   * explicitly specify this option as true.
   */
  emptyStringAsUndefined: true,
})
