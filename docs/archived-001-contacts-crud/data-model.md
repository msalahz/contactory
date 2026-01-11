# Data Model: Contacts CRUD

**Feature**: Contacts CRUD  
**Status**: Draft

## Database Schema (PostgreSQL/Drizzle)

### Table: `contact`

| Column         | Type            | Nullable | Default    | Description                           |
| :------------- | :-------------- | :------- | :--------- | :------------------------------------ |
| `id`           | `text` (UUIDv7) | No       | `uuidv7()` | Primary Key                           |
| `userId`       | `text`          | No       | -          | Foreign Key -> `users.id` (Owner)     |
| `firstName`    | `text`          | No       | -          | Required first name                   |
| `lastName`     | `text`          | Yes      | -          |                                       |
| `displayName`  | `text`          | Yes      | -          | Computed or custom display name       |
| `nickname`     | `text`          | Yes      | -          |                                       |
| `primaryEmail` | `text`          | Yes      | -          | Validated email format                |
| `primaryPhone` | `text`          | Yes      | -          |                                       |
| `company`      | `text`          | Yes      | -          |                                       |
| `jobTitle`     | `text`          | Yes      | -          |                                       |
| `department`   | `text`          | Yes      | -          |                                       |
| `street`       | `text`          | Yes      | -          | Address line                          |
| `city`         | `text`          | Yes      | -          |                                       |
| `state`        | `text`          | Yes      | -          |                                       |
| `postalCode`   | `text`          | Yes      | -          |                                       |
| `country`      | `text`          | Yes      | -          |                                       |
| `notes`        | `text`          | Yes      | -          | Long text notes                       |
| `website`      | `text`          | Yes      | -          | Validated URL                         |
| `isFavorite`   | `boolean`       | No       | `false`    | Favorite status                       |
| `avatarUrl`    | `text`          | Yes      | -          | R2 public URL for avatar image        |
| `deletedAt`    | `timestamp`     | Yes      | `null`     | Soft delete timestamp. Null = Active. |
| `createdAt`    | `timestamp`     | No       | `now()`    |                                       |
| `updatedAt`    | `timestamp`     | No       | `now()`    | Auto-updated                          |

### Indexes

- `contact_userId_idx` on `userId` (Filter by user)
- `contact_userId_deletedAt_idx` on `userId`, `deletedAt` (Filter active/trash)
- `contact_firstName_idx` on `firstName` (Search/Sort)
- `contact_lastName_idx` on `lastName` (Search/Sort)
- `contact_primaryEmail_idx` on `primaryEmail` (Search)
- `contact_company_idx` on `company` (Search/Sort)
- `contact_isFavorite_idx` on `isFavorite` (Filter favorites)

### Relations

- **Many-to-One**: `contact.userId` -> `users.id`
  - On Delete User: Cascade (Delete contacts)

## Validation Schemas (Zod)

### `createContactSchema`

```typescript
z.object({
  firstName: z.string().min(1).trim(),
  lastName: z.string().optional(),
  nickname: z.string().optional(),
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
  isFavorite: z.boolean().default(false),
  avatarUrl: z.string().url().optional(), // Provided after upload
})
```

### `updateContactSchema`

- Partial of `createContactSchema`

### `uploadAvatarSchema`

```typescript
z.object({
  avatar: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, 'Max size 5MB')
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      'Invalid format',
    ),
})
```
