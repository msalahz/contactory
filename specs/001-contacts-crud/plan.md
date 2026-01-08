# Implementation Plan: Contacts CRUD

**Branch**: `001-contacts-crud` | **Date**: 2026-01-08 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-contacts-crud/spec.md`

## Summary

Implement full CRUD functionality for Contacts, including a virtual-scrolled list view, detail/edit sheets, avatar
uploads via R2, and soft-delete "Trash" management. The architecture leverages TanStack Router for URL-driven state and
TanStack Query for data management, running on Cloudflare Workers with Neon Postgres.

## Technical Context

**Language/Version**: TypeScript 5.x
**Primary Dependencies**:

- Framework: React 19, TanStack Start
- State/Routing: TanStack Query, TanStack Router
- Forms: TanStack Form, Zod
- UI: Shadcn/UI, TailwindCSS, Lucide React
- Data: Drizzle ORM, Postgres (Neon)
- Storage: Cloudflare R2 (for avatars)
  **Storage**: PostgreSQL (via Hyperdrive), Cloudflare R2
  **Testing**: Vitest (Unit/Integration)
  **Target Platform**: Cloudflare Workers
  **Project Type**: Web application
  **Performance Goals**: <100ms interaction latency, smooth scrolling for 1000+ items
  **Constraints**: Cloudflare Worker execution limits, WCAG 2.1 AA accessibility
  **Scale/Scope**: Support for thousands of contacts per user, efficient virtual scrolling

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- [x] **Code Quality**: Strict TypeScript, ESLint zero warnings, Prettier formatting
- [x] **Testing Standards**: Integration tests for server functions, Unit tests for utils
- [x] **UX Consistency**: i18n for all strings, responsive mobile-first design
- [x] **Performance**: Virtual scrolling for lists, optimized images (R2)

## Project Structure

### Documentation (this feature)

```text
specs/001-contacts-crud/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code

```text
src/
├── features/
│   └── contacts/
│       ├── components/  # Pure UI components (List, Row, Form, Detail)
│       ├── hooks/       # Custom hooks (useCreateContact, etc.)
│       ├── lib/         # Helpers (transformers, formatters)
│       ├── keys.ts      # Query keys factory
│       └── options.ts   # Query options factory
├── server/
│   ├── modules/
│   │   └── contacts.ts  # Domain logic (Drizzle operations)
│   ├── queries/
│   │   └── contacts.ts  # RPC Query Functions
│   ├── mutations/
│   │   └── contacts.ts  # RPC Mutation Functions
│   └── schemas/
│       └── contacts.ts  # Drizzle & Zod schemas
└── routes/
    └── _user/
        └── contacts/
            ├── route.tsx            # Layout route (List + Outlet)
            ├── index.tsx            # Empty (matches /contacts)
            ├── new.tsx              # Create Sheet
            ├── $contactId.tsx       # Detail Sheet
            ├── $contactId.edit.tsx  # Edit Sheet
            └── trash.tsx            # Trash View
```

**Structure Decision**: Feature-sliced architecture with server-side RPC functions.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
| --------- | ---------- | ------------------------------------ |
| None      | N/A        | N/A                                  |

## Phases

### Phase 0: Outline & Research

1. **Dependencies**:
   - Verify `@tanstack/react-table` and `@tanstack/react-virtual` installation (currently missing).
   - Confirm R2 bucket configuration for avatar storage.

2. **Research**:
   - Best practices for TanStack Virtual + Table integration.
   - Optimistic update patterns for soft-delete/restore.

**Output**: research.md

### Phase 1: Design & Contracts

1. **Data Model**:
   - Define Drizzle schema updates (add `avatarUrl`, `deletedAt`, `isFavorite`, etc.).
   - Define Zod validation schemas for API inputs.

2. **API Contracts**:
   - Define server function signatures (list, create, get, update, delete, restore, uploadAvatar).

**Output**: data-model.md, contracts/

### Phase 2: Implementation

1. **Core Infrastructure**:
   - Database migrations.
   - Server modules and RPC functions.
   - Feature scaffolding (keys, options).

2. **UI Implementation**:
   - Components (Table, Virtual Scroll, Forms).
   - Routes integration.
   - Image upload logic.

3. **Refinement**:
   - Optimistic updates.
   - Accessibility & i18n.
   - Testing.

**Output**: tasks.md
