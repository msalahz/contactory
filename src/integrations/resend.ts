import { Resend } from 'resend'

/**
 * Get Resend client. Must be called within a request context.
 */
export function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}
