# IP-001: Contacts CRUD Implementation Plan

**Status:** Approved  
**Date:** 2026-01-07  
**Author:** Mohammed  
**Related:** PRD.md, ADR-001-tech-stack.md, ADR-002-file-structure.md  
**Decision:** Hybrid Approach (Path B routing + Path A UX)

---

## Executive Summary

This document outlines the implementation plan for the Contacts CRUD functionality in Contactory. The chosen approach combines **URL-driven nested routes** with **fast sheet/modal interactions**, leveraging TanStack Router's layout routes to achieve both URL state reflection AND smooth UI transitions.

---

## Current State Analysis

**What exists:**

- Database schema at `src/server/schemas/contacts.ts` with comprehensive fields
- Placeholder route at `src/routes/_user/contacts.tsx` (shows "Under Construction")
- Indexes on userId, firstName, lastName, primaryEmail, and (isFavorite, userId)
- Authentication system fully implemented
- Feature-sliced architecture established (auth, users features)

**What's missing:**

- Server modules for contacts business logic
- Server queries/mutations for contacts CRUD
- Frontend feature module (components, hooks, keys, options)
- Actual contacts pages and forms
- Search and filtering functionality

---

## Database Schema Enhancements

Add these fields to the contacts schema:

```sql
-- Additions to the contact table
avatarUrl       TEXT        -- Contact photo URL (uses R2 storage)
birthday        TEXT        -- ISO date string (YYYY-MM-DD)
deletedAt       TIMESTAMP   -- Soft delete support for undo functionality
lastContactedAt TIMESTAMP   -- For "recently contacted" sorting
sortOrder       INTEGER     -- Custom ordering for favorites
```

**Rationale:**

- `avatarUrl`: Visual identification, consistent with user profile pattern
- `birthday`: One of the most common contact fields, useful for reminders
- `deletedAt`: Enables undo/restore functionality, safer data management
- `lastContactedAt`: Enables "recently contacted" sorting and smart suggestions
- `sortOrder`: Allows users to manually reorder contacts (especially favorites)

---

## Chosen Architecture: Hybrid Approach

### Overview

This approach combines the best of both worlds:

- **URL-driven navigation** using TanStack Router nested routes
- **Sheet/modal overlays** for smooth interactions (list stays visible)
- **Inline actions** for quick operations (favorites, quick actions)
- **Full detail sheets** for contact-level actions
- **Soft delete** with undo capability

### How It Works

The key insight is using TanStack Router's **layout routes with `<Outlet />`**:

1. `/contacts` renders the list + an `<Outlet />` placeholder
2. Child routes (`/contacts/new`, `/contacts/$id`) render sheets INTO the outlet
3. The list stays visible behind the sheet
4. URLs are always shareable and reflect the current state
5. Browser back/forward navigation works naturally

### Route Structure

```
/contacts                    → List with table (layout with Outlet)
/contacts?search=john        → List filtered by search
/contacts?favorite=true      → List filtered to favorites
/contacts/new                → Create sheet overlays list
/contacts/$contactId         → Detail sheet overlays list
/contacts/$contactId/edit    → Edit sheet overlays list
```

### Route File Architecture

```
src/routes/_user/
├── contacts.tsx               → Layout route (list + <Outlet />)
└── contacts/
    ├── index.tsx              → Empty (list is in parent layout)
    ├── new.tsx                → CreateContactSheet
    ├── $contactId.tsx         → ContactDetailSheet (layout for edit)
    └── $contactId_.edit.tsx   → EditContactSheet
```

**Note:** The `$contactId.tsx` acts as a layout for the edit route, allowing the detail sheet to stay open while navigating to edit.

### Component Architecture

Components are **pure, modular, and stateless UI**. Sheet/modal/dialog orchestration lives in routes.

```
src/features/contacts/
├── components/
│   ├── ContactsPage.tsx         → Main container with header + table
│   ├── ContactsHeader.tsx       → Search + filters + add button (pure UI)
│   ├── ContactsTable.tsx        → TanStack Table for list view (pure UI)
│   ├── ContactRow.tsx           → Table row with inline actions (pure UI)
│   ├── ContactDetail.tsx        → Contact detail content (pure UI, no Sheet)
│   ├── ContactForm.tsx          → Create/edit form fields (pure UI, no Sheet)
│   ├── ContactAvatar.tsx        → Avatar with initials fallback
│   ├── ContactSearch.tsx        → Search input (controlled)
│   ├── FavoriteButton.tsx       → Star toggle button (pure UI)
│   ├── DeleteConfirmation.tsx   → Delete confirmation content (pure UI, no Dialog)
│   └── ContactsEmptyState.tsx   → No contacts found
├── hooks/
│   ├── useCreateContact.ts
│   ├── useUpdateContact.ts
│   ├── useDeleteContact.ts
│   └── useToggleFavorite.ts
├── keys.ts                      → TanStack Query keys
├── options.ts                   → Query options factory
└── lib/
    └── formatContact.ts         → Display name, initials, etc.
```

