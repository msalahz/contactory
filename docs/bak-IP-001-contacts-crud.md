# IP-001: Contacts CRUD Implementation Plan

**Status:** Approved  
**Date:** 2026-01-06  
**Author:** Warp Agent  
**Related:** PRD.md, ADR-001-tech-stack.md, ADR-002-file-structure.md  
**Decision:** Hybrid Approach (Path B routing + Path A UX)

---

## Executive Summary

This document outlines the implementation plan for the Contacts CRUD functionality in Contactory. The chosen approach
combines **URL-driven MPA routing** with **fast sheet/modal interactions**, leveraging TanStack Router's nested routes
to achieve both URL state reflection AND smooth UI transitions.

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
avatarUrl
TEXT        -- Contact photo URL (uses R2 storage)
birthday    DATE        -- Common contact field
deletedAt   TIMESTAMP   -- Soft delete support for undo functionality
```

**Rationale:**

- `avatarUrl`: Visual identification, consistent with a user profile pattern
- `birthday`: One of the most common contact fields, useful for reminders
- `deletedAt`: Enables undo/restore functionality, safer data management

---

# Chosen Architecture: Hybrid Approach

## Overview

This approach combines the best of both worlds:

- **URL-driven navigation** using TanStack Router nested routes
- **Sheet/modal overlays** for smooth interactions (a list stays visible)
- **Inline actions** for quick operations (favorites, quick actions)
- **Full detail sheets** for contact-level actions

## How It Works

The key insight is using TanStack Router's **layout routes with `<Outlet />`**:

1. `/contacts` renders the list + an `<Outlet />` placeholder
2. Child routes (`/contacts/new`, `/contacts/$id`) render sheets INTO the outlet
3. The list stays visible behind the sheet
4. URLs are always shareable and reflect the current state
5. Browser back/forward navigation works naturally

## Route Structure

```
/contacts                    → List with table (layout with Outlet)
/contacts?search=john        → List filtered by search
/contacts?favorite=true      → List filtered to favorites
/contacts/new                → Create sheet overlays list
/contacts/$contactId         → Detail sheet overlays list
/contacts/$contactId/edit    → Edit sheet overlays list
```

## Route File Architecture

```
src/routes/_user/
└── contacts/
    ├── index.tsx             → Empty (list is in parent layout)
    ├── new.tsx               → CreateContactSheet
    ├── $contactId.tsx        → ContactDetailSheet (layout for edit)
    ├── $contactId_.edit.tsx  → EditContactSheet
    └── router.tsx            → Layout route (list + <Outlet />)
```

**Note:** The `$contactId.tsx` acts as a layout for the edit route, allowing a detail sheet to stay open while
navigating to edit.

## Component Architecture

Components are **pure, modular, compound, and stateless UI**. Sheet/modal/dialog orchestration lives in routes.

```
src/features/contacts/
├── components/
│   ├── ContactsHeader.tsx        → Search + filters + add button (pure UI)
│   ├── ContactsTable.tsx         → TanStack Table for list view (pure UI)
│   ├── ContactRow.tsx            → Table row with inline actions (pure UI)
│   ├── ContactDetail.tsx         → Contact detail content (pure UI, no Sheet)
│   ├── ContactForm.tsx           → Create/edit form fields (pure UI, no Sheet)
│   ├── ContactAvatar.tsx         → Avatar with initials fallback
│   ├── ContactSearch.tsx         → Search input (controlled)
│   ├── FavoriteButton.tsx        → Star toggle button (pure UI)
│   ├── DeleteConfirmation.tsx    → Delete confirmation content (pure UI, no Dialog)
│   └── ContactsEmptyState.tsx    → No contacts found
├── hooks/
│   ├── useCreateContact.ts
│   ├── useUpdateContact.ts
│   ├── useDeleteContact.ts
│   └── useToggleFavorite.ts
├── keys.ts                       → TanStack Query keys
├── options.ts                    → Query options factory
└── lib/
    └── formatContact.ts          → Display name, initials, etc.

src/server/schemas/
└── contacts.ts                   → DB schema + Zod validation schemas
```

**Note:** Routes handle Sheet/Dialog wrapper components. Feature components are pure UI that receive data and callbacks via props.

## Key UX Patterns

### 1. Sheet Navigation (in Routes)

```jsx
// Opening a sheet - navigate to child route
navigate({ to: '/contacts/$contactId', params: { contactId: '123' } })

// Closing a sheet - navigate back to list
navigate({ to: '/contacts', search: (prev) => prev })
// OR
router.history.back()
```

### 2. Route with Sheet Pattern

```jsx
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

```jsx
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

```jsx
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

