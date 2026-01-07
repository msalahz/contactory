import commonEn from '@/shared/locales/en.json'
import commonAr from '@/shared/locales/ar.json'
import authEn from '@/features/auth/locales/en.json'
import authAr from '@/features/auth/locales/ar.json'

export const resources = {
  en: {
    common: commonEn,
    auth: authEn,
  },
  ar: {
    common: commonAr,
    auth: authAr,
  },
} as const

export const defaultNS = 'common'

export type Resources = typeof resources
export type Namespace = keyof typeof resources.en
export type SupportedLanguage = keyof typeof resources
