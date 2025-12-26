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
│   │   ├── webhooks/
│   │   │   └── stripe.ts
│   │   └── v1/
│   │       └── users.ts          # REST endpoints for external clients
│   │
│   ├── _public/
│   │   ├── route.tsx             # Public layout
│   │   ├── index.tsx
│   │   └── about.tsx
│   │
│   ├── _dashboard/
│   │   ├── route.tsx             # Dashboard layout + user guard
│   │   ├── dashboard.tsx
│   │   └── users.tsx
│   │
│   └── _admin/
│       ├── route.tsx             # Admin layout + admin guard
│       └── system.tsx
│
├── server/                       # Server-only: functions, business logic, DB
│   ├── middleware/
│   │   └── auth.ts               # authMiddleware
│   │
│   ├── business/                 # Pure business logic functions
│   │   ├── dashboard.ts          # getDashboardMetricsLogic()
│   │   ├── dashboard.test.ts     # co-located unit tests
│   │   ├── users.ts              # getUsersListLogic(), getUserByIdLogic()
│   │   └── users.ts              # updateUserLogic()
│   │
│   ├── queries/                  # Server fn wrappers
│   │   └── dashboard.ts          # getDashboardMetricsFn = createServerFn(...)
│   │
│   ├── mutations/
│   │   └── users.ts              # updateUserFn = createServerFn(...)
│   │
│   ├── db/
│   │   └── client.ts             # DB instance
│   │
│   └── guards.ts                 # requireAuth(), requireAdmin()
│
├── schemas/                      # Zod validation schemas
│   ├── auth.ts
│   ├── users.ts
│   └── dashboard.ts
│
├── features/
│   ├── auth/
│   │   └── hooks/useLoginMutation.ts
│   │
│   ├── dashboard/
│   │   ├── components/DashboardOverview.tsx
│   │   ├── hooks/useDashboardData.ts
│   │   ├── keys.ts
│   │   └── options.ts
│   │
│   ├── users/
│   │   ├── components/UserTable.tsx
│   │   ├── hooks/
│   │   │   ├── useUsersQuery.ts
│   │   │   ├── useUserQuery.ts
│   │   │   └── useUpdateUserMutation.ts
│   │   ├── keys.ts
│   │   └── options.ts
│   │
│   └── monitoring/
│       └── components/SystemLogs.tsx
│
├── shared/
│   ├── components/
│   │   └── LOGO.tsk
│   ├── hooks/
│   ├── utils/
│   ├── types/
│   └── query/
│       ├── client.ts
│       └── keys.ts
│
├── env.client.ts                 # Client env (VITE_ prefixed)
├── env.server.ts                 # Server env (secrets)
├── integrations/
├── assets/
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

- Structure: adopt a feature-sliced `src/features/` for client code and a centralized `src/server/` for all server-only
  code (business logic, DB client, server functions, middlewares, guards).
- Routing: use file-based routing under `src/routes/`. Prefix route groups with `_` for areas (for example `_public`,
  `_dashboard`, `_admin`) and use `route.tsx` as the layout entry for guards and area-level providers.
- Server functions: implement internal RPC with TanStack Start's `createServerFn`, name exported server fns with `Fn`
  suffix (e.g., `getDashboardMetricsFn`), and keep pure business logic in `src/server/business/` (e.g.,
  `getDashboardMetricsLogic`) that server fns wrap.
- Env split: use `src/env.server.ts` (server-only secrets such as `DATABASE_URL`) and `src/env.client.ts` (
  client-exposed VITE\_ vars). Validate env with `@t3-oss/env-core` and Zod schemas.
- Imports: prefer explicit imports; remove and avoid barrel `index.ts` exports for cross-domain imports to reduce
  accidental import surface.
- TanStack Query: colocate keys, options, and hooks inside each feature (e.g., `src/features/users/keys.ts`,
  `options.ts`, `hooks/useUsersQuery.ts`). Use factories for keys and options to ensure consistent invalidation and
  reuse.

### Checklist (enforced by this decision)

- [x] Feature-sliced layout under `src/features/...`
- [x] Centralized `src/server/` for server-only code
- [x] Server functions suffixed with `Fn` (e.g., `getUsersFn`)
- [x] Business logic separated under `src/server/business/` and kept pure
- [x] Env split: `src/env.server.ts` vs `src/env.client.ts` (VITE\_ prefix for client)
- [x] Route groups prefixed with `_` and `route.tsx` layout files
- [x] No barrel `index.ts` exports for cross-domain imports
- [x] TanStack Query keys/options/hooks colocated in `features/<feature>/`

### Decision detail (do/don't rules)

#### Do:

- Place all server-only code in `src/server/` (for example `src/server/db/client.ts`, `src/server/mutations/users.ts`,
  `src/server/middleware/auth.ts`).
- Implement pure business logic in `src/server/business/` and keep functions deterministic and testable.
- Wrap business logic with server fns in `src/server/queries/` and `src/server/mutations/` using `createServerFn()`.
- Use `*Fn` naming for server functions and keep files focused (single responsibility per file when complexity grows).
- Validate environment variables in `src/env.server.ts` and `src/env.client.ts` using `@t3-oss/env-core` and Zod.
- Enforce route-level guards inside `route.tsx` files for `_dashboard` and `_admin` groups using guard utilities (for
  example `src/server/guards.ts`).
- Co-locate TanStack Query artifacts (keys, options, hooks) inside each feature and provide key factories for
  strongly-typed invalidation.

#### Don't:

- Don't import `src/server/` or `src/env.server.ts` from client code. Add lint rules to block such imports.
- Don't use barrels (`index.ts`) for cross-domain exports; internal barrels within a single feature are acceptable for
  convenience but prefer explicit paths for shared modules.
- Don't use API routes for internal app RPC unless the operation must be externally accessible (use server fns for
  internal operations).

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
  `src/routes/_dashboard/route.tsx`).
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
