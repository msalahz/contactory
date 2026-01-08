---
description: Review a specific feature directory or set of related files
---

## User Input

```text
$ARGUMENTS
```

Arguments can be:

- Feature path: `src/features/auth`, `src/routes/_auth`
- Feature name: `auth`, `users`, `landing`
- Multiple paths: `src/features/auth src/routes/_auth`

## Workflow

### Step 1: Identify Feature Scope

Based on user input, determine the files to review:

If a path is provided:
// turbo
List all files in the specified directory recursively.

If a feature name is provided, search for related directories:
// turbo
Find directories matching the feature name in `src/features/`, `src/routes/`, `src/server/`.

### Step 2: Gather Feature Context

// turbo
Read the project's constitution at `.specify/memory/constitution.md`.

// turbo
Read any feature-specific documentation in `docs/` or feature directory.

// turbo
Read the feature's main entry points and index files.

### Step 3: Build Feature Map

Create a mental map of the feature:

- **Entry points**: Main components, routes, or exports
- **Dependencies**: Internal and external dependencies
- **Data flow**: How data moves through the feature
- **Test coverage**: Existing tests for this feature

### Step 4: Multi-Agent Deep Review

**Agent 1 - Architecture Review**:

- Component structure and organization
- Separation of concerns
- Dependency direction (no circular deps)
- Proper use of hooks and patterns
- File naming conventions

**Agent 2 - Code Quality**:

- TypeScript typing completeness
- Error handling patterns
- Code duplication within feature
- Function complexity (cognitive load)
- Proper use of React patterns

**Agent 3 - Constitution Compliance**:

- i18n: All strings using translation keys
- i18n: Correct namespace usage (feature-specific vs shared)
- Accessibility: ARIA labels, keyboard navigation
- Performance: Lazy loading, memoization where needed
- UI: Consistent shadcn/ui component usage

**Agent 4 - Testing & Reliability**:

- Test file presence for critical components
- Test coverage gaps
- Edge case handling
- Error boundary usage
- Loading/error state handling

**Agent 5 - Security**:

- Authentication/authorization checks
- Input validation and sanitization
- Sensitive data handling
- API endpoint security
- CORS and CSRF considerations

### Step 5: Confidence Scoring

Score each issue 0-100:

| Factor                            | Score Impact |
| --------------------------------- | ------------ |
| Constitution explicitly mentions  | +20          |
| Clear code evidence               | +25          |
| High severity impact              | +20          |
| Affects user-facing functionality | +15          |
| Security implication              | +20          |

**Threshold**: Report issues with confidence ≥ 70 (lower than git/PR for deeper analysis)

### Step 6: Generate Feature Review Report

```markdown
## Feature Review: [Feature Name]

**Scope**: [directories reviewed]
**Files Analyzed**: [count]
**Lines of Code**: [approximate]

### Feature Overview

[Brief description of feature purpose and structure]

### Architecture Assessment

**Rating**: [Good | Needs Improvement | Concerning]
[Analysis of feature architecture]

### High-Confidence Issues

#### 🔴 Critical (Confidence ≥ 90)

[List critical issues]

#### 🟡 Important (Confidence 80-89)

[List important issues]

#### 🟢 Suggestions (Confidence 70-79)

[List suggestions]

### Category Breakdown

| Category     | Issues | Critical | Important | Suggestions |
| ------------ | ------ | -------- | --------- | ----------- |
| Architecture | X      | X        | X         | X           |
| Code Quality | X      | X        | X         | X           |
| Constitution | X      | X        | X         | X           |
| Testing      | X      | X        | X         | X           |
| Security     | X      | X        | X         | X           |

### Strengths

[What the feature does well]

### Improvement Priorities

1. [Highest priority improvement]
2. [Second priority]
3. [Third priority]

### Recommendations

[Actionable recommendations for improving the feature]
```

### Step 7: Generate Actionable Tasks

If issues found, offer to generate a task list:

```markdown
## Fix Tasks for [Feature Name]

- [ ] T001 [Critical] Fix [issue] in `file.ts:line`
- [ ] T002 [Important] Add [missing element] to `file.ts`
- [ ] T003 [Suggestion] Refactor [component] for better [quality]
```

### Step 8: Offer Follow-up Actions

1. **Auto-fix**: Attempt to fix specific issues
2. **Deep dive**: Review specific file in detail
3. **Compare**: Compare with similar features for consistency
4. **Generate tests**: Create missing tests for the feature
5. **Create tasks**: Generate tasks.md for fixing issues
