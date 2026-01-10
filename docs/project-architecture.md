<!--
## Note to AI Agents
This document is intended for technical stakeholders who have a technical background in software development. It provides a high-level overview of the technical stack, architectural patterns, and implementation guidelines
-->

# Project Architecture: Contactory

## Executive Summary

Contactory is a modern contact management application built with cutting-edge web technologies. It serves as a digital
address book with advanced features like cloud storage, internationalization, and real-time collaboration capabilities.

**Key Characteristics:**

- **Full-Stack TypeScript**: End-to-end type safety from database to user interface
- **Feature-Sliced Architecture**: Modular organization that scales with team growth
- **Serverless Deployment**: Zero-configuration hosting on Cloudflare Workers
- **Bilingual Support**: Native English and Arabic interfaces with RTL layout support
- **Performance Optimized**: Virtual scrolling, cursor-based pagination, and image optimization

**Target Audience:** Small to medium businesses needing professional contact management with modern web standards.

---

## Technical Foundation

### Core Framework

| Technology         | Version | Purpose                    |
| ------------------ | ------- | -------------------------- |
| **React**          | 19.2.3  | UI library                 |
| **TypeScript**     | 5.9.3   | Type-safe JavaScript       |
| **Vite**           | 7.3.0   | Build tool & dev server    |
| **TanStack Start** | 1.145.7 | Full-stack React framework |

### Routing & State Management

| Technology           | Version | Purpose                  |
| -------------------- | ------- | ------------------------ |
| **TanStack Router**  | 1.145.7 | Type-safe routing        |
| **TanStack Query**   | 5.90.16 | Data fetching & caching  |
| **TanStack Form**    | 1.27.7  | Form handling            |
| **TanStack Store**   | 0.7.7   | State management & theme |
| **TanStack Table**   | Latest  | Headless data table      |
| **TanStack Virtual** | Latest  | Virtual scrolling        |

### Database & ORM

| Technology          | Version | Purpose                       |
| ------------------- | ------- | ----------------------------- |
| **Drizzle ORM**     | 0.45.1  | Database ORM (PostgreSQL)     |
| **PostgreSQL**      | 3.4.7   | Database client               |
| **Neon Hyperdrive** | Latest  | PostgreSQL connection pooling |

### UI & Styling

| Technology                   | Version | Purpose                |
| ---------------------------- | ------- | ---------------------- |
| **Tailwind CSS**             | 4.1.18  | Utility-first styling  |
| **shadcn/ui**                | Latest  | Component library      |
| **Radix UI**                 | 1.4.3   | Accessible primitives  |
| **Lucide React**             | 0.544.0 | Icons                  |
| **class-variance-authority** | 0.7.1   | Component variants     |
| **tailwind-merge**           | 3.4.0   | Tailwind class merging |

### Authentication & Security

| Technology           | Version | Purpose                             |
| -------------------- | ------- | ----------------------------------- |
| **better-auth**      | 1.4.10  | Authentication & session management |
| **@t3-oss/env-core** | 0.13.10 | Environment validation              |

### Internationalization

| Technology        | Version | Purpose                    |
| ----------------- | ------- | -------------------------- |
| **react-i18next** | Latest  | Translation management     |
| **i18next**       | Latest  | i18n framework             |
| **Luxon**         | Latest  | Date/time formatting       |
| **Intl API**      | Native  | Number/currency formatting |

### Animation & Effects

| Technology | Version | Purpose             |
| ---------- | ------- | ------------------- |
| **Motion** | 12.24.0 | Animation library   |
| **Sonner** | Latest  | Toast notifications |

### File Upload & Storage

| Technology        | Version | Purpose                    |
| ----------------- | ------- | -------------------------- |
| **Cloudflare R2** | Latest  | Object storage for avatars |
| **Wrangler**      | 4.54.0  | Cloudflare CLI             |

### Validation