**Note:** Routes handle Sheet/Dialog wrapper components. Feature components are pure UI that receive data and callbacks via props.

---

## Key UX Patterns

### 1. Sheet Navigation (in Routes)

```tsx
// Opening a sheet - navigate to child route
navigate({ to: '/contacts/$contactId', params: { contactId: '123' } })

// Closing a sheet - navigate back to list
navigate({ to: '/contacts', search: (prev) => prev })
// OR
router.history.back()
```

### 2. Route with Sheet Pattern

```tsx
// Route handles Sheet wrapper, component is pure UI
function ContactDetailRoute() {
  const navigate = useNavigate()
  const { contactId } = Route.useParams()
  const { data: contact } = useSuspenseQuery(contactOptions.detail(contactId))

  return (
    <Sheet open={true} onOpenChange={(open) => !open && navigate({ to: '/contacts' })}>
      <SheetContent>
        {/* Pure UI component receives data via props */}
        <ContactDetail contact={contact} />
      </SheetContent>
    </Sheet>
  )
}
```

### 3. Pure UI Component Example

```tsx
// Pure, stateless UI - receives data and callbacks via props
function FavoriteButton({ isFavorite, isPending, onToggle }) {
  return (
    <Button variant="ghost" onClick={onToggle} disabled={isPending}>
      {isFavorite ? <StarFilledIcon /> : <StarIcon />}
    </Button>
  )
}
```

### 4. Search with URL Sync

```tsx
// Search params synced to URL via route
const { search } = Route.useSearch()
const navigate = useNavigate()

function handleSearch(query) {
  navigate({
    to: '/contacts',
    search: (prev) => ({ ...prev, search: query || undefined }),
  })
}
```

### Advantages of This Approach

1. **URLs are shareable** - `/contacts/abc123` opens directly to that contact
2. **Browser navigation works** - Back button closes sheet naturally
3. **List stays visible** - Context is preserved, quick to return
4. **Fast interactions** - Inline favorites, no page reload for actions
5. **Code splitting** - Each sheet loads independently
6. **SSR compatible** - Route loaders can prefetch contact data
7. **Accessible** - Sheet focus management, escape to close

---

## Server Layer Implementation

### Business Logic Module

`src/server/modules/contacts.ts`

```typescript
import { and, eq, isNull, ilike, or, desc, asc } from 'drizzle-orm'
import { db } from '@/server/db/client'
import { contact } from '@/server/schemas/contacts'

export async function listContacts(userId: string, options = {}) {
  const { search, favorite, limit = 50, offset = 0, sortBy = 'name', sortOrder = 'asc' } = options

  const conditions = [eq(contact.userId, userId), isNull(contact.deletedAt)]

  if (favorite !== undefined) {
    conditions.push(eq(contact.isFavorite, favorite))
  }

  if (search) {
    conditions.push(
      or(
        ilike(contact.firstName, `%${search}%`),
        ilike(contact.lastName, `%${search}%`),
        ilike(contact.primaryEmail, `%${search}%`),
        ilike(contact.company, `%${search}%`),
      ),
    )
  }

  const orderColumn =
    sortBy === 'name'
      ? contact.firstName
      : sortBy === 'company'
        ? contact.company
        : contact.createdAt

  return db
    .select()
    .from(contact)
    .where(and(...conditions))
    .orderBy(sortOrder === 'asc' ? asc(orderColumn) : desc(orderColumn))
    .limit(limit)
    .offset(offset)
}

export async function getContact(contactId: string, userId: string) {
  const [result] = await db
    .select()
    .from(contact)
    .where(and(eq(contact.id, contactId), eq(contact.userId, userId), isNull(contact.deletedAt)))
    .limit(1)

  return result ?? null
}

export async function createContact(data: InsertContact, userId: string) {
  const [result] = await db
    .insert(contact)
    .values({ ...data, userId })
    .returning()

  return result
}

export async function updateContact(
  contactId: string,
  data: Partial<InsertContact>,
  userId: string,
) {
  const [result] = await db
    .update(contact)
    .set({ ...data, updatedAt: new Date() })
    .where(and(eq(contact.id, contactId), eq(contact.userId, userId), isNull(contact.deletedAt)))
    .returning()

  return result ?? null
}

export async function deleteContact(contactId: string, userId: string) {
  // Soft delete
  const [result] = await db
    .update(contact)
    .set({ deletedAt: new Date() })
    .where(and(eq(contact.id, contactId), eq(contact.userId, userId)))
    .returning()

  return result ?? null
}

export async function restoreContact(contactId: string, userId: string) {
  const [result] = await db
    .update(contact)
    .set({ deletedAt: null })
    .where(and(eq(contact.id, contactId), eq(contact.userId, userId)))
    .returning()

  return result ?? null
}

export async function toggleFavorite(contactId: string, userId: string) {
  const existing = await getContact(contactId, userId)
  if (!existing) return null

  return updateContact(contactId, { isFavorite: !existing.isFavorite }, userId)
}
```

