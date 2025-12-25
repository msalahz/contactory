# ADR-002: File Structure for Modular Monolith in TanStack Start Application

**Status:** Approved  
**Date:** 2025-12-24  
**Project:** Contactory  
**Author:** Mohammed

## Context

We are building **Contactory**, a full-stack contacts management web application using TanStack Start, TypeScript,
Tailwind CSS, Drizzle ORM, and related modern tools (as defined in ADR-001).

The application has three distinct user areas:

- Public marketing site (anonymous access)
- Console for authenticated registered users
- Terminal for system administrators

Early development used a simple grouped-by-type structure, but as complexity grew, concerns became scattered. We require
a structure that:

- Promotes feature cohesion and domain isolation
- Enforces strict server/client boundaries
- Supports end-to-end type safety (database → Zod → forms → components)
- Aligns with TanStack Start conventions (file-based routing, server functions, SSR)
- Facilitates bilingual (Arabic/English) and RTL/LTR support
- Enables seamless theming (light/dark/system) with no flash
- Scales as a modular monolith while allowing future extraction if needed
- Uses explicit imports (no barrel files) for clarity and tree-shaking

## Decision

We adopt a **feature-oriented modular monolith** with clear separation of server-only and client code:

```
src/
├── routes/                       # TanStack Router file-based routing with role-based areas
├── server/                       # SERVER-ONLY: Core domain & infrastructure
├── features/                     # Client-side domain features (UI + data logic)
├── shared/                       # Cross-cutting client concerns
├── env.ts                        # t3-env type-safe environment variables
└── ...                           # assets, styles, entry points
```

Full structure:

```
src/
├── routes/
│   ├── __root.tsx
│   ├── _public/
│   │   ├── route.tsx
│   │   ├── index.tsx
│   │   ├── about.tsx
│   │   └── pricing.tsx
│   ├── _console/                 # Authenticated user console
│   │   ├── route.tsx            # Layout + requireAuth guard
│   │   ├── dashboard.tsx
│   │   ├── contacts.tsx
│   │   └── profile.tsx
│   └── _terminal/                # System administrator terminal
│       ├── route.tsx            # Layout + requireAdmin guard
│       ├── system.tsx
│       └── logs.tsx
│
├── server/
│   ├── db/
│   │   └── client.ts
│   ├── schema/
│   │   ├── contacts.ts
│   │   └── users.ts
│   ├── middleware/
│   │   └── auth.ts
│   ├── queries/
│   │   ├── contacts.ts
│   │   ├── dashboard.ts
│   │   └── users.ts
│   ├── mutations/
│   │   ├── contacts.ts
│   │   └── auth.ts
│   └── guards.ts
│
├── features/
│   ├── auth/
│   │   ├── components/LoginForm.tsx
│   │   └── hooks/useLoginMutation.ts
│   ├── contacts/
│   │   ├── components/
│   │   │   ├── ContactList.tsx
│   │   │   ├── ContactCard.tsx
│   │   │   ├── CreateContactForm.tsx
│   │   │   └── UpdateContactForm.tsx
│   │   ├── hooks/
│   │   │   ├── useContacts.ts
│   │   │   ├── useContact.ts
│   │   │   ├── useCreateContactMutation.ts
│   │   │   └── useUpdateContactMutation.ts
│   │   ├── keys.ts
│   │   └── options.ts
│   ├── dashboard/
│   │   ├── components/DashboardOverview.tsx
│   │   ├── hooks/useDashboardData.ts
│   │   ├── keys.ts
│   │   └── options.ts
│   └── profile/
│       ├── components/
│       │   ├── ProfileForm.tsx
│       │   └── ThemeSelector.tsx
│       └── hooks/useUpdateProfileMutation.ts
│
├── shared/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── table.tsx
│   │   └── modal.tsx
│   ├── query/
│   │   └── client.ts
│   ├── utils/
│   │   ├── cn.ts
│   │   ├── format.ts
│   │   └── constants.ts
│   └── theme/
│       ├── types.ts
│       ├── schema.ts
│       ├── providers.tsx
│       ├── hooks/
│       │   ├── useTheme.ts
│       │   └── useThemeCookie.ts
│       └── server/
│           ├── getThemeFromCookie.ts
│           └── setThemeCookie.ts
│
├── env.ts
├── assets/
├── styles.css
├── routeTree.gen.ts
└── router.tsx
```

Key conventions:

- Route groups prefixed with `_` and each has a `route.tsx` for layout and guards
- `server/schema/` is the single source of truth (Drizzle tables → types → drizzle-zod schemas)
- No barrel `index.ts` files — explicit imports only
- Theme system fully colocated in `shared/theme/` (including server cookie utilities)
- Query keys and options factories colocated per feature

## Options Considered

1. **Grouped-by-type** (components/, hooks/, pages/) — rejected due to feature scattering
2. **Feature folders with nested server/** — rejected to prevent mixing server/client code
3. **Barrel exports** — rejected per team preference for explicitness

## Rationale

- **Feature colocation**: Improves maintainability and domain understanding
- **Strict server isolation**: Prevents secret leaks and enforces security
- **Single source of truth**: `server/schema/` drives types, validation, and forms
- **Theme colocation**: Keeps presentation-layer server needs (cookie handling) close to theme logic
- **Explicit imports**: Enhances clarity and supports better tree-shaking
- **SSR-ready**: Root loader uses theme cookie detection for the initial HTML class
- **i18n/RTL ready**: Shared utilities and direction-aware components can be added without restructuring
- **Scales well**: Foundation supports growth while remaining a monolith

## Consequences

### Positive

- Clear boundaries, reduce bugs, and improve onboarding
- End-to-end type safety from DB to UI
- Zero-flash theming with cookie persistence
- Easy feature development in isolation
- Future-proof for extraction or micro-frontends
- Excellent alignment with TanStack Start patterns

### Negative

- Deeper nesting in some paths — mitigated by path aliases (`@/`)
- Explicit imports are slightly more verbose — mitigated by IDE autocomplete

## Implementation

1. Restructure existing code to match the tree
2. Migrate server functions accordingly
3. Add a theme system with cookie persistence
4. Update import paths and path aliases in `tsconfig.json`/`vite.config.ts`
5. Document structure in project README and onboarding guide

## Related Decisions

- ADR-001: Tech Stack Selection

## References

- TanStack Start Documentation
- Drizzle ORM + drizzle-zod best practices
- shadcn/ui component patterns
- next-themes implementation guide
- Tailwind CSS logical properties for RTL
