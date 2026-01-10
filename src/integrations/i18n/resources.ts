import sharedEn from '@/shared/locales/en.json'
import sharedAr from '@/shared/locales/ar.json'
import authEn from '@/features/auth/locales/en.json'
import authAr from '@/features/auth/locales/ar.json'
import landingEn from '@/features/landing/locales/en.json'
import landingAr from '@/features/landing/locales/ar.json'

export const resources = {
  en: {
    auth: authEn,
    shared: sharedEn,
    landing: landingEn,
  },
  ar: {
    auth: authAr,
    shared: sharedAr,
    landing: landingAr,
  },
} as const

export const defaultNS = 'shared'

export type Resources = typeof resources
export type Namespace = keyof typeof resources.en
export type SupportedLanguage = keyof typeof resources