### Server Query Functions

`src/server/queries/contacts.ts`

```typescript
import { z } from 'zod'
import { createServerFn } from '@tanstack/react-start'
import { requireAuth } from '@/server/modules/guards'
import { listContacts, getContact } from '@/server/modules/contacts'
import { listContactsInputSchema } from '@/server/schemas/contacts'

export const listContactsFn = createServerFn()
  .validator(listContactsInputSchema)
  .handler(async ({ data }) => {
    const session = await requireAuth()
    return listContacts(session.user.id, data)
  })

export const getContactFn = createServerFn()
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    const session = await requireAuth()
    return getContact(data.id, session.user.id)
  })
```

### Server Mutation Functions

`src/server/mutations/contacts.ts`

```typescript
import { z } from 'zod'
import { createServerFn } from '@tanstack/react-start'
import { requireAuth } from '@/server/modules/guards'
import {
  createContact,
  updateContact,
  deleteContact,
  restoreContact,
  toggleFavorite,
} from '@/server/modules/contacts'
import { createContactInputSchema, updateContactInputSchema } from '@/server/schemas/contacts'

export const createContactFn = createServerFn({ method: 'POST' })
  .validator(createContactInputSchema)
  .handler(async ({ data }) => {
    const session = await requireAuth()
    return createContact(data, session.user.id)
  })

export const updateContactFn = createServerFn({ method: 'POST' })
  .validator(z.object({ id: z.string(), data: updateContactInputSchema }))
  .handler(async ({ data }) => {
    const session = await requireAuth()
    return updateContact(data.id, data.data, session.user.id)
  })

export const deleteContactFn = createServerFn({ method: 'POST' })
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    const session = await requireAuth()
    return deleteContact(data.id, session.user.id)
  })

export const restoreContactFn = createServerFn({ method: 'POST' })
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    const session = await requireAuth()
    return restoreContact(data.id, session.user.id)
  })

export const toggleFavoriteFn = createServerFn({ method: 'POST' })
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    const session = await requireAuth()
    return toggleFavorite(data.id, session.user.id)
  })
```

### Validation Schemas

`src/server/schemas/contacts.ts` (alongside DB schema)

```typescript
import { z } from 'zod'

export const createContactInputSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().optional(),
  primaryEmail: z.string().email().optional().or(z.literal('')),
  primaryPhone: z.string().optional(),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  department: z.string().optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  notes: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  birthday: z.string().optional(),
  avatarUrl: z.string().url().optional(),
})

export const updateContactInputSchema = createContactInputSchema.partial()

export const listContactsInputSchema = z.object({
  search: z.string().optional(),
  favorite: z.boolean().optional(),
  limit: z.number().min(1).max(100).default(50),
  offset: z.number().min(0).default(0),
  sortBy: z.enum(['name', 'company', 'createdAt', 'lastContactedAt']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
})
```

### TanStack Query Keys & Options

`src/features/contacts/keys.ts`

```typescript
export const contactKeys = {
  all: ['contacts'] as const,
  lists: () => [...contactKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...contactKeys.lists(), filters] as const,
  details: () => [...contactKeys.all, 'detail'] as const,
  detail: (id: string) => [...contactKeys.details(), id] as const,
}
```

`src/features/contacts/options.ts`

```typescript
import { queryOptions } from '@tanstack/react-query'
import { contactKeys } from '@/features/contacts/keys'
import { listContactsFn, getContactFn } from '@/server/queries/contacts'

export const contactOptions = {
  list(filters = {}) {
    return queryOptions({
      queryKey: contactKeys.list(filters),
      queryFn: () => listContactsFn({ data: filters }),
    })
  },
  detail(id: string) {
    return queryOptions({
      queryKey: contactKeys.detail(id),
      queryFn: () => getContactFn({ data: { id } }),
      enabled: !!id,
    })
  },
}
```

