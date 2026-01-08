import sharedEn from '@/shared/locales/en.json'
import sharedAr from '@/shared/locales/ar.json'
import authEn from '@/features/auth/locales/en.json'
import authAr from '@/features/auth/locales/ar.json'
import landingEn from '@/features/landing/locales/en.json'
import landingAr from '@/features/landing/locales/ar.json'
import usersEn from '@/features/users/locales/en.json'
import usersAr from '@/features/users/locales/ar.json'

export const resources = {
  en: {
    shared: sharedEn,
    auth: authEn,
    landing: landingEn,
    users: usersEn,
  },
  ar: {
    shared: sharedAr,
    auth: authAr,
    landing: landingAr,
    users: usersAr,
  },
} as const

export const defaultNS = 'shared'

export type Resources = typeof resources
export type Namespace = keyof typeof resources.en
export type SupportedLanguage = keyof typeof resources
