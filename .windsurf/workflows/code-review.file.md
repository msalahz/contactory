---
description: Deep review of a specific file with detailed analysis
---

## User Input

```text
$ARGUMENTS
```

Arguments:

- File path: `src/features/auth/components/LoginForm.tsx`
- Multiple files: `src/file1.ts src/file2.ts`

## Workflow

### Step 1: Validate Input

// turbo
Verify the file(s) exist and are readable.

If no file specified, check if user has an active file open and use that.

### Step 2: Gather Context

// turbo
Read the project's constitution at `.specify/memory/constitution.md`.

// turbo
Read the target file(s) completely.

// turbo
Identify and read related files (imports, exports, tests).

### Step 3: File Analysis

For each file, analyze:

**Structure**:

- File purpose and responsibility
- Exports (components, functions, types)
- Imports and dependencies
- Line count and complexity

**Relationships**:
// turbo
Find files that import this file.

// turbo
Find test files for this file.

### Step 4: Multi-Agent Deep Review

**Agent 1 - Line-by-Line Quality**:

- TypeScript type safety (no `any`, proper generics)
- Variable naming clarity
- Function length and complexity
- Magic numbers or strings
- Dead code or unused variables
- Proper async/await patterns

**Agent 2 - Constitution Compliance**:

- Code Quality: ESLint patterns, error handling
- i18n: All user strings use translation keys
- UX: Loading states, error handling, accessibility
- Performance: Unnecessary re-renders, missing memoization

**Agent 3 - Best Practices**:

- React patterns (if applicable): hooks rules, component structure
- Single responsibility principle
- DRY violations within file
- Proper separation of logic and presentation
- Error boundaries and error handling

**Agent 4 - Security & Edge Cases**:

- Input validation
- XSS prevention
- Proper sanitization
- Null/undefined handling
- Edge case coverage

### Step 5: Confidence Scoring

Score each issue 0-100 with detailed reasoning:

```
Issue: [description]
Evidence: [specific code reference]
Constitution: [relevant principle, if any]
Impact: [low/medium/high]
Confidence: [score] because [reasoning]
```

**Threshold**: Report issues with confidence ≥ 75

### Step 6: Generate Detailed Report

````markdown
## File Review: [filename]

**Path**: `[full path]`
**Type**: [Component | Hook | Utility | Service | Route | etc.]
**Lines**: [count]
**Complexity**: [Low | Medium | High]

### File Purpose

[What this file does and its role in the codebase]

### Dependencies

**Imports**: [count] ([internal], [external])
**Imported by**: [list of files that use this]
**Has Tests**: [Yes/No] → `[test file path]`

### Issues Found

#### Line [X]: [Issue Title] (Confidence: XX)

```typescript
// Current code
[problematic code snippet]
```
````

**Problem**: [explanation]
**Suggestion**:

```typescript
// Suggested fix
[improved code]
```

[Repeat for each issue]

### Code Quality Metrics

| Metric                | Value            | Status     |
| --------------------- | ---------------- | ---------- |
| Type Coverage         | [%]              | [✅/⚠️/🔴] |
| Function Length       | [avg lines]      | [✅/⚠️/🔴] |
| Cyclomatic Complexity | [score]          | [✅/⚠️/🔴] |
| i18n Compliance       | [%]              | [✅/⚠️/🔴] |
| Test Coverage         | [exists/missing] | [✅/🔴]    |

### Summary

- **Critical Issues**: [count]
- **Important Issues**: [count]
- **Suggestions**: [count]
- **Overall Health**: [Good | Needs Work | Poor]

### Recommended Actions

1. [Highest priority fix]
2. [Second priority]
3. [Third priority]

```

### Step 7: Offer Actions

1. **Auto-fix**: Apply suggested fixes automatically
2. **Fix specific**: Fix a specific issue by number
3. **Generate test**: Create/update test file for this file
4. **Review related**: Review files that import/are imported by this file
5. **Compare**: Compare with similar files for consistency
```
