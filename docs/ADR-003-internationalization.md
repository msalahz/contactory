# ADR-003: Internationalization and Bilingual Support

**Status:** Proposed  
**Date:** 2025-12-31  
**Authors:** Mohammed  
**Tags:** i18n, internationalization, rtl, ltr, bilingual, react-i18next, tailwind

---

## Purpose

- Establish the architecture and implementation strategy for bilingual support (English and Arabic) with seamless RTL/LTR layout switching using react-i18next and Tailwind CSS logical properties.

## Scope

- Affects all UI components, layouts, routing, date/number formatting, and user preferences. Teams impacted: frontend, design, and QA.

---

## Decision at a glance (TL;DR)

- Adopt react-i18next for translation management with namespace-based organization; use Tailwind CSS v4 logical properties (e.g., `ms-*`, `me-*`, `ps-*`, `pe-*`, `start`, `end`) for automatic RTL/LTR layout adaptation; leverage native Intl API and Luxon for locale-aware date and number formatting; persist language preference in user settings with localStorage fallback.

---

## Context and problem statement

- The PRD requires bilingual support for English (LTR) and Arabic (RTL) with:
  - Seamless language switching
  - RTL layout support for Arabic content
  - LTR layout support for English content
  - Locale-aware date and time formatting
  - Locale-aware number formatting
  - Persistent language preference per user
- The application must support both directions without maintaining separate stylesheets or duplicating layout logic.
- ADR-001 (Tech Stack) identified react-i18next and Tailwind CSS RTL support as the planned approach. This ADR details the implementation strategy.

---

## Decision

### Translation Management

- **Library**: react-i18next with i18next core
- **Namespace Organization**: Feature-based namespaces colocated with feature code
- **Translation Files**: JSON format stored in `src/features/<feature>/locales/{lang}.json`
- **Type Safety**: Auto-generated TypeScript types for translation keys
- **Bundling**: Translations bundled at build time (no HTTP backend)

### RTL/LTR Layout Support

- **Strategy**: Tailwind CSS logical properties (CSS Logical Properties specification)
- **Direction Detection**: `dir` attribute on `<html>` element based on current language
- **Logical Properties Mapping**:
  - `ml-*` → `ms-*` (margin-inline-start)
  - `mr-*` → `me-*` (margin-inline-end)
  - `pl-*` → `ps-*` (padding-inline-start)
  - `pr-*` → `pe-*` (padding-inline-end)
  - `left-*` → `start-*`
  - `right-*` → `end-*`
  - `text-left` → `text-start`
  - `text-right` → `text-end`

### Date and Number Formatting

- **Date/Time**: Luxon with native Intl.DateTimeFormat
- **Numbers**: Native Intl.NumberFormat
- **Currency**: Native Intl.NumberFormat with currency options

### Language Persistence

- **Authenticated Users**: Store preference in user profile (database)
- **Guest Users**: localStorage with `i18nextLng` key
- **Detection Order**: User profile → localStorage → browser language → default (English)

### File Structure (Feature-Based Colocated)

```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── locales/
│   │       ├── en.json           # Auth translations (English)
│   │       └── ar.json           # Auth translations (Arabic)
│   │
│   ├── contacts/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── locales/
│   │       ├── en.json
│   │       └── ar.json
│   │
│   ├── dashboard/
│   │   ├── components/
│   │   └── locales/
│   │       ├── en.json
│   │       └── ar.json
│   │
│   └── settings/
│       ├── components/
│       │   └── LanguageSwitcher.tsx
│       └── locales/
│           ├── en.json
│           └── ar.json
│
├── shared/
│   ├── locales/                  # Common translations (buttons, errors, validation)
│   │   ├── en.json
│   │   └── ar.json
│   └── hooks/
│       ├── useLocale.ts          # Current locale and direction
│       └── useFormatters.ts      # Date, number, currency formatters
│
└── integrations/
    └── i18n/
        ├── config.ts             # i18next configuration
        ├── resources.ts          # Aggregates all feature locales
        ├── types.ts              # TypeScript types for translations
        └── utils.ts              # Formatting utilities (dates, numbers)
```

### i18next Configuration

