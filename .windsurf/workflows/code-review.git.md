---
description: Review git changes (staged, unstaged, or between commits) using multi-agent analysis
---

## User Input

```text
$ARGUMENTS
```

Arguments can be:

- Empty: Reviews all uncommitted changes (staged + unstaged)
- `staged`: Reviews only staged changes
- `unstaged`: Reviews only unstaged changes
- `HEAD~N`: Reviews changes in the last N commits
- `commit1..commit2`: Reviews changes between two commits

## Workflow

### Step 1: Determine Review Scope

Based on user input, determine the git diff command to use:

- **Empty/default**: `git diff HEAD`
- **staged**: `git diff --cached`
- **unstaged**: `git diff`
- **HEAD~N**: `git diff HEAD~N..HEAD`
- **commit range**: `git diff <commit1>..<commit2>`

// turbo
Run the appropriate git diff command to get the changes.

### Step 2: Skip Check

Before proceeding, verify there are actual changes to review:

- If diff is empty, report "No changes to review" and exit
- If only whitespace/formatting changes, note this but continue

### Step 3: Gather Project Context

// turbo
Read the project's constitution at `.specify/memory/constitution.md` to understand coding standards.

// turbo
Read any relevant documentation files (README.md, CONTRIBUTING.md) for additional context.

### Step 4: Summarize Changes

Create a brief summary of the changes:

- Files modified/added/deleted
- Estimated scope (small/medium/large)
- Primary areas affected (features, tests, config, etc.)

### Step 5: Multi-Agent Review

Launch parallel review analysis focusing on different aspects:

**Agent 1 - Constitution Compliance**:

- Check against Code Quality principles (TypeScript strict, ESLint, Prettier)
- Check against Testing Standards (test coverage, test patterns)
- Check against UX Consistency (i18n, accessibility, UI patterns)
- Check against Performance Requirements (lazy loading, optimization)

**Agent 2 - Bug Detection**:

- Scan for obvious bugs in the changes
- Check for null/undefined handling
- Verify error handling patterns
- Look for potential runtime errors
- Check for missing imports or dependencies

**Agent 3 - Security & Best Practices**:

- Check for hardcoded secrets or API keys
- Verify input validation
- Check for SQL injection or XSS vulnerabilities
- Review authentication/authorization patterns
- Check for proper error message sanitization

**Agent 4 - Code Quality**:

- Check for code duplication
- Verify naming conventions
- Check for proper typing (no implicit any)
- Review function complexity
- Check for proper separation of concerns

### Step 6: Confidence Scoring

For each issue found, assign a confidence score (0-100):

| Score  | Meaning                               |
| ------ | ------------------------------------- |
| 0-25   | Low confidence, likely false positive |
| 26-50  | Moderate confidence, might be real    |
| 51-75  | High confidence, real and notable     |
| 76-100 | Very high confidence, definite issue  |

**Scoring criteria**:

- Evidence strength (can you point to specific code?)
- Constitution/guideline explicitly mentions it
- Severity of potential impact
- Certainty that it's a new issue (not pre-existing)

### Step 7: Filter and Report

Filter out issues with confidence < 80.

Generate a review report in this format:

```markdown
## Code Review: Git Changes

**Scope**: [description of what was reviewed]
**Files Reviewed**: [count]
**Issues Found**: [count with confidence ≥ 80]

### High-Confidence Issues

#### Issue 1: [Title] (Confidence: XX)

**Category**: [Constitution Compliance | Bug | Security | Code Quality]
**File**: `path/to/file.ts:line-range`
**Description**: [Clear description of the issue]
**Suggestion**: [How to fix it]

[Repeat for each issue]

### Summary

- Constitution violations: X
- Potential bugs: X
- Security concerns: X
- Code quality issues: X

### Recommendations

[List of prioritized recommendations]
```

### Step 8: Offer Actions

After presenting the report, offer:

1. Fix specific issues automatically
2. Generate a checklist for manual fixes
3. Re-run review with lower confidence threshold
4. Review specific files in more detail
