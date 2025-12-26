import { Resend } from 'resend'

import type { CreateEmailOptions, CreateEmailRequestOptions } from 'resend'

import { senv } from '@/env.client'

const resend = new Resend(senv.RESEND_API_KEY)

export function sendEmail(payload: CreateEmailOptions, options?: CreateEmailRequestOptions) {
  return resend.emails.send(payload, options)
}