| Technology | Version | Purpose           |
| ---------- | ------- | ----------------- |
| **Zod**    | 4.3.5   | Schema validation |

### Testing & Quality

| Technology          | Version | Purpose                |
| ------------------- | ------- | ---------------------- |
| **Vitest**          | 3.2.4   | Unit testing framework |
| **Testing Library** | 16.3.1  | Component testing      |
| **ESLint**          | 9.39.2  | Code linting           |
| **Prettier**        | 3.7.4   | Code formatting        |

### Deployment

| Technology             | Version | Purpose            |
| ---------------------- | ------- | ------------------ |
| **Cloudflare Workers** | Latest  | Serverless compute |
| **Cloudflare Pages**   | Latest  | Static hosting     |

### Environment Variables

#### Client Environment (VITE\_ prefix)

```typescript
// src/env.client.ts
export const env = createEnv({
  client: {
    VITE_BETTER_AUTH_BASE_URL: z.string().url(),
  },
  runtimeEnv: import.meta.env,
})
```

**Variables:**

- `VITE_BETTER_AUTH_BASE_URL` - Client-side auth base URL

#### Server Environment

```typescript
// src/env.server.ts
export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    BETTER_AUTH_SECRET: z.string(),
    BETTER_AUTH_URL: z.string().url(),
    R2_BUCKET: z.string(),
    R2_PUBLIC_URL: z.string().url(),
    RESEND_API_KEY: z.string(),
  },
  runtimeEnv: process.env,
})
```

**Never expose server environment variables to client code.**

---

## System Architecture

### 1. Feature-Sliced Monolith

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

**Rationale:**

- Clear client/server boundary prevents secret exposure
- Feature-based organization enables team ownership
- Modular structure supports future micro-frontend extraction

### 2. Server Functions (RPC via TanStack Start)

**Pattern**: Instead of REST APIs, use TanStack Start server functions for type-safe internal communication.

```typescript
// src/backend/queries/contacts.ts
export const listContactsFn = createServerFn()
  .validator(listContactsInputSchema)
  .handler(async ({ data }) => {
    const session = await requireAuth()
    return listContacts(session.user.id, data)
  })
```

```typescript
// Client usage - fully type-safe
const { data } = useQuery(contactOptions.list(filters))
```

**Benefits:**

- End-to-end type safety without manual API typing
- Automatic serialization/deserialization
- Compile-time verification of client-server contract
- Seamless TanStack Query integration

### 3. Route Groups with Middleware Guards

**Pattern**: Use `_` prefix for route groups with `route.tsx` files for layout and guards.

```
src/routes/_user/
├── route.tsx           # Auth guard, user layout
├── dashboard.tsx       # User dashboard
├── contacts.tsx        # Contacts list
└── contacts/
    ├── index.tsx
    ├── new.tsx        # Create sheet
    ├── $contactId.tsx # Detail sheet (layout for nested routes)
    └── $contactId.edit.tsx  # Edit sheet
```

**Rationale:**

- Centralized auth checks in `route.tsx`
- Nested layouts support sheet overlays
- Route groups keep related features together

### 4. Data Flow Architecture

```
User Action
    ↓
Component (Pure UI - no side effects)
    ↓
Hook (useCreateContact, useQuery, etc.)
    ↓
Server Function RPC (createContactFn)
    ↓
Business Logic Module (src/backend/modules/contacts.ts)
    ↓
Drizzle ORM Query
    ↓
PostgreSQL
    ↓
Response (Automatic serialization)
    ↓
TanStack Query Cache Update
    ↓
Component Re-render
```

### 5. Component Architecture

**Pure UI Components** (No side effects):

```typescript
// src/features/contacts/components/ContactForm.tsx
function ContactForm ({ contact, onSubmit, isPending }) {
  return (
    <form>
      {/* ... */ }
    < /form>
  )
}
```

**Hooks** (Side effects & data):