## Advantages of This Approach

1. **URLs are shareable** - `/contacts/abc123` opens directly to that contact
2. **Browser navigation works** - Back button closes sheet naturally
3. **List stays visible** - Context is preserved, quick to return
4. **Fast interactions** - Inline favorites, no page reload for actions
5. **Code splitting** - Each sheet loads independently
6. **SSR compatible** - Route loaders can prefetch contact data
7. **Accessible** - Sheet focus management, escape to close

## Effort Estimate

- **Phase 1 (Core):** ~4 days
- **Phase 2 (Polish):** ~2 days
- **Phase 3 (Enhancement):** ~2 days
- **Total:** ~8 days

---

# Server Layer Implementation

## Server Layer

### Business Logic Module

`src/server/modules/contacts.ts`

```jsx
// Core functions - userId comes from session.user.id
export async function listContacts(userId, options)
export async function getContact(contactId, userId)
export async function createContact(data, userId)
export async function updateContact(contactId, data, userId)
export async function deleteContact(contactId, userId)
export async function toggleFavorite(contactId, userId)
```

### Server Query Functions

`src/server/queries/contacts.ts`

```jsx
import { requireAuth } from '@/server/modules/guards'
import { listContacts, getContact } from '@/server/modules/contacts'
import { listContactsInputSchema } from '@/server/schemas/contacts'

// requireAuth() returns session, user is at session.user
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

```jsx
import { requireAuth } from '@/server/modules/guards'
import {
  createContact,
  updateContact,
  deleteContact,
  toggleFavorite,
} from '@/server/modules/contacts'
import { createContactInputSchema } from '@/server/schemas/contacts'

// requireAuth() returns session, user is at session.user
export const createContactFn = createServerFn({ method: 'POST' })
  .validator(createContactInputSchema)
  .handler(async ({ data }) => {
    const session = await requireAuth()
    return createContact(data, session.user.id)
  })

export const toggleFavoriteFn = createServerFn({ method: 'POST' })
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    const session = await requireAuth()
    return toggleFavorite(data.id, session.user.id)
  })
```

## Validation Schemas

`src/server/schemas/contacts.ts` (alongside DB schema)

```jsx
import { z } from 'zod'

// Form input validation schemas (in same file as DB schema)
export const createContactInputSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().optional(),
  primaryEmail: z.string().email().optional().or(z.literal('')),
  primaryPhone: z.string().optional(),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  // ... other fields
})

export const updateContactInputSchema = createContactInputSchema.partial()