---

## Implementation Phases

### Phase 1: Core Infrastructure (Days 1-4)

#### 1.1 Database Schema Update

**File:** `src/server/schemas/contacts.ts`

Add new fields:

```typescript
avatarUrl: text(),
birthday: text(),
deletedAt: timestamp(),
lastContactedAt: timestamp(),
sortOrder: integer().default(0),
```

Add new index:

```typescript
index('contact_deletedAt_idx').on(table.deletedAt),
```

Generate and run migration.

#### 1.2 Server Business Logic Module

**File:** `src/server/modules/contacts.ts`

- `listContacts()` with search, filter, sort, pagination
- `getContact()` with soft-delete awareness
- `createContact()`, `updateContact()`, `deleteContact()`
- `restoreContact()` for undo functionality
- `toggleFavorite()`

#### 1.3 Server Functions

**Files:**

- `src/server/queries/contacts.ts` — `listContactsFn`, `getContactFn`
- `src/server/mutations/contacts.ts` — `createContactFn`, `updateContactFn`, `deleteContactFn`, `restoreContactFn`, `toggleFavoriteFn`

#### 1.4 Feature Module Setup

**Files:**

- `src/features/contacts/keys.ts` — Query keys
- `src/features/contacts/options.ts` — Query options

#### 1.5 Routes Setup

**File:** `src/routes/_user/contacts.tsx` (Layout Route)

```typescript
import { Outlet, createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { ContactsPage } from '@/features/contacts/components/ContactsPage'

const searchParamsSchema = z.object({
  search: z.string().optional(),
  favorite: z.coerce.boolean().optional(),
  sortBy: z.enum(['name', 'company', 'createdAt']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
})

export const Route = createFileRoute('/_user/contacts')({
  validateSearch: searchParamsSchema,
  component: ContactsLayout,
})

function ContactsLayout() {
  return (
    <>
      <ContactsPage />
      <Outlet />
    </>
  )
}
```

**File:** `src/routes/_user/contacts/index.tsx`

```typescript
import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/_user/contacts/')({ component: () => null })
```

**File:** `src/routes/_user/contacts/new.tsx`

```typescript
// Route handles Sheet wrapper, ContactForm is pure UI
function CreateContactRoute() {
  const navigate = useNavigate()
  const { createContact, isPending } = useCreateContact()

  const handleClose = () => navigate({ to: '/contacts' })
  const handleSubmit = async (data) => {
    await createContact(data)
    handleClose()
  }

  return (
    <Sheet open={true} onOpenChange={(open) => !open && handleClose()}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New Contact</SheetTitle>
        </SheetHeader>
        <ContactForm onSubmit={handleSubmit} isPending={isPending} />
      </SheetContent>
    </Sheet>
  )
}
```

**File:** `src/routes/_user/contacts/$contactId.tsx`

```typescript
// Route handles Sheet wrapper, ContactDetail is pure UI
function ContactDetailRoute() {
  const navigate = useNavigate()
  const { contactId } = Route.useParams()
  const { data: contact } = useSuspenseQuery(contactOptions.detail(contactId))

  const handleClose = () => navigate({ to: '/contacts' })
  const handleEdit = () => navigate({ to: '/contacts/$contactId/edit', params: { contactId } })

  return (
    <Sheet open={true} onOpenChange={(open) => !open && handleClose()}>
      <SheetContent>
        <ContactDetail contact={contact} onEdit={handleEdit} onClose={handleClose} />
      </SheetContent>
    </Sheet>
  )
}
```

---

### Phase 2: UI Components (Days 4-6)

#### Pure UI Components (No Sheet/Dialog Wrappers)

| Component                | Description                        |
| ------------------------ | ---------------------------------- |
| `ContactsPage.tsx`       | Main container with header + table |
| `ContactsHeader.tsx`     | Search + filters + add button      |
| `ContactsTable.tsx`      | TanStack Table with columns        |
| `ContactRow.tsx`         | Table row with inline actions      |
| `ContactForm.tsx`        | Form fields for create/edit        |
| `ContactDetail.tsx`      | Detail content view                |
| `ContactAvatar.tsx`      | Avatar with initials fallback      |
| `FavoriteButton.tsx`     | Star toggle button                 |
| `DeleteConfirmation.tsx` | Delete confirmation content        |
| `ContactsEmptyState.tsx` | Empty state UI                     |

