import { Resend } from 'resend'

import { envServer } from '@/env.server'

/**
 * Get Resend client. Must be called within a request context.
 */
export function getResend() {
  if (!envServer.RESEND_API_KEY) {
    throw new Error('Resend is not configured (missing RESEND_API_KEY)')
  }

  return new Resend(envServer.RESEND_API_KEY)
}
