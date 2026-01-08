---
description: Quick review of staged changes before commit (pre-commit hook style)
---

## User Input

```text
$ARGUMENTS
```

Arguments (optional):

- `--strict`: Use higher confidence threshold (90)
- `--quick`: Only check constitution compliance, skip deep analysis

## Workflow

### Step 1: Get Staged Changes

// turbo
Run `git diff --cached --name-only` to get list of staged files.

// turbo
Run `git diff --cached` to get the actual diff.

If no staged changes:

- Report "No staged changes to review"
- Suggest: `git add <files>` or use `/code-review.git` for all changes
- Exit

### Step 2: Quick Context Load

// turbo
Read `.specify/memory/constitution.md` for quality gates.

### Step 3: Fast Multi-Agent Review

Focus on issues that would fail quality gates:

**Agent 1 - TypeScript Gate**:

- Check for `any` types in changes
- Verify type annotations are present
- Check for TypeScript errors in changed lines

**Agent 2 - Lint Gate**:

- ESLint rule violations in changes
- Prettier formatting issues
- Import ordering

**Agent 3 - i18n Gate**:

- Hardcoded strings in TSX files
- Missing translation keys
- Wrong namespace usage

**Agent 4 - Quick Bug Scan**:

- Obvious null/undefined issues
- Missing error handling
- Console.log statements left in
- TODO/FIXME comments

### Step 4: Confidence Scoring

Quick scoring (0-100):

- **90-100**: Definite issue, will cause problems
- **80-89**: Very likely issue
- **70-79**: Probable issue
- **< 70**: Skip for pre-commit (review later)

Default threshold: 80 (or 90 with `--strict`)

### Step 5: Generate Pre-Commit Report

````markdown
## Pre-Commit Review

**Staged Files**: [count]
**Issues Found**: [count with confidence ≥ threshold]

### 🚫 Blocking Issues (Fix Before Commit)

[Only issues with confidence ≥ threshold]

#### [File]: [issue]

```diff
- [problematic line]
+ [suggested fix]
```
````

### ⚠️ Warnings (Consider Fixing)

[Issues with confidence 70-79]

### ✅ Ready to Commit

[If no blocking issues]
Suggested commit message based on changes:

```
[type]: [description]
```

```

### Step 6: Offer Quick Actions

1. **Auto-fix**: Fix all blocking issues automatically
2. **Proceed**: Commit anyway (with warning)
3. **Unstage**: Unstage problematic files
4. **Full review**: Run detailed review (`/code-review.git staged`)
```
