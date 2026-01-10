import coreEn from '@/core/locales/en.json'
import coreAr from '@/core/locales/ar.json'
import authEn from '@/features/auth/locales/en.json'
import authAr from '@/features/auth/locales/ar.json'
import landingEn from '@/features/landing/locales/en.json'
import landingAr from '@/features/landing/locales/ar.json'

export const resources = {
  en: {
    auth: authEn,
    core: coreEn,
    landing: landingEn,
  },
  ar: {
    auth: authAr,
    core: coreAr,
    landing: landingAr,
  },
} as const

export const defaultNS = 'core'

export type Resources = typeof resources
export type Namespace = keyof typeof resources.en
export type SupportedLanguage = keyof typeof resources
