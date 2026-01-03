# Security Audit Report

**Date:** January 2, 2026  
**Scope:** `src/` directory  
**Status:** Review Complete

---

## Executive Summary

This document contains findings from a comprehensive security and code quality review of the `src/` directory. Issues are categorized by severity and grouped by type.

---

## 🔴 Critical Issues

### 1. Admin Route Has No Authentication

**Location:** `src/routes/_admin/route.tsx`

**Description:**  
The admin route layout has no authentication middleware. Anyone can access `/admin` routes without being authenticated or authorized.

**Current Code:**

```typescript
export const Route = createFileRoute('/_admin')({
  component: RouteComponent,
  // NO middleware or auth check!
})
```

**Risk:** Unauthorized access to administrative functionality.

**Recommendation:**  
Add authentication middleware and admin role verification:

```typescript
import { requireAuthMiddleware } from '@/server/middlewares/auth'

export const Route = createFileRoute('/_admin')({
  component: RouteComponent,
  server: {
    middleware: [requireAuthMiddleware],
  },
  async beforeLoad({ context }) {
    if (!context.user?.isAdmin) {
      throw redirect({ to: '/' })
    }
  },
})
```

---

### 2. Insecure Direct Object Reference (IDOR) in User Query

**Location:** `src/server/queries/users.ts`

**Description:**  
The `findUserFn` endpoint allows querying any user by ID without checking if the requester has permission to access that user's data.

**Current Code:**

```typescript
export const findUserFn = createServerFn()
  .inputValidator(z.object({ userId: z.string() }))
  .handler(async ({ data }) => {
    const user = await findUser(data.userId)
    return user ?? null
  })
```

**Risk:** Any authenticated user can access any other user's profile data by guessing/enumerating user IDs.

**Recommendation:**  
Add authorization check to ensure users can only access their own data:

```typescript
export const findUserFn = createServerFn()
  .inputValidator(z.object({ userId: z.string() }))
  .middleware([requireAuthMiddleware])
  .handler(async ({ data, context }) => {
    // Users can only fetch their own data
    if (context.user.id !== data.userId) {
      throw new Error('Unauthorized')
    }
    const user = await findUser(data.userId)
    return user ?? null
  })
```

---

### 3. Sensitive Tokens Logged to Console

**Location:** `src/integrations/better-auth/authServer.tsx` (lines 45 and 70)

**Description:**  
Verification tokens and password reset tokens are logged to the console. In production, these logs could be captured and exploited.

**Current Code:**

```typescript
// Line 45
console.log(`Send verification email to ${user.email} with token: ${token} and url: ${url}`)

// Line 70
console.log(`Send password reset email to ${user.email} with token: ${token} and url: ${url}`)
```

**Risk:** Token leakage through logs could allow account takeover.

**Recommendation:**  
Remove these log statements or use a debug-only flag:

```typescript
if (process.env.NODE_ENV === 'development') {
  console.log(`[DEV] Verification email for ${user.email}`)
}
```

---

## 🟠 Medium Issues

### 4. Rate Limiting Uses In-Memory Storage

**Location:** `src/integrations/better-auth/authServer.tsx` (lines 88-93)

**Description:**  
Rate limiting is configured to use in-memory storage, which doesn't persist across server restarts and doesn't work in multi-server deployments.

**Current Code:**

```typescript
rateLimit: {
  enabled: true,
  window: 10,
  max: 100,
  storage: 'memory',
},
```

**Risk:** Rate limiting bypassed in clustered/serverless deployments; brute force attacks possible.

**Recommendation:**  
Use Redis or database storage for production:

```typescript
rateLimit: {
  enabled: true,
  window: 10,
  max: 100,
  storage: process.env.NODE_ENV === 'production' ? 'redis' : 'memory',
},
```

---

### 5. Theme Cookie Missing Security Attributes

**Location:** `src/server/modules/theme.ts` (lines 12-16)

**Description:**  
The theme cookie is set without security attributes (`httpOnly`, `secure`, `sameSite`).

**Current Code:**

```typescript
export function setThemeCookie(theme: Theme) {
  setCookie('theme', theme, {
    path: '/',
    maxAge: 365 * 24 * 60 * 60,
  })
}
```

**Risk:** While theme data is not sensitive, this sets a bad precedent and could be exploited for tracking.

**Recommendation:**

```typescript
export function setThemeCookie(theme: Theme) {
  setCookie('theme', theme, {
    path: '/',
    maxAge: 365 * 24 * 60 * 60,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })
}
```

---

### 6. Profile Form Type Mismatch (File Input vs URL Schema)

**Location:** `src/features/users/components/UserProfileFrom.tsx`

**Description:**  
The form schema expects a URL string for the image field, but the input is rendered as `type="file"`. This causes a type mismatch and the form will not work correctly.

**Schema:**

```typescript
image: z.union([z.url('Invalid URL'), z.literal('')]),
```

**Input:**

```tsx
<field.Input type="file" label="Avatar" />
```

**Risk:** Form submission will fail; poor user experience.

**Recommendation:**  
Either:

1. Change input to `type="url"` and accept image URLs, or
2. Implement proper file upload handling with a file-to-URL conversion

---

### 7. Password Reset Form Allows Submission Without Valid Token

**Location:** `src/routes/_auth/reset-password.tsx`