#### ContactsTable Columns

- Avatar (avatarUrl with initials fallback)
- Name (firstName + lastName, sortable)
- Email (primaryEmail)
- Phone (primaryPhone)
- Company (company)
- Favorite (star toggle, inline action)
- Actions (edit, delete dropdown)

---

### Phase 3: Polish & Enhancement (Days 6-8)

#### 3.1 Search & Filtering

- Debounced search input (300ms)
- URL sync for all filters
- Filter presets (All, Favorites, Recent)

#### 3.2 Optimistic Updates

- Favorite toggle instant feedback
- Delete with undo toast (5s window using `restoreContact`)
- Create/edit optimistic list updates

#### 3.3 Empty States

- No contacts yet (with CTA)
- No search results
- Loading skeletons

#### 3.4 Accessibility

- Keyboard navigation in table
- Focus management for sheets
- Screen reader announcements
- ARIA labels

#### 3.5 Responsive Design

- Mobile: Card view instead of table
- Tablet: Condensed table columns
- Desktop: Full table with all columns

---

## File Checklist

### Server Layer

- [ ] `src/server/schemas/contacts.ts` — Add avatarUrl, birthday, deletedAt, lastContactedAt, sortOrder
- [ ] `src/server/modules/contacts.ts` — Business logic functions
- [ ] `src/server/queries/contacts.ts` — Server query functions
- [ ] `src/server/mutations/contacts.ts` — Server mutation functions
- [ ] Database migration — Generate and apply

### Feature Module

- [ ] `src/features/contacts/keys.ts` — Query keys
- [ ] `src/features/contacts/options.ts` — Query options
- [ ] `src/features/contacts/lib/formatContact.ts` — Display utilities

### Hooks

- [ ] `src/features/contacts/hooks/useCreateContact.ts`
- [ ] `src/features/contacts/hooks/useUpdateContact.ts`
- [ ] `src/features/contacts/hooks/useDeleteContact.ts`
- [ ] `src/features/contacts/hooks/useToggleFavorite.ts`

### Components (Pure UI - No Sheet/Dialog Wrappers)

- [ ] `src/features/contacts/components/ContactsPage.tsx`
- [ ] `src/features/contacts/components/ContactsHeader.tsx`
- [ ] `src/features/contacts/components/ContactsTable.tsx`
- [ ] `src/features/contacts/components/ContactRow.tsx`
- [ ] `src/features/contacts/components/ContactForm.tsx`
- [ ] `src/features/contacts/components/ContactDetail.tsx`
- [ ] `src/features/contacts/components/ContactAvatar.tsx`
- [ ] `src/features/contacts/components/ContactSearch.tsx`
- [ ] `src/features/contacts/components/FavoriteButton.tsx`
- [ ] `src/features/contacts/components/DeleteConfirmation.tsx`
- [ ] `src/features/contacts/components/ContactsEmptyState.tsx`

### Routes (Handle Sheet/Dialog Wrappers)

- [ ] `src/routes/_user/contacts.tsx` — Layout with Outlet
- [ ] `src/routes/_user/contacts/index.tsx` — Empty index
- [ ] `src/routes/_user/contacts/new.tsx` — Sheet wrapper + ContactForm
- [ ] `src/routes/_user/contacts/$contactId.tsx` — Sheet wrapper + ContactDetail
- [ ] `src/routes/_user/contacts/$contactId_.edit.tsx` — Sheet wrapper + ContactForm

---

## Dependencies

### Already Installed

- `@tanstack/react-query`, `@tanstack/react-router`, `@tanstack/react-form`, `@tanstack/react-start`
- `drizzle-orm`, `drizzle-zod`, `zod`
- `lucide-react`, `motion`, `sonner`

### To Be Added

```bash
pnpm add @tanstack/react-table @tanstack/react-virtual use-debounce
```

---

## Success Criteria

1. **CRUD Operations** — All contact operations work correctly
2. **URL State** — Filters, search, and selected contact reflected in URL
3. **Smooth UX** — Sheets open/close smoothly, list stays visible
4. **Inline Actions** — Favorite toggle works without navigation
5. **Soft Delete** — Undo functionality works within time window
6. **Responsive** — Works on mobile, tablet, and desktop
7. **Accessible** — Keyboard navigable, screen reader friendly
8. **Performance** — List handles 1000+ contacts without lag

---

## Effort Estimate

- **Phase 1 (Core):** ~4 days
- **Phase 2 (UI):** ~2 days
- **Phase 3 (Polish):** ~2 days
- **Total:** ~8 days

---

_End of IP-001_