export const listContactsInputSchema = z.object({
  search: z.string().optional(),
  favorite: z.boolean().optional(),
  limit: z.number().min(1).max(100).default(50),
  offset: z.number().min(0).default(0),
  sortBy: z.enum(['name', 'company', 'createdAt']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
})
```

## TanStack Query Keys

`src/features/contacts/keys.ts`

```jsx
export const contactKeys = {
  all: ['contacts'],
  lists: () => [...contactKeys.all, 'list'],
  list: (filters) => [...contactKeys.lists(), filters],
  details: () => [...contactKeys.all, 'detail'],
  detail: (id) => [...contactKeys.details(), id],
}
```

---

# Implementation Phases

## Phase 1: Core Infrastructure (Days 1-4)

### 1.1 Database Schema Update

**File:** `src/server/schemas/contacts.ts`

Add new fields:

```jsx
// Add to contact table definition
avatarUrl: text(),
birthday: date(),
deletedAt: timestamp(),
```

Add new index:

```jsx
index('contact_deletedAt_idx').on(table.deletedAt),
```

Generate and run migration.

### 1.2 Server Business Logic Module

**File:** `src/server/modules/contacts.ts`

```jsx
import { and, eq, isNull, ilike, or, desc, asc } from 'drizzle-orm'
import { db } from '@/server/db/client'
import { contact } from '@/server/schemas/contacts'

export async function listContacts(userId, options = {}) {
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

export async function getContact(contactId, userId) {
  const [result] = await db
    .select()
    .from(contact)
    .where(and(eq(contact.id, contactId), eq(contact.userId, userId), isNull(contact.deletedAt)))
    .limit(1)

  return result ?? null
}

export async function createContact(data, userId) {
  const [result] = await db
    .insert(contact)
    .values({ ...data, userId })
    .returning()

  return result
}

export async function updateContact(contactId, data, userId) {
  const [result] = await db
    .update(contact)
    .set({ ...data, updatedAt: new Date() })
    .where(and(eq(contact.id, contactId), eq(contact.userId, userId), isNull(contact.deletedAt)))
    .returning()

  return result ?? null
}

export async function deleteContact(contactId, userId) {
  // Soft delete
  const [result] = await db
    .update(contact)
    .set({ deletedAt: new Date() })
    .where(and(eq(contact.id, contactId), eq(contact.userId, userId)))
    .returning()

  return result ?? null
}

export async function restoreContact(contactId, userId) {
  const [result] = await db
    .update(contact)
    .set({ deletedAt: null })
    .where(and(eq(contact.id, contactId), eq(contact.userId, userId)))
    .returning()

  return result ?? null
}

export async function toggleFavorite(contactId, userId) {
  const existing = await getContact(contactId, userId)
  if (!existing) return null

  return updateContact(contactId, { isFavorite: !existing.isFavorite }, userId)
}
```

### 1.3 Server Functions

**File:** `src/server/queries/contacts.ts`

```jsx
import { z } from 'zod'
import { createServerFn } from '@tanstack/react-start'
import { requireAuth } from '@/server/modules/guards'
import { listContacts, getContact } from '@/server/modules/contacts'
import { listContactsInputSchema } from '@/server/schemas/contacts'

// requireAuth() returns session, user is at session.user
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

**File:** `src/server/mutations/contacts.ts`

```jsx
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

// requireAuth() returns session, user is at session.user
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

export const toggleFavoriteFn = createServerFn({ method: 'POST' })
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    const session = await requireAuth()
    return toggleFavorite(data.id, session.user.id)
  })
```

### 1.4 Feature Module Setup

**File:** `src/features/contacts/keys.ts`

```jsx
export const contactKeys = {
  all: ['contacts'],
  lists: () => [...contactKeys.all, 'list'],
  list: (filters) => [...contactKeys.lists(), filters],
  details: () => [...contactKeys.all, 'detail'],
  detail: (id) => [...contactKeys.details(), id],
}
```

**File:** `src/features/contacts/options.ts`

```jsx
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
  detail(id) {
    return queryOptions({
      queryKey: contactKeys.detail(id),
      queryFn: () => getContactFn({ data: { id } }),
      enabled: !!id,
    })
  },
}
```

### 1.5 Routes Setup

Routes handle Sheet/Dialog wrappers. Pure UI components receive data via props.

**File:** `src/routes/_user/contacts.tsx` (Layout Route)

```jsx
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

```jsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_user/contacts/')({ component: () => null })
```

**File:** `src/routes/_user/contacts/new.tsx`

Route handles Sheet wrapper, ContactForm is pure UI.

```jsx
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/integrations/shadcn/components/ui/sheet'
import { ContactForm } from '@/features/contacts/components/ContactForm'
import { useCreateContact } from '@/features/contacts/hooks/useCreateContact'

export const Route = createFileRoute('/_user/contacts/new')({ component: CreateContactRoute })

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

Route handles Sheet wrapper, ContactDetail is pure UI.

```jsx
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Sheet, SheetContent } from '@/integrations/shadcn/components/ui/sheet'
import { ContactDetail } from '@/features/contacts/components/ContactDetail'
import { contactOptions } from '@/features/contacts/options'

export const Route = createFileRoute('/_user/contacts/$contactId')({
  loader: ({ context, params }) => {
    return context.queryClient.ensureQueryData(contactOptions.detail(params.contactId))
  },
  component: ContactDetailRoute,
})

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

**File:** `src/routes/_user/contacts/$contactId_.edit.tsx`

Route handles Sheet wrapper, ContactForm is pure UI.

```jsx
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/integrations/shadcn/components/ui/sheet'
import { ContactForm } from '@/features/contacts/components/ContactForm'
import { contactOptions } from '@/features/contacts/options'
import { useUpdateContact } from '@/features/contacts/hooks/useUpdateContact'

export const Route = createFileRoute('/_user/contacts/$contactId_/edit')({
  loader: ({ context, params }) => {
    return context.queryClient.ensureQueryData(contactOptions.detail(params.contactId))
  },
  component: EditContactSheet,
})
```

---

## Phase 2: UI Components (Days 4-6)

### 2.1 ContactsPage Component

**File:** `src/features/contacts/components/ContactsPage.tsx`

Main container with:

- ContactsHeader (search, filters, add button)
- ContactsTable (data grid)
- Pagination controls

### 2.2 ContactsTable Component

**File:** `src/features/contacts/components/ContactsTable.tsx`

Using TanStack Table with:

- Columns: Avatar, Name, Email, Phone, Company, Favorite, Actions
- Sortable columns
- Row hover actions
- Responsive design (hide columns on mobile)

### 2.3 ContactForm Component

**File:** `src/features/contacts/components/ContactForm.tsx`

Shared form for create/edit:

- Organized in sections (Basic, Contact, Work, Address, Notes)
- Uses TanStack Form + Zod validation
- Avatar upload integration
- Birthday date picker

### 2.4 Pure UI Components (No Sheet/Dialog Wrappers)

All components are stateless and receive data via props:

- `ContactDetail.tsx` - Contact detail content (no Sheet wrapper)
- `ContactForm.tsx` - Form fields for create/edit (no Sheet wrapper)
- `DeleteConfirmation.tsx` - Delete confirmation content (no Dialog wrapper)

### 2.5 Inline Components

- `FavoriteButton.tsx` - Star toggle button (pure UI, receives callbacks)
- `ContactAvatar.tsx` - Avatar with initials fallback
- `ContactSearch.tsx` - Controlled search input

---

## Phase 3: Polish & Enhancement (Days 6-8)

### 3.1 Search & Filtering

- Debounced search input (300ms)
- URL sync for all filters
- Filter presets (All, Favorites, Recent)

### 3.2 Optimistic Updates

- Favorite toggle instant feedback
- Delete with undo toast (5s window)
- Create/edit optimistic list updates

### 3.3 Empty States

- No contacts yet (with CTA)
- No search results
- Loading skeletons

### 3.4 Accessibility

- Keyboard navigation in table
- Focus management for sheets
- Screen reader announcements
- ARIA labels

### 3.5 Responsive Design

- Mobile: Card view instead of table
- Tablet: Condensed table columns
- Desktop: Full table with all columns

---

# File Checklist

## Server Layer

- [ ] `src/server/schemas/contacts.ts` - Add avatarUrl, birthday, deletedAt fields
- [ ] `src/server/modules/contacts.ts` - Business logic functions
- [ ] `src/server/queries/contacts.ts` - Server query functions
- [ ] `src/server/mutations/contacts.ts` - Server mutation functions
- [ ] Database migration - Generate and apply

## Feature Module

- [ ] `src/features/contacts/keys.ts` - Query keys
- [ ] `src/features/contacts/options.ts` - Query options
- [ ] `src/features/contacts/lib/formatContact.ts` - Display utilities

**Note:** Zod validation schemas are in `src/server/schemas/contacts.ts` alongside DB schema.

## Hooks

- [ ] `src/features/contacts/hooks/useCreateContact.ts`
- [ ] `src/features/contacts/hooks/useUpdateContact.ts`
- [ ] `src/features/contacts/hooks/useDeleteContact.ts`
- [ ] `src/features/contacts/hooks/useToggleFavorite.ts`

## Components (Pure UI - No Sheet/Dialog Wrappers)

- [ ] `src/features/contacts/components/ContactsPage.tsx` - Main container
- [ ] `src/features/contacts/components/ContactsHeader.tsx` - Search + filters + add button
- [ ] `src/features/contacts/components/ContactsTable.tsx` - Data table
- [ ] `src/features/contacts/components/ContactRow.tsx` - Table row with inline actions
- [ ] `src/features/contacts/components/ContactForm.tsx` - Form fields (pure UI)
- [ ] `src/features/contacts/components/ContactDetail.tsx` - Detail content (pure UI)
- [ ] `src/features/contacts/components/ContactAvatar.tsx` - Avatar with initials
- [ ] `src/features/contacts/components/ContactSearch.tsx` - Controlled search input
- [ ] `src/features/contacts/components/FavoriteButton.tsx` - Star toggle (pure UI)
- [ ] `src/features/contacts/components/DeleteConfirmation.tsx` - Delete confirmation (pure UI)
- [ ] `src/features/contacts/components/ContactsEmptyState.tsx` - Empty state

## Routes (Handle Sheet/Dialog Wrappers)

- [ ] `src/routes/_user/contacts.tsx` - Layout with Outlet
- [ ] `src/routes/_user/contacts/index.tsx` - Empty index
- [ ] `src/routes/_user/contacts/new.tsx` - Sheet wrapper + ContactForm
- [ ] `src/routes/_user/contacts/$contactId.tsx` - Sheet wrapper + ContactDetail
- [ ] `src/routes/_user/contacts/$contactId_.edit.tsx` - Sheet wrapper + ContactForm

---

# Success Criteria

1. **CRUD Operations** - All contact operations work correctly
2. **URL State** - Filters, search, and selected contact reflected in URL
3. **Smooth UX** - Sheets open/close smoothly, list stays visible
4. **Inline Actions** - Favorite toggle works without navigation
5. **Soft Delete** - Undo functionality works within time window
6. **Responsive** - Works on mobile, tablet, and desktop
7. **Accessible** - Keyboard navigable, screen reader friendly
8. **Performance** - List handles 1000+ contacts without lag
