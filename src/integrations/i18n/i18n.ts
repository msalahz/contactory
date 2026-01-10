import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import { defaultNS, resources } from './resources'

import type { InitOptions } from 'i18next'

import type { Language } from '@/core/schemas'
import { envClient } from '@/env.client'
import { LANGUAGE_COOKIE_NAME } from '@/core/schemas'

const i18nInitOptions: InitOptions = {
  resources,
  fallbackLng: 'en',
  defaultNS,
  supportedLngs: Object.keys(resources) as Array<Language>,
  interpolation: {
    escapeValue: false,
  },
  detection: {
    order: ['cookie', 'navigator', 'htmlTag'],
    lookupCookie: LANGUAGE_COOKIE_NAME,
    caches: ['cookie'],
    convertDetectedLanguage: (lang) => {
      // Convert detected language to 'ar' or 'en'
      return lang.startsWith('ar') ? 'ar' : lang.startsWith('en') ? 'en' : 'en'
    },
  },
  debug: envClient.VITE_I18N_DEBUG === 'true', // Shows warnings for conflicts in dev
}

void i18n.use(LanguageDetector).use(initReactI18next).init(i18nInitOptions)

export function getI18n() {
  return i18n
}
