# ADR-002: Modular Monolith Fullstack App Architecture

**Status:** Approved  
**Date:** 2025-12-26  
**Authors:** Mohammed  
**Tags:** architecture, monolith, server, env, tanstack-start, tooling

---

## Purpose

- Capture the architecture decision to standardize on a modular monolith structure that enforces strong client/server
  boundaries, feature-sliced layout, and type-safe internal RPC via TanStack Start server functions.

## Scope

- Affects repository layout, routing conventions, server-side organization, environment handling, and developer
  workflows across the frontend and backend. Teams impacted: frontend, backend, infra, and QA.

---

## Decision at a glance (TL;DR)

- Adopt a feature-sliced modular monolith with a centralized `src/server/` for all server-only logic; prefer TanStack
  Start server functions (RPC) for internal operations and file-based API routes for external endpoints. Split env into
  `src/env.server.ts` and `src/env.client.ts`. Enforce explicit imports and disallow barrel exports to make import paths
  auditable.

---

## Final File Structure

```
src/
├── routes/                       # File-based routing
│   ├── __root.tsx                # Root: providers, head, error boundary
│   │
│   ├── api/                      # External API endpoints
│   │
│   ├── _auth/                    # Authentication routes (unauthenticated)
│   │   ├── sign-in.tsx           # Sign in page
│   │   ├── sign-up.tsx           # Sign up page
│   │   ├── forgot-password.tsx   # Password reset request
│   │   └── reset-password.tsx    # Password reset form
│   │
│   ├── _public/                  # Public routes
│   │   └── index.tsx             # Landing page
│   │
│   ├── _user/                    # Protected routes (authenticated users)
│   │   ├── route.tsx             # User layout + auth guard
│   │   └── dashboard.tsx         # Main dashboard view
│   │
│   └── _admin/                   # Admin routes (admin users only)
│       ├── route.tsx             # Admin layout + admin guard
│       └── admin.tsx             # Admin dashboard
│
├── server/                       # Server-only code
│   ├── db/                       # Database client and models
│   │   ├── client.ts             # Drizzle DB client
│   │   └── schema/               # Database schemas
│   │
│   ├── emails/                   # Email templates
│   │   └── templates/            # Reusable email components
│   │
│   ├── middlewares/              # Server middleware
│   │   └── auth.middleware.ts    # Authentication middleware
│   │
│   ├── modules/                  # Feature modules (business logic)
│   │   └── auth/                 # Authentication module
│   │
│   ├── mutations/                # Server mutation functions
│   │   └── auth.ts               # Auth-related mutations
│   │
│   ├── queries/                  # Server query functions
│   │   └── auth.ts               # Auth-related queries
│   │
│   └── schemas/                  # Validation schemas
│       └── auth.ts               # Auth validation schemas
│
├── features/                     # Client-side feature modules
│   ├── auth/                     # Authentication feature
│   │   ├── components/           # Auth UI components
│   │   │   ├── SignInForm.tsx
│   │   │   ├── SignUpForm.tsx
│   │   │   ├── RequestPasswordResetForm.tsx
│   │   │   └── ResetPasswordForm.tsx
│   │   └── hooks/                # Auth hooks
│   │       ├── useSignInEmail.ts
│   │       ├── useSignInSocial.ts
│   │       ├── useSignUpEmail.ts
│   │       ├── useSignOut.ts
│   │       ├── useRequestPasswordReset.ts
│   │       └── useResetPassword.ts
│   │
│   └── landing/                  # Landing page feature
│       └── components/           # Landing page components
│
├── shared/                       # Shared code
│   ├── components/               # Reusable UI components
│   ├── theme/                    # Theme configuration
│   └── utils/                    # Utility functions
│
├── integrations/                 # Third-party integrations
│   ├── better-auth/              # Auth configuration
│   ├── shadcn/                   # UI components
│   ├── tanstack-form/            # Form handling
│   └── tanstack-query/           # Data fetching
│
├── env.client.ts                 # Client env (VITE_ prefixed)
├── env.server.ts                 # Server env (secrets)
├── styles.css
├── routeTree.gen.ts
└── router.tsx
```

