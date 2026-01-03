import { env } from 'cloudflare:workers'
import { Resend } from 'resend'

/**
 * Get Resend client. Must be called within a request context.
 */
export function getResend() {
  return new Resend(env.RESEND_API_KEY)
}