```typescript
// src/integrations/i18n/resources.ts
import authEn from '@/features/auth/locales/en.json'
import authAr from '@/features/auth/locales/ar.json'
import contactsEn from '@/features/contacts/locales/en.json'
import contactsAr from '@/features/contacts/locales/ar.json'
import dashboardEn from '@/features/dashboard/locales/en.json'
import dashboardAr from '@/features/dashboard/locales/ar.json'
import commonEn from '@/shared/locales/en.json'
import commonAr from '@/shared/locales/ar.json'

// TypeScript strict typing - duplicate namespace keys cause compile error
export const resources = {
  en: {
    common: commonEn,
    auth: authEn,
    contacts: contactsEn,
    dashboard: dashboardEn,
  },
  ar: {
    common: commonAr,
    auth: authAr,
    contacts: contactsAr,
    dashboard: dashboardAr,
  },
} as const

// Type exports for strict typing and IDE autocomplete
export type Resources = typeof resources
export type Namespace = keyof typeof resources.en
export type SupportedLanguage = keyof typeof resources
```

```typescript
// src/integrations/i18n/config.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { resources, type SupportedLanguage } from './resources'

export const rtlLanguages: SupportedLanguage[] = ['ar']

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'common',
    supportedLngs: Object.keys(resources) as SupportedLanguage[],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    debug: import.meta.env.I18N_DEBUG === 'true', // Shows warnings for conflicts in dev
  })

export default i18n
```

### Duplicate Detection with ESLint

Install the ESLint plugin for JSON validation:

```bash
pnpm add -D eslint-plugin-i18n-json
```

```javascript
// eslint.config.js (add to existing config)
import i18nJson from 'eslint-plugin-i18n-json'

export default [
  // ... existing config
  {
    files: ['**/locales/*.json'],
    plugins: { 'i18n-json': i18nJson },
    processor: {
      meta: { name: '.json' },
      ...i18nJson.processors['.json'],
    },
    rules: {
      ...i18nJson.configs.recommended.rules,
      'i18n-json/valid-json': 'error',
      'i18n-json/sorted-keys': 'warn',
      'i18n-json/identical-keys': [
        'error',
        {
          filePath: {
            'ar.json': './en.json', // ar.json must have same keys as en.json
          },
        },
      ],
    },
  },
]
```

**Duplicate Detection Strategy:**

| Layer                 | Detects                                    | When         |
| --------------------- | ------------------------------------------ | ------------ |
| TypeScript `as const` | Duplicate namespace keys in `resources.ts` | Compile time |
| ESLint `i18n-json`    | Duplicate/missing keys inside JSON files   | Lint / CI    |
| i18next `debug: true` | Runtime key conflicts                      | Dev runtime  |

```tsx
// Usage in component
import { useTranslation } from 'react-i18next'

function SignInForm() {
  const { t } = useTranslation('auth')

  return (
    <form>
      <h1>{t('signIn.title')}</h1>
      <button>{t('signIn.submit')}</button>
    </form>
  )
}
```

---

## Checklist (enforced by this decision)

- [ ] Install and configure react-i18next with i18next
- [ ] Set up namespace-based translation files
- [ ] Configure i18next language detection and fallback
- [ ] Create I18nextProvider wrapper in root layout
- [ ] Implement `dir` attribute switching on `<html>` element
- [ ] Replace physical properties with logical properties in all components
- [ ] Create LanguageSwitcher component
- [ ] Install luxon for date/time formatting
- [ ] Implement useLocale and useFormatters hooks
- [ ] Add language preference to user profile schema
- [ ] Create date/number formatting utilities with Luxon
- [ ] Generate TypeScript types for translation keys
- [ ] Configure ESLint i18n-json plugin for duplicate detection
- [ ] Add RTL testing to QA checklist

---

## Decision detail (do/don't rules)

### Do:

