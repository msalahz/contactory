<!--
SYNC IMPACT REPORT
==================
Version Change: [Template] → 1.0.0
Type: MINOR (Initial constitution establishment)
Date: 2026-01-12

Modified Principles:
  - NEW: I. Code Quality First
  - NEW: II. Testing Standards
  - NEW: III. User Experience Consistency
  - NEW: IV. Performance Requirements

Added Sections:
  - Core Principles (4 principles)
  - Development Standards
  - Governance

Removed Sections: None (initial version)

Templates Requiring Updates:
  ✅ .specify/templates/plan-template.md - Reviewed, aligns with quality principles
  ✅ .specify/templates/spec-template.md - Reviewed, aligns with user story approach
  ✅ .specify/templates/tasks-template.md - Reviewed, aligns with testing discipline
  ✅ .specify/templates/checklist-template.md - Reviewed, compatible structure

Follow-up TODOs:
  - RATIFICATION_DATE needs to be set when constitution is formally adopted
-->

# Contactory Constitution

## Core Principles

### I. Code Quality First

Every code contribution MUST meet the following standards:

- **Type Safety**: Full TypeScript strict mode compliance with no `any` types except where explicitly justified and documented
- **Validation**: All external inputs MUST be validated using Zod schemas before processing
- **Error Handling**: All async operations MUST include error handling with user-friendly messages
- **Import Discipline**: Explicit imports only; no barrel exports (`index.ts` re-exports) to maintain auditable import graphs
- **Naming Consistency**:
  - Files: camelCase (e.g., `userAuth.ts`)
  - Components: PascalCase (e.g., `UserProfile.tsx`)
  - Functions/Variables: camelCase (e.g., `getUserById`)
  - Constants: UPPER_SNAKE_CASE (e.g., `MAX_UPLOAD_SIZE`)

**Rationale**: Type safety catches bugs at compile time. Explicit validation prevents runtime errors. Clear naming reduces cognitive load and improves maintainability.

### II. Testing Standards

Testing discipline follows a risk-based approach:

- **Critical Paths**: MUST have integration tests covering auth, data mutations, and business logic
- **UI Components**: SHOULD have tests for interactive behavior and accessibility
- **Test Quality**: Tests MUST be readable, maintainable, and fail for the right reasons
- **Test Independence**: Each test MUST be independently runnable without shared state
- **Coverage as Signal**: Code coverage is a signal, not a target; focus on testing behavior that matters

**Test Types by Risk**:
- High-risk operations (auth, payments, data deletion): Integration + unit tests required
- Medium-risk operations (CRUD, forms): Integration tests required
- Low-risk operations (UI presentation, formatting): Tests optional but encouraged

**Rationale**: Testing every line wastes time; testing nothing invites disaster. Risk-based testing focuses effort where it matters most.

### III. User Experience Consistency

User-facing features MUST maintain consistent experience:

- **Accessibility**: WCAG 2.1 AA compliance required; keyboard navigation, ARIA labels, 4.5:1 color contrast
- **Internationalization**: All user-facing text MUST use i18n keys; RTL/LTR layout switching supported
- **Performance Feedback**: Actions MUST provide visual feedback within 200ms (loading states, optimistic updates)
- **Error Recovery**: Users MUST be able to recover from errors without losing work (auto-save, undo, restore)
- **Component Library**: Use shadcn/ui components; custom components only when shadcn insufficient
- **Design Consistency**: Follow established patterns in `src/features/` for similar interactions

**Rationale**: Consistency reduces user confusion. Accessibility is not optional. Performance perception matters as much as actual speed.

### IV. Performance Requirements

The application MUST meet performance targets:

- **Page Interactive**: < 2 seconds to interactive for pages with 500 records
- **Search Response**: < 5 seconds from query to first results (with 300ms debounce)
- **Scroll Performance**: 60 FPS with 1000+ items using virtual scrolling where appropriate
- **Form Submission**: < 1 second for standard operations
- **File Upload**: < 3 seconds for images (with client-side compression)
- **Bundle Size**: Monitor and justify increases; use dynamic imports for large dependencies

**Performance Verification**:
- Test with realistic data volumes (1000+ contacts minimum)
- Use React DevTools Profiler to identify expensive renders
- Monitor bundle size changes in PR reviews

**Rationale**: Users abandon slow applications. Performance degradation happens gradually; explicit targets prevent drift.

## Development Standards

### Code Review Requirements

All code changes MUST pass:

1. **Type Check**: `pnpm typecheck` with zero errors
2. **Linting**: `pnpm lint` with zero errors
3. **Formatting**: `pnpm format` applied
4. **Build**: `pnpm build` succeeds
5. **Tests**: All existing tests pass; new tests added for new behavior

### Feature Development Workflow

When adding features:

1. **Specification First**: Create or update spec in `docs/` or `.specify/specs/` before coding
2. **Plan Review**: For non-trivial changes, document approach and get alignment before implementation
3. **Incremental Delivery**: Break work into independently deployable slices (use user story priorities)
4. **Constitution Compliance**: Verify feature adheres to all applicable principles

### Complexity Justification

Additional complexity MUST be justified:

- New dependencies: Document why existing tools insufficient
- Abstraction layers: Document the duplication/complexity being eliminated
- Design patterns: Document the problem being solved (no patterns for patterns' sake)

**Default to Simple**:
- Three similar lines > premature abstraction
- Direct code > helper functions for one-time use
- Feature flags only when truly needed
- No backwards-compatibility hacks (delete unused code completely)

## Governance

### Authority

This constitution supersedes all other coding practices, style guides, and conventions. When conflicts arise, constitution principles take precedence.

### Amendment Process

Constitution changes MUST:

1. Document proposed changes with clear rationale
2. Update version following semantic versioning:
   - MAJOR: Backward-incompatible principle changes or removals
   - MINOR: New principles or material expansions
   - PATCH: Clarifications, wording improvements, typo fixes
3. Update all dependent templates (plan, spec, tasks, checklist)
4. Update LAST_AMENDED_DATE to change date
5. Add Sync Impact Report comment at file top

### Compliance Review

Pull requests MUST verify:

- Type safety and validation for external inputs
- Test coverage for changed behavior (risk-based)
- Accessibility for UI changes (WCAG 2.1 AA)
- Performance targets met for data-heavy features
- i18n keys used for user-facing text

### Runtime Guidance

For day-to-day development decisions not covered in this constitution:

- See `CLAUDE.md` in repository root for development commands and architecture overview
- See `docs/project-architecture.md` for technical stack details
- See `.github/copilot-instructions.md` for detailed coding conventions
- See `.specify/templates/*.md` for specification and planning workflows

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): Set when constitution formally adopted | **Last Amended**: 2026-01-12
