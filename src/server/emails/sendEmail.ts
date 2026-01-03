import type { CreateEmailOptions, CreateEmailRequestOptions } from 'resend'

import { getResend } from '@/integrations/resend'

export function sendEmail(payload: CreateEmailOptions, options?: CreateEmailRequestOptions) {
  return getResend().emails.send(payload, options)
}