```typescript
// src/features/contacts/hooks/useCreateContact.ts
export function useCreateContact() {
  return useMutation({
    mutationFn: createContactFn,
    onSuccess: () => {
      queryClient.invalidateQueries(contactKeys.lists())
    },
  })
}
```

**Routes** (Sheet/dialog wrappers):

```typescript
// src/routes/_user/contacts/new.tsx
function CreateContactRoute () {
  const navigate = useNavigate()
  const { mutate } = useCreateContact()

  return (
    <Sheet
      open = { true }
  onOpenChange = {(open)
=>
  !open && navigate({ to: '/contacts' })
}
>
  <SheetContent>
    <ContactForm onSubmit = { mutate }
  />
  < /SheetContent>
  < /Sheet>
)
}
```

**Benefits:**

- Components are reusable and testable
- Hooks handle data logic
- Routes orchestrate UI composition

### 6. Query Key Factory Pattern

```typescript
// src/features/contacts/keys.ts
export const contactKeys = {
  all: ['contacts'] as const,
  lists: () => [...contactKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...contactKeys.lists(), filters] as const,
  details: () => [...contactKeys.all, 'detail'] as const,
  detail: (id: string) => [...contactKeys.details(), id] as const,
}

// src/features/contacts/options.ts
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

**Benefits:**

- Centralized query key management
- Type-safe cache invalidation
- Consistent naming conventions

### Database Architecture

#### Schema Pattern (Drizzle ORM)

```typescript
// src/backend/schemas/contacts.ts
import { pgTable, text, timestamp, boolean, index } from 'drizzle-orm/pg-core'
import { v7 } from 'uuid'

export const contact = pgTable(
  'contact',
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => v7()),
    userId: text()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    firstName: text().notNull(),
    // ... other fields
    isFavorite: boolean().default(false).notNull(),
    avatarUrl: text(),
    deletedAt: timestamp(), // null = active, set = soft-deleted
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
  },
  (table) => [
    index('contact_userId_idx').on(table.userId),
    index('contact_userId_deletedAt_idx').on(table.userId, table.deletedAt),
    index('contact_firstName_idx').on(table.firstName),
    index('contact_primaryEmail_idx').on(table.primaryEmail),
    index('contact_isFavorite_idx').on(table.isFavorite),
  ],
)
```

#### Soft Delete Pattern

**Query Pattern**: Always filter `WHERE deletedAt IS NULL`

```typescript
const conditions = [eq(contact.userId, userId), isNull(contact.deletedAt)]
```

**Trash View**: Only show `WHERE deletedAt IS NOT NULL`

```typescript
const conditions = [eq(contact.userId, userId), isNotNull(contact.deletedAt)]
```

**Restore**: Set `deletedAt = NULL`

```typescript
db.update(contact).set({ deletedAt: null }).where(...)
```

**Permanent Delete**: Actually remove from database

```typescript
db.delete(contact).where(...)
```

### Authentication & Authorization

#### Pattern: Session-Based Authentication

**Provider**: better-auth
**Session Storage**: Secure HTTP-only cookies
**Cookie Options**:

- `secure: true` (HTTPS only)
- `httpOnly: true` (No JavaScript access)
- `sameSite: 'lax'` (CSRF protection)

#### Authorization Guards

**Route-level Guard**:

```typescript
// src/routes/_user/route.tsx
export const Route = createFileRoute('/_user')({
  beforeLoad: async ({ context }) => {
    const authUser = await authGuard(context)
    return { authUser }
  },
})
```

**Function-level Guard** (Server functions):

```typescript
export const createContactFn = createServerFn()
  .validator(createContactInputSchema)
  .handler(async ({ data }) => {
    const session = await requireAuth() // Throws if not authenticated
    return createContact(data, session.user.id)
  })
```

**Data-level Isolation**:

```typescript
// Every query filters by authenticated user
const contacts = await db
  .select()
  .from(contact)
  .where(
    and(
      eq(contact.userId, session.user.id), // User isolation
      isNull(contact.deletedAt), // Soft delete filter
    ),
  )
