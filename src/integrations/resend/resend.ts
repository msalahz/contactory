import { Resend } from 'resend'

import type { CreateEmailOptions, CreateEmailRequestOptions } from 'resend'

import { envServer } from '@/env.server'

const resend = new Resend(envServer.RESEND_API_KEY)

export function sendEmail(payload: CreateEmailOptions, options?: CreateEmailRequestOptions) {
  return resend.emails.send(payload, options)
}
