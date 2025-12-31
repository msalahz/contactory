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
- **Namespace Organization**: Feature-based namespaces to enable code-splitting and lazy loading
- **Translation Files**: JSON format stored in `src/locales/{lang}/{namespace}.json`
- **Type Safety**: Auto-generated TypeScript types for translation keys

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

### File Structure

```
src/
├── locales/
│   ├── en/
│   │   ├── common.json          # Shared translations (buttons, labels)
│   │   ├── auth.json            # Authentication feature
│   │   ├── contacts.json        # Contacts feature
│   │   ├── dashboard.json       # Dashboard feature
│   │   └── validation.json      # Form validation messages
│   └── ar/
│       ├── common.json
│       ├── auth.json
│       ├── contacts.json
│       ├── dashboard.json
│       └── validation.json
│
├── integrations/
│   └── i18n/
│       ├── config.ts            # i18next configuration
│       ├── provider.tsx         # I18nextProvider wrapper
│       ├── types.ts             # TypeScript types for translations
│       └── utils.ts             # Formatting utilities (dates, numbers)
│
├── features/
│   └── settings/
│       └── components/
│           └── LanguageSwitcher.tsx
│
└── shared/
    └── hooks/
        ├── useLocale.ts         # Current locale and direction
        └── useFormatters.ts     # Date, number, currency formatters
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
- [ ] Implement useLocale and useFormatters hooks
- [ ] Add language preference to user profile schema
- [ ] Create date/number formatting utilities with Luxon
- [ ] Generate TypeScript types for translation keys
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
- Lazy-load translation namespaces per route

### Don't:

- Don't use physical CSS properties (`ml-*`, `mr-*`, `left`, `right`) for directional layouts
- Don't hardcode any user-facing strings in components
- Don't store translations in component files
- Don't use CSS transforms for RTL (e.g., `scaleX(-1)`) - use proper logical properties
- Don't assume LTR layout in any component logic
- Don't mix multiple languages in a single translation file

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

### i18next-http-backend for remote translations

- **Pros**: Update translations without deployment
- **Cons**: Additional network requests, latency, offline issues; not needed for two languages

### Rationale (why chosen)

- **react-i18next**: Industry standard, excellent TypeScript support, SSR compatible, namespace support for code-splitting, large community
- **Tailwind CSS Logical Properties**: Native CSS solution, zero runtime overhead, consistent with existing styling approach, future-proof (CSS standard)
- **Intl API + Luxon**: Native browser support, comprehensive formatting options, timezone handling, no additional bundle size for Intl

---

## Consequences

### Positive

- Seamless RTL/LTR switching with a single codebase
- Type-safe translations with autocomplete in IDE
- Efficient code-splitting of translation bundles
- Native performance for date/number formatting
- Consistent with modern CSS standards
- Easy to add additional languages in the future
- No visual layout bugs from physical property usage

### Negative

- Learning curve for logical properties if team is unfamiliar
- Need to audit and update existing components for logical properties
- Additional testing overhead for both layout directions
- Translation file management overhead
- Initial setup complexity for i18next configuration

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
