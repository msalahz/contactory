import { Resend } from 'resend'

import { envServer } from '@/env.server'

/**
 * Get Resend client. Must be called within a request context.
 */
export function getResend() {
  return new Resend(envServer.RESEND_API_KEY)
}
