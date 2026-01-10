<!--
SYNC IMPACT REPORT
==================
Version change: 1.0.0 → 1.0.1 (namespace clarification)

Added Principles: None
Removed Principles: None
Added Sections: None
Removed Sections: None

Rationale: Updated i18n namespace from 'shared' to 'core' to match actual codebase structure

Templates Status:
- .specify/templates/plan-template.md ✅ compatible (no changes to constitution check)
- .specify/templates/spec-template.md ✅ compatible (no changes to success criteria)
- .specify/templates/tasks-template.md ✅ compatible (no changes to test phases)

Follow-up TODOs: None
-->

<!--
SYNC IMPACT REPORT
==================
Version change: 0.0.0 → 1.0.0 (initial creation)

Added Principles:
- I. Code Quality
- II. Testing Standards
- III. User Experience Consistency
- IV. Performance Requirements

Added Sections:
- Development Workflow
- Quality Gates

Removed Sections: None (initial creation)

Templates Status:
- .specify/templates/plan-template.md ✅ compatible (Constitution Check section aligns)
- .specify/templates/spec-template.md ✅ compatible (success criteria align)
- .specify/templates/tasks-template.md ✅ compatible (test phases align)

Follow-up TODOs: None
-->

# Contactory Constitution

## Core Principles

### I. Code Quality

All code MUST adhere to strict quality standards to ensure maintainability and reliability.

- TypeScript strict mode MUST be enabled; no implicit `any` types allowed
- ESLint MUST pass with zero warnings (`--max-warnings=0`)
- Prettier MUST be used for consistent code formatting
- Explicit `any` types require inline justification comment
- All imports MUST be at the top of files; no mid-file imports
- Error handling MUST use typed errors; no silent failures
- No commented-out code in production branches

**Rationale**: Strict typing and linting catch bugs early, reduce cognitive load during reviews, and maintain codebase
consistency across contributors.

### II. Testing Standards

Testing ensures reliability and enables confident refactoring.

- Unit tests MUST cover business logic and utility functions
- Integration tests MUST cover API endpoints and database operations
- E2E tests SHOULD cover critical user flows (authentication, core features)
- Test files MUST be co-located with source or in dedicated `__tests__` directories
- External dependencies MUST be mocked in unit tests
- Tests MUST be deterministic; no flaky tests allowed in CI

**Rationale**: Comprehensive testing prevents regressions, documents expected behavior, and enables safe refactoring.

### III. User Experience Consistency

The application MUST provide a consistent, accessible, and internationalized experience.

- All user-facing strings MUST use i18n translation keys (plain English as keys)
- i18n namespaces: `core`, `auth`, `landing` (feature-specific)
- Accessibility MUST target WCAG 2.1 AA compliance
- Responsive design MUST follow a mobile-first approach
- UI components MUST use shadcn/ui with Tailwind CSS
- Loading states MUST display spinners or skeletons for async operations
- Error states MUST show user-friendly messages with recovery options

**Rationale**: Consistent UX builds user trust, accessibility ensures inclusivity, and i18n enables global reach.

### IV. Performance Requirements

The application MUST meet performance targets for optimal user experience.

- Initial page load MUST complete within 3 seconds on 3G networks
- Time to Interactive (TTI) MUST be under 5 seconds
- Routes MUST be lazy-loaded to minimize initial bundle size
- Images MUST be optimized and use modern formats (WebP, AVIF)
- Database queries MUST be optimized; N+1 queries are prohibited
- Cloudflare Workers constraints MUST be respected (CPU time, memory limits)
- Core Web Vitals SHOULD meet "Good" thresholds (LCP < 2.5s, FID < 100ms, CLS < 0.1)

**Rationale**: Performance directly impacts user retention, SEO rankings, and serverless cost efficiency.

## Development Workflow

All development MUST follow established workflow practices.

- Feature branches MUST follow naming convention: `[issue-number]-feature-name`
- Commits MUST follow Conventional Commits specification
- Pull requests MUST include a description of changes and testing performed
- Code reviews MUST be completed before merging to the main branch
- Husky pre-commit hooks MUST pass before commits are allowed
- CI pipeline MUST pass before PR can be merged

## Quality Gates

All code MUST pass quality gates before deployment.

- **TypeScript Gate**: `pnpm tsc --noEmit` MUST pass with no errors
- **Lint Gate**: `pnpm eslint src --max-warnings=0` MUST pass
- **Format Gate**: Code MUST be formatted with Prettier
- **Test Gate**: All tests MUST pass in CI
- **Build Gate**: Production build MUST complete successfully
- **i18n Gate**: No hardcoded user-facing strings; all keys present in locale files

## Governance

This constitution supersedes ad-hoc decisions and establishes binding development practices.

- All pull requests MUST verify compliance with constitution principles
- Violations require explicit justification and team approval
- Amendments MUST be documented with version bump and rationale
- Version follows semantic versioning: MAJOR (breaking changes), MINOR (additions), PATCH (clarifications)
- Compliance reviews SHOULD occur quarterly or after major feature releases

**Version**: 1.0.1 | **Ratified**: 2026-01-08 | **Last Amended**: 2026-01-10