- Use logical properties (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`) instead of physical properties
- Organize translations by feature namespace
- Use the `t()` function from `useTranslation` hook for all user-facing strings
- Test all layouts in both LTR and RTL modes
- Use Intl API for locale-aware formatting
- Keep translation keys semantic (e.g., `auth.signIn.title` not `auth.button1`)
- Support interpolation for dynamic content (e.g., `Hello, {{name}}`)
- Colocate translations with their feature in `src/features/<feature>/locales/`

### Don't:

- Don't use physical CSS properties (`ml-*`, `mr-*`, `left`, `right`) for directional layouts
- Don't hardcode any user-facing strings in components
- Don't store translations in component files
- Don't use CSS transforms for RTL (e.g., `scaleX(-1)`) - use proper logical properties
- Don't assume LTR layout in any component logic
- Don't mix multiple languages in a single translation file
- Don't use centralized `public/locales/` directory (breaks modular architecture)
- Don't use HTTP backend for loading translations (unnecessary for two languages)

---

## Alternatives considered

### CSS-in-JS with RTL plugins (styled-components-rtl, emotion-rtl)

- **Pros**: Automatic RTL conversion, familiar API
- **Cons**: Additional runtime overhead, not aligned with Tailwind CSS approach, increases bundle size

### Separate RTL stylesheet

- **Pros**: Clear separation, easy to maintain independently
- **Cons**: Duplication of styles, sync issues, larger bundle, not scalable

### CSS `direction` property only

- **Pros**: Simple, built-in browser support
- **Cons**: Doesn't handle all layout cases (flexbox, grid), inconsistent icon/image handling

### Centralized public/locales directory

- **Pros**: Simple setup, single file per language, easy for external translators
- **Cons**: Single file grows large, no code ownership per feature, runtime HTTP requests, harder to tree-shake, breaks modular architecture pattern

### i18next-http-backend for remote translations

- **Pros**: Update translations without deployment
- **Cons**: Additional network requests, latency, offline issues; not needed for two languages

### Rationale (why chosen)

- **Feature-based colocated locales**: Aligns with ADR-002 modular architecture, enables feature ownership, bundled at build time for performance, tree-shakeable

- **react-i18next**: Industry standard, excellent TypeScript support, SSR compatible, namespace support for code-splitting, large community
- **Tailwind CSS Logical Properties**: Native CSS solution, zero runtime overhead, consistent with existing styling approach, future-proof (CSS standard)
- **Intl API + Luxon**: Native browser support, comprehensive formatting options, timezone handling, no additional bundle size for Intl

---

## Consequences

### Positive

- Seamless RTL/LTR switching with a single codebase
- Type-safe translations with autocomplete in IDE
- Compile-time detection of duplicate namespaces via TypeScript
- Lint-time detection of duplicate/missing keys via ESLint
- Feature teams own their translations (clear code ownership)
- Translations bundled at build time (no runtime HTTP requests)
- Native performance for date/number formatting
- Consistent with modern CSS standards
- Easy to add additional languages in the future
- No visual layout bugs from physical property usage

### Negative

- Learning curve for logical properties if team is unfamiliar
- Need to audit and update existing components for logical properties
- Additional testing overhead for both layout directions
- Translation file management across multiple directories
- Initial setup complexity for i18next configuration
- Need to update `resources.ts` when adding new features

---

## Implementation plan

### Short term (0-2 weeks)

1. Install dependencies: `react-i18next`, `i18next`, `i18next-browser-languagedetector`
2. Create `src/integrations/i18n/` structure with config and provider
3. Set up initial translation files for `common` and `auth` namespaces
4. Integrate I18nextProvider in `__root.tsx`
5. Implement `dir` attribute switching based on language
6. Create LanguageSwitcher component
7. Update `<html>` element to use dynamic `dir` and `lang` attributes

### Mid term (2-4 weeks)

1. Audit all components and replace physical properties with logical properties
2. Extract all hardcoded strings to translation files
3. Create remaining namespace translation files (contacts, dashboard, validation)
4. Implement useLocale and useFormatters hooks
5. Add language preference to user profile schema and API
6. Create formatting utilities for dates, numbers, and currencies

### Long term (4-8 weeks)

1. Generate TypeScript types for translation keys
2. Add translation key validation to CI pipeline
3. Implement translation loading states and fallbacks
4. Add RTL-specific visual tests (Playwright screenshots)
5. Create contribution guide for translations
6. Consider adding additional languages based on user feedback

---

## Tests and validation

- Unit tests for formatting utilities (dates, numbers, currencies)
- Component tests verifying translation key usage
- Visual regression tests in both LTR and RTL modes
- Integration tests for language switching flow
- Lint rules to detect hardcoded strings in components
- CI check for missing translation keys

---

## Rollback plan

- If critical issues arise, revert to English-only by removing I18nextProvider and restoring hardcoded strings
- Keep physical property fallbacks during migration period
- Translation files remain backward compatible (additions only, no key removal without deprecation)

---

## Related ADRs and references

- ADR-001: Tech Stack Architecture Decision Record — establishes react-i18next and Tailwind CSS RTL as the planned approach
- ADR-002: Modular Monolith Architecture — defines file structure conventions

### External References

- [react-i18next Documentation](https://react.i18next.com/)
- [i18next Documentation](https://www.i18next.com/)
- [Tailwind CSS RTL Support](https://tailwindcss.com/docs/hover-focus-and-other-states#rtl-support)
- [CSS Logical Properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values)
- [Intl API Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
- [Luxon Documentation](https://moment.github.io/luxon/)

---

## Metadata

- Title: Internationalization and Bilingual Support
- Date: 2025-12-31
- Authors: Mohammed
- Status: Proposed
- Related ADRs: ADR-001, ADR-002
- Tags: i18n, internationalization, rtl, ltr, bilingual, react-i18next, tailwind

_End of ADR-003_