---

## Context and problem statement

- The repository previously mixed server and client concerns, used barrels for convenience, and had inconsistent routing
  patterns. This led to accidental bundling risk for secrets, unclear import boundaries, and harder audits.
- Non-functional requirements: secure handling of secrets, strong type-safety end-to-end, good developer ergonomics, SSR
  support, and clear migration paths toward potential micro-frontend extraction.
- ADR-001 (Tech Stack) established the core libraries and tools (Vite, TanStack Start, TanStack Query, Tailwind,
  shadcn/ui, Drizzle ORM, Zod, better-auth, Vitest). This ADR defines how those pieces should be organized and used
  together.

---

## Decision

- **Structure**: Adopt a feature-sliced `src/features/` for client code and a modular `src/server/` directory for
  server-side code, organized by feature modules.
- **Routing**: Use file-based routing under `src/routes/` with route groups prefixed by `_` (e.g., `_auth`, `_public`,
  `_user`, `_admin`). Protected route groups have a `route.tsx` for layout and guards.
- **Server Organization**:
  - `modules/`: Feature-based business logic (e.g., `auth/`, `users/`)
  - `mutations/`: Server mutation functions (suffixed with `.mutations.ts`)
  - `queries/`: Server query functions (suffixed with `.queries.ts`)
  - `middlewares/`: Request/response middleware
  - `emails/`: Email templates and utilities
- **Database**:
  - `db/client.ts`: Drizzle ORM client
  - `db/schema/`: Database table definitions
  - `db/seeds/`: Seed data for development
- **Environment**:
  - `env.server.ts`: Server-side environment variables
  - `env.client.ts`: Client-side environment variables (VITE\_ prefixed)
  - Validated using `@t3-oss/env-core` and Zod
- **Code Organization**:
  - Prefer explicit imports over barrel files
  - Colocate related files (e.g., `auth.service.ts` with `auth.types.ts`)
  - Use consistent file naming (e.g., `*.service.ts`, `*.schema.ts`)

### Checklist (enforced by this decision)

- [x] Feature-sliced layout under `src/features/...`
- [x] Modular server code under `src/server/`
- [x] Server functions organized by type (queries/mutations)
- [x] Business logic in feature-based modules under `src/server/modules/`
- [x] Environment variables split between server and client
- [x] Route groups prefixed with `_` and `route.tsx` layout files
- [x] Explicit imports preferred over barrel files
- [x] Database schema and migrations in `src/server/db/`
- [x] Email templates in `src/server/emails/`
- [x] Middleware for cross-cutting concerns in `src/server/middlewares/`

### Decision detail (do/don't rules)

#### Do:

- Organize server code by feature in `src/server/modules/<feature>/`
- Keep business logic in `*.service.ts` files within their respective modules
- Use `*.queries.ts` for data fetching operations
- Use `*.mutations.ts` for data modification operations
- Keep database schema definitions in `src/server/db/schema/`
- Place email templates in `src/server/emails/templates/`
- Use middleware for cross-cutting concerns like authentication
- Validate all environment variables using Zod schemas
- Use route-level guards in `route.tsx` files for protected routes
- Keep server-only code out of the client bundle

#### Don't:

- Don't import server code in client components
- Avoid barrel files (`index.ts`) for cross-feature imports
- Don't mix business logic with API route handlers
- Avoid direct database access from route handlers
- Don't commit sensitive environment variables
- Avoid complex logic in route handlers (delegate to services)

---

## Alternatives considered

- Keep server logic inside feature folders: simpler initial layout but increases risk of accidental secret bundling and
  harder audits.
- Use API routes for all interactions: gives full HTTP control, suitable for external clients, but duplicates
  type-safety work and loses tight TanStack Query integration.
- Keep barrel exports: shorter imports but makes import graph unclear and harder to enforce import boundaries.

### Rationale (why chosen)

- Centralizing server code reduces accidental exposure of secrets and simplifies audits and access control (middleware,
  rate limiting, logging).
- TanStack Start server functions provide type-safe RPC that composes well with TanStack Query for SSR prefetch and
  optimistic updates.
