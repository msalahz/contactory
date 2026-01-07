import type { Resources, defaultNS } from '@/integrations/i18n/resources'

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: Resources['en']
    defaultNS: typeof defaultNS
  }
}
