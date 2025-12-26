import type { CreateEmailOptions, CreateEmailRequestOptions } from 'resend'

import { resendServer } from '@/integrations/resend'

export function sendEmail(payload: CreateEmailOptions, options?: CreateEmailRequestOptions) {
  return resendServer.emails.send(payload, options)
}
