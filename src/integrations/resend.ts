import { Resend } from 'resend'

import { envServer } from '@/env.server'

export const resendServer = new Resend(envServer.RESEND_API_KEY)
