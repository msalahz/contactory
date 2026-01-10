import type { Language } from '@/core/schemas'

export function getLanguageLocale(language: Language) {
  return language === 'en' ? 'en-US' : language === 'ar' ? 'ar-SA' : language
}

export function formatDate(date: Date, language: Language = 'en') {
  return Intl.DateTimeFormat(getLanguageLocale(language), {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function formatYear(date: Date, language: Language = 'en') {
  return Intl.DateTimeFormat(getLanguageLocale(language), {
    year: 'numeric',
  }).format(date)
}