**Description:**  
The password reset form can be submitted even when the token is missing or invalid. This results in unnecessary API calls that will fail.

**Current Code:**

```typescript
onFormSubmit={async (data: { newPassword: string }) => {
  return mutateAsync({
    newPassword: data.newPassword,
    token,  // token could be undefined
  })
```

**Risk:** Poor UX; unnecessary server load.

**Recommendation:**  
Disable form submission when token is invalid:

```tsx
<ResetPasswordForm
  disabled={!token || !!invalidTokenError}
  onFormSubmit={...}
>
```

---

## 🟡 Low Priority / Code Quality Issues

### 8. Hardcoded User ID in Seed File

**Location:** `src/server/db/seeds.ts` (line 597)

**Description:**

```typescript
const userId = 'KHxzt1HBTGEhtt770pI0VffWRHmTd7RT'
```

**Issue:** Seed will fail if this user doesn't exist.

**Recommendation:** Query for a real user or make configurable via environment variable.

---

### 9. Filename Typo

**Location:** `src/features/users/components/UserProfileFrom.tsx`

**Issue:** Should be `UserProfileForm.tsx` (missing 'r' in "Form").

**Recommendation:** Rename file to `UserProfileForm.tsx`.

---

### 10. Potential Null Dereference in getUserNameInitials

**Location:** `src/features/users/utils/helpers.ts`

**Current Code:**

```typescript
export function getUserNameInitials(user: User) {
  return user.name
    .split(' ')
    .map((name: string) => name[0])
    .join('')
}
```

**Issue:** If `user.name` is an empty string, `name[0]` returns `undefined`.

**Recommendation:**

```typescript
export function getUserNameInitials(user: User) {
  if (!user.name) return '?'
  return (
    user.name
      .split(' ')
      .filter(Boolean)
      .map((name) => name[0] ?? '')
      .join('')
      .toUpperCase() || '?'
  )
}
```

---

### 11. Database Pool Minimum Too High

**Location:** `src/server/db/client.ts` (lines 11-14)

**Current Code:**

```typescript
const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  min: 10,
})
```

**Issue:** `min: 10` connections may be excessive for development or serverless deployments.

**Recommendation:** Make configurable:

```typescript
const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  min: parseInt(process.env.DB_POOL_MIN ?? '2', 10),
  max: parseInt(process.env.DB_POOL_MAX ?? '20', 10),
})
```

---

### 12. Silent Error Swallowing

**Location:** `src/routes/_auth/sign-in.tsx` (line 38)

**Current Code:**

```typescript
await singInEmail({
  ...data,
  rememberMe: true,
  callbackURL: envClient.VITE_BETTER_AUTH_CALLBACK_URL,
}).catch(noop)
```

**Issue:** Using `.catch(noop)` pattern hides the error handling intent.

**Recommendation:** Remove `.catch(noop)` since mutation state already handles errors, or add explicit comment explaining why errors are swallowed.

---

### 13. Invalid HTML Input Type

**Location:** `src/features/auth/components/SignUpForm.tsx` (line 136)

**Current Code:**

```tsx
<field.Input type="name" label="Name" placeholder="Jone Doe" />
```

**Issue:** `type="name"` is not a valid HTML input type.

**Recommendation:** Change to `type="text"`.

---

## Summary Table

| #   | Severity    | Issue                     | Location                                        | Status |
| --- | ----------- | ------------------------- | ----------------------------------------------- | ------ |
| 1   | 🔴 Critical | Admin routes unprotected  | `routes/_admin/route.tsx`                       | Open   |
| 2   | 🔴 Critical | IDOR in findUserFn        | `server/queries/users.ts`                       | Open   |
| 3   | 🔴 Critical | Tokens logged to console  | `integrations/better-auth/authServer.tsx`       | Open   |
| 4   | 🟠 Medium   | In-memory rate limiting   | `integrations/better-auth/authServer.tsx`       | Open   |
| 5   | 🟠 Medium   | Theme cookie unsecured    | `server/modules/theme.ts`                       | Open   |
| 6   | 🟠 Medium   | Form type mismatch        | `features/users/components/UserProfileFrom.tsx` | Open   |
| 7   | 🟠 Medium   | Token-less password reset | `routes/_auth/reset-password.tsx`               | Open   |
| 8   | 🟡 Low      | Hardcoded user ID in seed | `server/db/seeds.ts`                            | Open   |
| 9   | 🟡 Low      | Filename typo             | `features/users/components/UserProfileFrom.tsx` | Open   |
| 10  | 🟡 Low      | Null dereference risk     | `features/users/utils/helpers.ts`               | Open   |
| 11  | 🟡 Low      | High DB pool minimum      | `server/db/client.ts`                           | Open   |
| 12  | 🟡 Low      | Silent error swallowing   | `routes/_auth/sign-in.tsx`                      | Open   |
| 13  | 🟡 Low      | Invalid input type        | `features/auth/components/SignUpForm.tsx`       | Open   |

---

## Next Steps

1. **Immediate:** Address all critical (🔴) issues before any production deployment
2. **Short-term:** Fix medium (🟠) issues within the next sprint
3. **Backlog:** Schedule low priority (🟡) issues for code quality improvements

---

_This audit should be repeated after significant changes to authentication, authorization, or data access patterns._
