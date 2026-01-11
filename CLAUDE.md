# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development

```bash
pnpm dev              # Start dev server on port 3000
pnpm build            # Production build
pnpm typecheck        # TypeScript type checking
pnpm lint             # Run ESLint
pnpm format           # Format with Prettier
pnpm check            # Format, lint with auto-fix, and typecheck
```

### Testing

```bash
pnpm test             # Run unit tests
pnpm test:workers     # Run Cloudflare Workers tests
```

### Database

```bash
pnpm db:generate      # Generate migrations from schema changes
pnpm db:migrate       # Run migrations
pnpm db:push          # Push schema directly to database (dev only)
pnpm db:pull          # Pull schema from database
pnpm db:studio        # Open Drizzle Studio (database GUI)
pnpm db:seeds         # Run seed data script
```

### Deployment

```bash
pnpm deploy           # Build and deploy to Cloudflare Workers
pnpm cf-typegen       # Generate Cloudflare Workers types
```

## Architecture

**Type**: Modular monolith with TanStack Start (full-stack React framework)

**Constitution**: All development must comply with Contactory Constitution (`.specify/memory/constitution.md`) which defines mandatory standards for code quality, testing, UX consistency, and performance.

### Key Architectural Principles

1. **Feature-Sliced Organization**: Client features in `src/features/`, server logic in `src/backend/`
2. **Route Groups**: File-based routing with `_` prefix groups (`_auth`, `_public`, `_user`, `_admin`)
3. **Server Functions**: Use TanStack Start server functions (RPC) for internal operations, not REST APIs
4. **Type Safety**: End-to-end type safety via TanStack Start + Drizzle ORM + Zod
5. **No Barrel Exports**: Explicit imports preferred for auditable import graphs

### Directory Structure

```
src/
├── backend/              # Server-only code (never bundled to client) (formerly src/server/)
│   ├── lib/              # Business logic by feature (auth.ts, storage.ts)
│   ├── middlewares/      # Server middleware (auth, logging)
│   ├── mutations/        # Server mutation functions (RPCs)
│   ├── queries/          # Server query functions (RPCs)
│   └── utils/            # utilities & helper functions
├── core/                 # Core/reusable code (formerly src/shared/)
│   ├── components/       # Core/Shared UI components
│   ├── locales/          # i18n core/shared translations
│   ├── theme/            # Theme system
│   ├── utils/            # Utility functions
│   └── schemas.ts        # Zod validation schemas and TypeScript types
├── features/             # Client feature modules
│   ├── auth/             # Auth & User management components, hooks, lib
│   └── landing/          # Landing page components
├── integrations/         # Third-party integrations
│   ├── better-auth/      # Authentication config
│   ├── drizzle/          # Drizzle client, migrations, seeds, and config
│   ├── i18n/             # Internationalization setup
│   ├── resend/           # Email send integration & email templates (Resend + React Email)
│   ├── shadcn/           # UI components
│   ├── tanstack-form/    # Form handling
│   └── tanstack-query/   # Query client setup
├── routes/               # File-based routing
│   ├── __root.tsx        # Root layout with providers
│   ├── _auth/            # Unauthenticated routes (sign-in, sign-up)
│   ├── _public/          # Public routes (landing)
│   ├── _user/            # Protected user routes + route.tsx guard
│   └── _admin/           # Admin-only routes + route.tsx guard
├── start.ts              # TanStack Start configuration
├── style.css             # Global styles with Tailwind CSS integration
├── env.client.ts         # Client environment variables
├── env.server.ts         # Server environment variables
├── router.tsx            # TanStack Router configuration
├── .env.example                   # Example environment variables
├── components.json                # shadcn/ui config
├── drizzle.config.ts              # Drizzle ORM config
├── eslint.config.js               # ESLint config
├── package.json                   # Dependencies & scripts
├── prettier.config.js             # Prettier config
├── tsconfig.json                  # TypeScript config
└── vite.config.ts                 # Vite config
```