```

---

## Features & Quality

### Internationalization Architecture

#### File Structure (Feature-Based Colocated)

```
src/
├── features/
│   ├── auth/
│   │   └── locales/
│   │       ├── en.json
│   │       └── ar.json
│   ├── contacts/
│   │   └── locales/
│   │       ├── en.json
│   │       └── ar.json
└── core/
    └── locales/           # Core/Shared (buttons, errors, validation)
        ├── en.json
        └── ar.json
```

#### Namespace Aggregation

```typescript
// src/integrations/i18n/resources.ts
import authEn from '@/features/auth/locales/en.json'
import authAr from '@/features/auth/locales/ar.json'
import contactsEn from '@/features/contacts/locales/en.json'
import contactsAr from '@/features/contacts/locales/ar.json'

export const resources = {
  en: {
    common: commonEn,
    auth: authEn,
    contacts: contactsEn,
  },
  ar: {
    common: commonAr,
    auth: authAr,
    contacts: contactsAr,
  },
} as const
```

#### RTL/LTR Layout

**Direction Detection**:

```typescript
const isRTL = language === 'ar'
document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
document.documentElement.lang = language
```

**CSS Logical Properties** (Automatic direction):

```css
/* Instead of ml-4 (margin-left), use: */
ms-4 /* margin-inline-start - auto-flips based on dir */
me-4 /* margin-inline-end */
ps-4 /* padding-inline-start */
pe-4 /* padding-inline-end */
start-0 /* left/right - auto-flips */
text-start

