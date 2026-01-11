# Research: Contacts CRUD

**Date**: 2026-01-08  
**Feature**: Contacts CRUD  
**Status**: Completed

## 1. Dependencies & Infrastructure

### Virtual Scrolling & Data Table

- **Status**: Missing dependencies.
- **Action**: Install `@tanstack/react-virtual` AND `@tanstack/react-table`.
- **Finding**: Combine TanStack Table (headless UI) with Virtual (performance).
- **Reference**: [TanStack Virtualized Infinite Scrolling Example](https://github.com/TanStack/table/blob/main/examples/react/virtualized-infinite-scrolling/src/main.tsx)
- **Strategy**:
  - `useInfiniteQuery` for data fetching (cursor-based pagination).
  - `useReactTable` for state (sorting, columns).
  - `useVirtualizer` for rendering only visible rows.
  - **Table Layout**: Fixed header, scrollable body.
  - **Columns**: Avatar+Name, Email, Phone, Company, Actions (Edit/Star).

### UI/UX Inspiration (Modern & Sleek)

- **Google Contacts Influence**:
  - Clean rows with hover actions (Star, Edit, Menu).
  - Avatars with initials/colors if no image.
  - "Comfortable" density by default.
  - Sidebar navigation (Contacts, Frequent, Trash).
- **Apple Contacts Influence**:
  - Clean typography (Inter font).
  - Alphabetical section headers (A, B, C) - _Optional enhancement if virtualizer supports it easily, otherwise stick to flat list for MVP_.
- **Visuals**:
  - Minimal borders (separators only).
  - Sticky header row.
  - Skeleton loading states for infinite scroll.
  - Subtle hover effects (`hover:bg-muted/50`).

### R2 Storage (Avatars)

- **Status**: Configured.
- **Bucket**: `CONTACTORY_R2_BUCKET` (binding name).
- **Public URL**: `https://cdn.contactory.consultin.dev` (env `R2_PUBLIC_URL`).
- **Existing Logic**: `src/server/modules/r2.ts` provides helpers (`uploadToR2`, `deleteFromR2`, `getR2Url`).
- **Reuse**: Can reuse existing patterns from User Profile avatar upload (`src/server/mutations/users.ts`).
- **Key Strategy**: `/contacts/${contactId}/${timestamp}.{ext}` to avoid caching issues and collisions.

### Database

- **Status**: Ready (Neon Postgres via Hyperdrive).
- **Schema**: Need to extend `contacts` table in `src/server/schemas/contacts.ts`.
- **Soft Delete**:
  - Add `deletedAt` timestamp column.
  - Default `null` (active).
  - Queries must filter `where(isNull(table.deletedAt))` by default.
  - Trash view filters `where(isNotNull(table.deletedAt))`.

## 2. Optimistic Updates (Soft Delete)

**Challenge**: "Undo" within 5 seconds vs. immediate API call.

**Decision**: **Immediate API Call + Optimistic UI Reversion**.

1. User clicks "Delete".
2. Optimistic update: Remove item from List Query Data.
3. Show Toast with "Undo" button.
4. Fire `deleteContact` mutation immediately (server sets `deletedAt`).
5. If User clicks "Undo":
   - Fire `restoreContact` mutation.
   - Optimistic update: Add item back to List Query Data.

**Rationale**:

- Simpler state management than holding a "pending delete" state on client.
- Data is safe (soft deleted) so restoration is reliable.
- "Undo" is effectively a "Restore" action.

## 3. Server Functions (RPC)

**Pattern**: `createServerFn` from `@tanstack/react-start`.

- **Middleware**: `requireAuthMiddleware` ensures user isolation.
- **Validation**: Zod schemas for input.
- **Return Types**: Inferred automatically for type-safe frontend usage.

## 4. Navigation & State

**URL State**:

- Search: `?q=...`
- Filters: `?fav=true`
- Sorting: `?sort=name&order=asc`
- Modal/Sheet: Nested routes (`/contacts/$contactId`) via TanStack Router.

**Decision**:

- Use `createFileRoute` for type-safe params.
- Use `zodValidator` for search params validation.
- Layout route (`_user/contacts/route.tsx`) renders the list.
- Child routes (`_user/contacts/$contactId.tsx`) render the Sheet, ensuring list stays visible in background.
