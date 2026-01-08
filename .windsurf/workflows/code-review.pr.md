---
description: Review pull request changes using multi-agent analysis with GitHub integration
---

## User Input

```text
$ARGUMENTS
```

Arguments can be:

- Empty: Reviews the current branch's PR (if exists)
- `PR_NUMBER`: Reviews a specific PR by number
- `PR_URL`: Reviews a PR from its GitHub URL

## Workflow

### Step 1: Identify Pull Request

// turbo
Run `gh pr view --json number,title,state,isDraft,body,headRefName,baseRefName,files,additions,deletions` to get PR details.

If no PR found for current branch and no argument provided, report error and exit.

### Step 2: Skip Check

Skip review if any of these conditions are true:

- PR is closed or merged → Report "PR is already closed/merged"
- PR is draft → Report "PR is in draft state, skipping review"
- PR has only trivial changes (< 5 lines, only config/docs) → Report "Trivial PR, skipping automated review"

### Step 3: Gather Context

// turbo
Read the project's constitution at `.specify/memory/constitution.md`.

// turbo
Get the PR diff using `gh pr diff`.

// turbo
Read any linked issues or related documentation mentioned in PR description.

### Step 4: Summarize PR

Create a summary including:

- PR title and description analysis
- Files changed with categories (source, tests, config, docs)
- Scope assessment (small/medium/large)
- Breaking change potential

### Step 5: Multi-Agent Review

Launch parallel review analysis:

**Agent 1 - Constitution Compliance (Code Quality)**:

- TypeScript strict mode compliance
- ESLint rules adherence
- Prettier formatting
- No implicit `any` types
- Proper error handling with typed errors

**Agent 2 - Constitution Compliance (Testing & UX)**:

- Test coverage for new code
- i18n translation keys usage
- Accessibility considerations
- Loading and error states

**Agent 3 - Bug Detection**:

- Logic errors in new code
- Edge case handling
- Null/undefined safety
- Race conditions in async code
- Memory leaks (event listeners, subscriptions)

**Agent 4 - Historical Context**:
// turbo
Run `git log --oneline -10 -- <changed_files>` for each changed file.

// turbo
Run `git blame -L <line_range> <file>` for critical sections.

- Check if changes conflict with recent modifications
- Verify changes align with file's historical patterns
- Identify if this reverts or conflicts with recent fixes

### Step 6: Confidence Scoring

Score each issue 0-100 based on:

- **Evidence**: Can point to specific code (higher score)
- **Constitution reference**: Explicitly mentioned in principles (higher score)
- **Impact**: Severity of the issue (higher = higher score)
- **Certainty**: New issue vs pre-existing (new = higher score)

**Threshold**: Only report issues with confidence ≥ 80

### Step 7: Generate Review Report

```markdown
## Pull Request Review: #[PR_NUMBER]

**Title**: [PR Title]
**Branch**: [head] → [base]
**Changes**: +[additions] / -[deletions] in [file_count] files

### Summary

[Brief summary of what this PR does]

### High-Confidence Issues (≥80)

#### 🔴 Issue 1: [Title] (Confidence: XX)

**Category**: [Type]
**Location**: [file:line-range]
**Problem**: [Description]
**Fix**: [Suggestion]
**Constitution Reference**: [If applicable]

[Repeat for each issue]

### Review Statistics

| Category     | Issues Found | High Confidence |
| ------------ | ------------ | --------------- |
| Code Quality | X            | X               |
| Testing      | X            | X               |
| Security     | X            | X               |
| Bugs         | X            | X               |

### Verdict

- [ ] ✅ **Approve**: No high-confidence issues
- [ ] ⚠️ **Request Changes**: [count] issues need attention
- [ ] 💬 **Comment**: Minor suggestions only
```

### Step 8: Post Review (Optional)

If user confirms, post the review to GitHub:
// turbo
Run `gh pr comment [PR_NUMBER] --body "[review_content]"` to post as comment.

Or for formal review:
Run `gh pr review [PR_NUMBER] --comment --body "[review_content]"` for comment-only review.

### Step 9: Offer Follow-up Actions

1. **Auto-fix**: Attempt to fix reported issues automatically
2. **Checklist**: Generate a fix checklist for manual review
3. **Deep dive**: Review specific files in more detail
4. **Re-run**: Run again with different confidence threshold
5. **Post**: Post the review to GitHub