/* text-left/text-right - auto-flips */
```

**Date & Number Formatting**:

```typescript
// src/core/utils/formatters.ts
export function formatDate(date: Date, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function formatNumber(num: number, locale: string) {
  return new Intl.NumberFormat(locale).format(num)
}
```

### File Upload & Storage Architecture

#### Avatar Upload Flow

1. **Client-Side**:
   - Resize/compress image (max 512x512)
   - Create FormData with image
   - Call `uploadAvatarFn` server function

2. **Server-Side**:
   - Validate file (size, type)
   - Upload to R2 using key: `/contacts/${contactId}/${timestamp}.ext`
   - Return public URL
   - Store URL in database

3. **Storage**:
   - **Bucket**: Cloudflare R2
   - **Public URL**: `https://cdn.contactory.consultin.dev/`
   - **Access**: Read-only public URLs for images

#### Deletion Pattern

```typescript
// When permanently deleting a contact:
async function permanentDeleteContact(contactId: string) {
  const contact = await getContact(contactId)

  // Delete avatar from R2
  if (contact.avatarUrl) {
    await deleteFromR2(extractR2Key(contact.avatarUrl))
  }

  // Delete contact from database
  await db.delete(contact).where(eq(contact.id, contactId))
}
```

### Performance Optimization Strategies

#### 1. Virtual Scrolling

**Library**: TanStack Virtual

```typescript
const { rows } = useReactTable({
  data: contacts,
  columns,
  // ...
})

const virtualizer = useVirtualizer({
  count: rows.length,
  getScrollElement: () => containerRef.current,
  estimateSize: () => 50,
  overscan: 10,
})

const virtualRows = virtualizer.getVirtualItems()
```

**Benefits**:

- Only visible rows rendered
- Handles 1000+ items smoothly
- Maintains 60 FPS scrolling

#### 2. Cursor-Based Pagination

**Pattern**: Use last item ID instead of offset

```typescript
export async function listContacts(
  userId: string,
  options: {
    cursor?: string
    limit?: number
  },
) {
  const conditions = [eq(contact.userId, userId), isNull(contact.deletedAt)]

  if (options.cursor) {
    conditions.push(gt(contact.id, options.cursor))
  }

  return db
    .select()
    .from(contact)
    .where(and(...conditions))
    .orderBy(asc(contact.id))
    .limit(options.limit ?? 50)
}
```

**Benefits**:

- No offset drift during inserts/deletes
- Consistent results
- Better performance with large datasets

#### 3. Image Optimization

**Client-Side**:

```typescript
// Resize/compress before upload
const resized = await resizeImage(file, {
  maxWidth: 512,
  maxHeight: 512,
  quality: 0.8, // JPEG quality
})
```

**R2 Configuration**:

- Enable image optimization
- Set appropriate cache headers
- Use CDN for distribution

#### 4. Database Indexing

**Indexes on contacts table**:

- `userId` - Fast user filtering
- `(userId, deletedAt)` - Combined filter
- `firstName` - Search/sorting
- `primaryEmail` - Search
- `isFavorite` - Favorite filtering

### Error Handling Patterns

#### Server Function Error Handling

```typescript
export const createContactFn = createServerFn()
  .validator(createContactInputSchema)
  .handler(async ({ data }) => {
    try {
      const session = await requireAuth()
      return await createContact(data, session.user.id)
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new ServerError('Validation failed', { cause: error })
      }
      throw error
    }
  })
```

#### Client Error Handling

```typescript
const { mutate, isPending, error } = useMutation({
  mutationFn: createContactFn,
  onError: (error) => {
    toast.error(error.message || 'Failed to create contact')
  },
  onSuccess: () => {
    toast.success('Contact created')
    navigate({ to: '/contacts' })
  },
})
```

#### Optimistic Error Recovery

```typescript
const { mutate } = useMutation({
  mutationFn: deleteContactFn,
  onMutate: async (contactId) => {
    // Optimistically remove from list
    const previous = queryClient.getQueryData(contactKeys.lists())
    queryClient.setQueryData(contactKeys.lists(), (old) => old?.filter((c) => c.id !== contactId))
    return { previous }
  },
  onError: (error, variables, context) => {
    // Restore if failed
    queryClient.setQueryData(contactKeys.lists(), context?.previous)
    toast.error('Failed to delete contact')
  },
})
```

---

## Development & Operations

### Testing Strategy

#### Unit Tests (Vitest)

```typescript
// src/features/contacts/lib/formatContact.test.ts
describe('formatContact', () => {
  it('returns initials from first and last name', () => {
    const result = formatContact({ firstName: 'John', lastName: 'Doe' })
    expect(result.initials).toBe('JD')
  })
})
```

#### Integration Tests

```typescript
// src/backend/mutations/contacts.test.ts
describe('createContactFn', () => {
  it('creates contact for authenticated user', async () => {
    const result = await createContactFn({
      firstName: 'John',
      primaryEmail: 'john@example.com',
    })
    expect(result.id).toBeDefined()
  })
})
```

#### Component Tests

```typescript
// src/features/contacts/components/ContactForm.test.ts
describe('ContactForm', () => {
  it('submits form with valid data', async () => {
    const onSubmit = vi.fn()
    render(<ContactForm onSubmit = { onSubmit }
    />)

    fireEvent.change(screen.getByLabelText('First Name'), {
      target: { value: 'John' },
    })
    fireEvent.click(screen.getByText('Create'))

    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
      firstName: 'John',
    }))
  })
})
```

### Security Considerations

#### Input Validation

- All user inputs validated with Zod schemas
- Server-side validation before database operations
- Client-side validation for UX feedback

#### Authentication

- Session-based auth with HTTP-only cookies
- CSRF protection via SameSite cookie attribute
- Rate limiting on auth endpoints

#### Authorization

- User isolation at database level
- Query-level filtering by authenticated user ID
- Middleware guards on protected routes

#### Data Security

- HTTPS-only communication
- Secure R2 storage with public read access
- Encrypted passwords via better-auth
- No sensitive data in URLs or localStorage

#### File Upload Security

- File type validation (JPG, PNG, WebP)
- File size limits (5MB max)
- Client-side compression to prevent abuse
- Unique keys for uploaded files

### Monitoring & Observability

#### Error Tracking

- Unhandled errors logged to console (dev)
- Production errors tracked (future: Sentry)

#### Performance Monitoring

- Database query performance monitoring
- React component render tracking
- Bundle size analysis

#### Logging

- Server function execution logging
- Database operation logging
- Authentication event logging

### Build & Deployment

#### Development

```bash
pnpm dev           # Start dev server on :3000
pnpm typecheck     # TypeScript checking
pnpm lint          # ESLint
pnpm format        # Prettier
```

#### Production Build

```bash
pnpm build         # Production build
pnpm deploy        # Deploy to Cloudflare Workers
```

#### Database Management

```bash
pnpm db:generate   # Generate migrations from schema
pnpm db:migrate    # Run migrations
pnpm db:studio     # Drizzle Studio GUI
```

---

## Guidelines & Standards

### Coding Conventions

#### Naming Conventions

| Type           | Pattern                     | Example                         |
| -------------- | --------------------------- | ------------------------------- |
| **Files**      | lowercase-with-hyphens      | `contact-form.tsx`              |
| **Components** | PascalCase                  | `ContactForm`                   |
| **Hooks**      | camelCase with 'use' prefix | `useCreateContact`              |
| **Functions**  | camelCase                   | `formatContact`                 |
| **Constants**  | UPPER_SNAKE_CASE            | `MAX_CONTACTS`                  |
| **Types**      | PascalCase                  | `Contact`, `CreateContactInput` |

#### Import Style

```typescript
// Use explicit imports, not barrels
import { createContact } from '@/backend/modules/contacts' // ✅
import { createContact } from '@/backend/modules' // ❌

// Path aliases
import { ContactForm } from '@/features/contacts/components' // ✅
import { ContactForm } from '../../../features/contacts' // ❌
```

#### React Patterns

```typescript
// Use function declarations for components
export function ContactForm({ contact, onSubmit }: Props) {
  // ...
}

// Extract custom hooks
export function useCreateContact() {
  return useMutation({
    /* ... */
  })
}

// Use Zod for validation
const schema = z.object({
  firstName: z.string().min(1),
})

// Use CVA for variants
const buttonVariants = cva('btn', {
  variants: {
    variant: { primary: 'btn-primary' },
  },
})
```

### Development Guidelines (Do's & Don'ts)

#### Architecture Enforcement

**Do:**

- Keep `src/backend/*` completely separate from client code
- Always filter by authenticated user ID at database level
- Use TanStack Start server functions for internal operations
- Organize features in `src/features/*/` with clear boundaries
- Use explicit imports, avoid barrel files (index.ts exports)
- Keep business logic in `modules/`, not in routes or components

**Don't:**

- Import server code in client components (build will fail)
- Use barrel exports for cross-feature imports
- Store server secrets in client-accessible code
- Skip authentication guards on protected server functions
- Mix business logic with UI components
- Create core utilities that mix server and client code

#### Internationalization Enforcement

**Do:**

- Use logical CSS properties (`ms-*`, `me-*`, `start-*`, `end-*`) for layouts
- Extract all user-facing strings to translation files
- Organize translations by feature namespace
- Test all layouts in both LTR and RTL directions
- Use semantic translation keys (`auth.signIn.title` not `button1`)

**Don't:**

- Use physical properties (`ml-*`, `mr-*`, `left-*`, `right-*`) for directional layouts
- Hardcode strings in components
- Centralize all translations in single file
- Use CSS transforms for RTL (scaleX(-1))
- Assume LTR layout in component logic

#### Database Patterns

**Do:**

- Use soft delete with `deletedAt` field for restorable records
- Always filter `isNull(deletedAt)` in active queries
- Index frequently filtered/searched columns
- Use cursor-based pagination for large datasets
- Validate all inputs with Zod before database operations

**Don't:**

- Hard-delete records without backups
- Forget to filter soft-deleted records
- Create N+1 query situations
- Use offset-based pagination with large datasets
- Store unvalidated user input

#### Testing Standards

**Unit Tests:**

- Pure utility functions (formatters, validators)
- Business logic in modules
- Component props/behaviors
- Target: >80% coverage for new code

**Integration Tests:**

- Server functions with database
- Auth flows
- Data isolation (user can't access other's data)
- Error handling paths

**Not Required (yet):**

- E2E tests (Playwright considered for future)
- Visual regression tests
- Performance benchmarks

---

## Architecture Decisions & Rationale

### Technology Stack Choices

#### Why TanStack Start over Next.js?

- Full control over framework structure
- Tighter integration with TanStack ecosystem (Router, Query, Form)
- SSR/SSG capabilities without Next.js constraints
- Better TypeScript support for server functions

#### Why Drizzle ORM over Prisma?

- Lightweight - no code generation, pure SQL-like syntax
- Better TypeScript inference
- More control over database schema
- Simpler migrations for simple applications

#### Why Tailwind CSS v4 over styled-components/Emotion?

- Zero runtime overhead
- Built-in RTL support via logical properties
- CSS standards aligned (future-proof)
- Consistent with shadcn/ui component system

#### Why better-auth over NextAuth/Clerk?

- Self-hosted option (no external dependencies)
- Simpler setup for small teams
- Full control over session management
- No vendor lock-in

#### Why PostgreSQL over MongoDB?

- Structured data fits well (contacts have fixed schema)
- ACID guarantees for data integrity
- Better indexing performance for queries
- Neon Hyperdrive provides serverless option for Cloudflare

### Architecture Decision Rationale

#### Feature-Sliced Monolith over Microservices

**Chosen because:**

- Team size doesn't warrant distributed complexity
- Monolith easier to refactor/extract later if needed
- Single codebase for rapid iteration
- Shared types across client/server

**Trade-offs accepted:**

- Scaling requires vertical scaling until very large
- Must be disciplined about module boundaries

#### Server Functions (RPC) over REST

**Chosen because:**

- End-to-end type safety without manual API definitions
- Automatic serialization/deserialization
- Seamless TanStack Query integration
- Less boilerplate

**Limitations:**

- Not suitable for external/third-party API clients
- Can use file-based API routes when needed

#### Soft Delete Pattern

**Chosen because:**

- Enables undo functionality (core requirement)
- Safer than hard delete during development
- Trash view provides safety net
- Can eventually hard-delete old soft-deleted records

**Trade-offs:**

- Requires filtering deletedAt in all queries
- Slight performance overhead from extra column/index

---

## Consequences of Architecture Decisions

### Positive

- **Type Safety**: Full TypeScript from database to UI
- **Developer Experience**: Minimal boilerplate, clear patterns
- **Performance**: Virtual scrolling, cursor pagination, optimized images
- **Maintainability**: Feature-sliced organization with clear boundaries
- **Security**: Multi-layer auth (routes, functions, queries)
- **Internationalization**: Built-in from start, not retrofitted
- **Scalability**: Can extract features to microservices later

### Negative

- **Learning Curve**: Multiple TanStack libraries require some learning
- **Initial Setup**: Multiple configuration files needed
- **Monolith Limitations**: Vertical scaling only until very large
- **i18n Complexity**: RTL/LTR testing required for all layouts
- **Database Complexity**: Multiple indexes needed for performance
- **Testing Overhead**: Must test both LTR and RTL variants

---

## Related Architecture Decision Records

- **ADR-001**: Tech Stack - documents all technology choices and rationale
- **ADR-002**: Modular Monolith Architecture - details file structure and patterns
- **ADR-003**: Internationalization - bilingual (EN/AR) architecture

---

**Last Updated**: January 10, 2026
**Maintained By**: Mohammed
**Related Documents**: ADR-001, ADR-002, ADR-003 (can be archived after migration)