- Explicit imports and no barrels make import flows auditable and eliminate implicit coupling across domains.
- The environment split (server/client) ensures secrets never reach client bundles even accidentally.

---

## Consequences

### Positive

- Clear client/server separation; easier security audits and safer deployments.
- Improved developer experience for data fetching via TanStack Query and server fn integration.
- Easier testing of pure business logic and server fns (unit tests with Vitest).
- Easier future extraction of individual features into micro-frontends or services if needed.

### Negative

- Slightly deeper folder nesting and more explicit imports.
- Initial migration cost to reorganize existing code and update many imports.

---

## Implementation plan

### Short term (0-2 weeks)

- Add `src/server/` and move existing server fns, DB client, and middlewares into it.
- Create `src/env.server.ts` and `src/env.client.ts` and migrate env usage.
- Add ESLint rules to forbid importing server-only modules from client bundles and disallow barrels for cross-feature
  exports.
- Update route groups to use `_` prefix and ensure each area has `route.tsx` with guards (for example
  `src/routes/_user/route.tsx` for authenticated users and `src/routes/_admin/route.tsx` for admin users).
- Update a small set of core features (`auth`, `users`, `dashboard`) to the new layout as examples.

### Mid term (2-8 weeks)

- Refactor remaining features to colocate keys/options/hooks inside `src/features/<feature>/`.
- Add factories for TanStack Query keys and options and update hooks to use them.
- Replace internal API route uses with server fns where appropriate.
- Add Vitest tests for server/business functions and server fns.

### Long term

- Add CI checks (smoke build that fails on disallowed imports), Storybook for shared UI primitives, and auditing
  dashboards for server logs and middleware coverage.

### Migration notes

- Move files incrementally and update imports using the IDE's rename/move tooling.
- Where many imports exist, add temporary compatibility modules (in a `migrate/compat` area) with clear TODOs and remove
  once all consumers are updated.

---

## Tests and validation

- Unit tests for pure business logic with Vitest live next to `src/server/business/` files.
- Integration tests for server fns that mock or run against a test DB.
- Lint rule tests or CI grep check that ensures no `src/server/` or `src/env.server.ts` imports appear in client
  bundles.
- CI smoke job: run TypeScript build, then run a client-only build to ensure client bundle doesn't pull server-only
  code.

---

## Rollback plan

- If migration breaks mainline CI or causes regressions, revert the migration commit(s) and continue with a
  smaller-scope migration branch. Keep the old layout available until the migration is complete for all consumers.

---

## Related ADRs and references

- ADR-001: Tech Stack Architecture Decision Record — documents chosen tools and libraries (Vite, TanStack Start,
  TanStack Query, Tailwind, shadcn/ui, Drizzle ORM, Zod, better-auth, Vitest, Playwright, ESLint, Prettier). See
  `docs/ADR-001-tech-stack.md`.
- TanStack Start docs: https://tanstack.com/start/latest
- TanStack Query docs: https://tanstack.com/query/latest
- Drizzle ORM docs: https://orm.drizzle.team/
- Zod docs: https://zod.dev/
- @t3-oss/env-core docs: https://github.com/t3-oss/env-core

---

## Implementation examples (short)

- Env server split example:
  - `src/env.server.ts` — validate server secrets (e.g., DATABASE_URL) with `createEnv` and Zod.
  - `src/env.client.ts` — validate VITE\_ client variables.

- Server fn pattern:
  - `src/server/business/queries/dashboard.ts` —
    `export async function getDashboardMetricsLogic() { /* pure logic */ }`
  - `src/server/queries/dashboard.ts` —
    `export const getDashboardMetricsFn = createServerFn().handler(getDashboardMetricsLogic);`

---

## Consequences review

- This ADR prioritizes security and auditability over minimal surface area convenience (barrel exports). The team
  accepts the migration work as tradeoff for long-term maintainability.

---

## Metadata

- Title: Modular Monolith Fullstack App Architecture
- Date: 2025-12-26
- Authors: Mohammed
- Status: Approved
- Related ADRs: ADR-001
- Tags: architecture, monolith, server, env, tanstack-start

_End of ADR-002_