### Server vs. Client Code

- **Server-only**: `src/backend/*` - Never import from client code
- **Client-only**: `src/features/*` - UI components, hooks
- **Core**: `src/core/*` - Can be used by both (utils, types)
- **Environment Variables**:
  - Client: `VITE_*` prefix (validated in `src/env.client.ts`)
  - Server: `process.env.*` (validated with `@t3-oss/env-core`)

### Data Flow Pattern

1. **Server Function(RPCs)**: Define in `src/backend/queries/` or `src/backend/mutations/`

   ```ts
   export const getUsersFn = createServerFn().handler(() => {
     // server logic
   })
   ```

2. **React Query Hook**: Create in feature's `hooks/` directory

   ```ts
   export function useUsers() {
     return useQuery({
       queryKey: ['users'],
       queryFn: () => getUsersFn(),
     })
   }
   ```

3. **Component**: Use hook in a feature component
   ```tsx
   const { data } = useUsers()
   ```

### Route Guards

Protected route groups use `route.tsx` with guards:

```tsx
// src/routes/_user/route.tsx
export const Route = createFileRoute('/_user')({
  beforeLoad: async ({ context }) => {
    const authUser = await authGuard(context)
    return { authUser }
  },
})
```

## Tech Stack

**Framework**: TanStack Start (React 19, Vite 7, TypeScript 5.9)
**Data**: TanStack Query + TanStack Form + Drizzle ORM (PostgreSQL) + Zod
**UI**: Tailwind CSS 4 + shadcn/ui + Radix UI + Lucide icons
**Auth**: better-auth
**Email**: React Email + Resend
**Deployment**: Cloudflare Workers
**Testing**: Vitest + Testing Library

## Coding Conventions

### Naming

- **Files**: camelCase (e.g., `userAuth.ts`)
- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Functions/Variables**: camelCase (e.g., `getUserById`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_RETRIES`)

### Imports

- Use `@/` path alias for imports from `src/`
- Prefer named exports over default exports
- Use `import type` for type-only imports
- Explicit imports preferred (avoid barrel files)
- Import sorting enforced via eslint

### React Patterns

- Use standard function declarations for components
- Extract hooks to feature's `hooks/` directory
- Prefix custom hooks with `use`
- Use `React.ComponentProps<'element'>` to extend native props
- Use Zod schemas for validation
- Use CVA (class-variance-authority) for component variants

### Database

- Table names: plural (e.g., `contacts` not `contact`)
- Use sortable UUIDv7 for primary keys (via `uuid` package)
- Timestamps: `createdAt`, `updatedAt` (snake_case in DB via Drizzle config)
- Schema files in `src/features/**/schemas.ts` or `src/core/schemas.ts`
- Migrations in `src/integration/drizzle/migrations/`

### Forms

- Use `@tanstack/react-form` with Zod validation
- Custom `useAppForm` hook in `src/integrations/tanstack-form/`
- Validate on submit with `validators: { onSubmit: schema }`

## Important Notes

- **ALWAYS use pnpm** (not npm or yarn)
- **Browser preference**: Use Brave browser when applicable (per project instructions)
- **No secrets in code**: Use environment variables only
- **Work in progress**: Contacts CRUD feature currently under development (branch: 001-contacts-crud)
- **CI Pipeline**: GitHub Actions runs lint, format check, typecheck, tests, and build on push/PR to main

## Documentation

- **Project Overview**: Business-focused project overview in `docs/project-overview.md`
- **Project Architecture**: stack, and architectural in `docs/project-architecture.md`
- **Copilot Instructions**: `.github/copilot-instructions.md` (detailed coding conventions)
- **Commit Guidelines**: `.github/git-commit-instructions.md`

# Summary instructions

- When using compact, focus on test output and code changes
- Use the AskUserQuestion Tool to ask user questions when needed
