---
description: Project-wide code review for overall health assessment and consistency
---

## User Input

```text
$ARGUMENTS
```

Arguments can be:

- Empty: Full project review
- `quick`: Fast review focusing on critical issues only
- `focus:category`: Focus on specific category (security, performance, i18n, testing)
- `since:date`: Review files modified since date (YYYY-MM-DD)

## Workflow

### Step 1: Determine Review Scope

Based on arguments:

- **Empty**: Review all source files in `src/`
- **quick**: Sample key files (entry points, routes, critical services)
- **focus:X**: Filter review agents to specific category
- **since:date**:
  // turbo
  Run `git log --since="[date]" --name-only --pretty=format: | sort -u` to get modified files

### Step 2: Gather Project Context

// turbo
Read the project's constitution at `.specify/memory/constitution.md`.

// turbo
Read `package.json` for dependencies and scripts.

// turbo
Read project documentation (README.md, docs/\*.md).

// turbo
List the project structure in `src/`.

### Step 3: Build Project Map

Create a comprehensive view:

**Architecture**:

- Feature directories and their purposes
- Route structure
- Server/API organization
- Shared components and utilities

**Key Files**:

- Entry points (`router.tsx`, `__root.tsx`)
- Configuration files
- Database schemas
- Type definitions

### Step 4: Multi-Agent Project Review

**Agent 1 - Architecture & Structure**:

- Feature organization consistency
- Proper separation of concerns
- No circular dependencies
- Consistent file naming
- Proper barrel exports

**Agent 2 - Constitution Compliance (Code Quality)**:
// turbo
Run `pnpm tsc --noEmit 2>&1 | head -50` to check TypeScript errors.

// turbo
Run `pnpm eslint src --max-warnings=0 2>&1 | head -50` to check ESLint.

- TypeScript strict mode usage
- ESLint compliance
- Prettier formatting
- Error handling patterns

**Agent 3 - Constitution Compliance (UX & i18n)**:
// turbo
Search for hardcoded strings in TSX files that should be translated.

- i18n namespace usage consistency
- Translation key patterns
- Accessibility patterns (ARIA, semantic HTML)
- UI component consistency (shadcn/ui usage)

**Agent 4 - Constitution Compliance (Performance)**:

- Route lazy loading
- Image optimization patterns
- Bundle size concerns (large imports)
- Database query patterns
- Memoization usage

**Agent 5 - Testing Coverage**:
// turbo
Find all test files and map to source files.

- Missing test files for critical code
- Test file organization
- Test naming conventions

**Agent 6 - Security Audit**:

- Environment variable usage
- Authentication patterns
- Authorization checks
- Input validation
- Sensitive data handling

### Step 5: Cross-Feature Consistency

Check for consistency across features:

- Component structure patterns
- Hook patterns
- API call patterns
- Error handling patterns
- State management patterns

### Step 6: Generate Project Health Report

```markdown
## Project Review: Contactory

**Date**: [current date]
**Scope**: [Full | Quick | Focused | Since date]
**Files Analyzed**: [count]

### Executive Summary

**Overall Health**: [🟢 Healthy | 🟡 Needs Attention | 🔴 Critical Issues]

| Category     | Status     | Issues  |
| ------------ | ---------- | ------- |
| Architecture | [🟢/🟡/🔴] | [count] |
| Code Quality | [🟢/🟡/🔴] | [count] |
| i18n & UX    | [🟢/🟡/🔴] | [count] |
| Performance  | [🟢/🟡/🔴] | [count] |
| Testing      | [🟢/🟡/🔴] | [count] |
| Security     | [🟢/🟡/🔴] | [count] |

### Constitution Compliance

**Principle I - Code Quality**: [X/100]

- TypeScript: [status]
- ESLint: [status]
- Error Handling: [status]

**Principle II - Testing Standards**: [X/100]

- Unit Tests: [coverage status]
- Integration Tests: [coverage status]
- Test Quality: [assessment]

**Principle III - UX Consistency**: [X/100]

- i18n: [compliance %]
- Accessibility: [status]
- UI Patterns: [consistency status]

**Principle IV - Performance**: [X/100]

- Lazy Loading: [status]
- Bundle Size: [status]
- Query Optimization: [status]

### Critical Issues (Must Fix)

| #   | Category | Location    | Issue         | Impact          |
| --- | -------- | ----------- | ------------- | --------------- |
| 1   | [cat]    | `file:line` | [description] | [high/critical] |
| 2   | [cat]    | `file:line` | [description] | [high/critical] |

### Important Issues (Should Fix)

[List with same format]

### Suggestions (Nice to Have)

[Grouped by category]

### Feature-by-Feature Summary

| Feature | Health     | Issues | Priority Actions |
| ------- | ---------- | ------ | ---------------- |
| auth    | [🟢/🟡/🔴] | X      | [top action]     |
| users   | [🟢/🟡/🔴] | X      | [top action]     |
| landing | [🟢/🟡/🔴] | X      | [top action]     |

### Technical Debt

[List of accumulated technical debt items]

### Recommended Roadmap

**Immediate (This Week)**:

1. [Critical fix 1]
2. [Critical fix 2]

**Short-term (This Sprint)**:

1. [Important improvement 1]
2. [Important improvement 2]

**Long-term (Backlog)**:

1. [Refactoring suggestion]
2. [Architecture improvement]
```

### Step 7: Generate Actionable Artifacts

Offer to create:

1. **GitHub Issues**: Generate issues for critical/important findings
2. **Tasks File**: Create `tasks.md` with fix tasks
3. **Checklist**: Generate a compliance checklist
4. **CI Config**: Suggest CI/CD checks to prevent regressions

### Step 8: Follow-up Actions

1. **Fix critical**: Auto-fix critical issues
2. **Deep dive**: Review specific feature in detail (`/code-review.feature`)
3. **Generate report**: Export report as markdown file
4. **Track progress**: Create tracking document for improvements
5. **Schedule**: Suggest regular review cadence
