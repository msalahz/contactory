import { v7 as uuidv7 } from 'uuid'
import { boolean, index, jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

import { user } from './auth'

export const contact = pgTable(
  'contact',
  {
    id: text().primaryKey().$defaultFn(() => uuidv7()),
    userId: text()
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),

    // Basic Info
    firstName: text().notNull(),
    lastName: text(),
    displayName: text(), // computed or custom name
    nickname: text(),

    // Contact Methods
    primaryEmail: text(),
    primaryPhone: text(),

    // Organization Info
    company: text(),
    jobTitle: text(),
    department: text(),

    // Address (stored as JSON for flexibility)
    address: jsonb().$type<{
      street?: string
      city?: string
      state?: string
      postalCode?: string
      country?: string
      type?: 'home' | 'work' | 'other'
    }>(),

    // Additional Info
    notes: text(),
    website: text(),

    // Metadata
    isFavorite: boolean().default(false).notNull(),

    // Timestamps
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp()
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index('contact_userId_idx').on(table.userId),
    index('contact_firstName_idx').on(table.firstName),
    index('contact_lastName_idx').on(table.lastName),
    index('contact_primaryEmail_idx').on(table.primaryEmail),
    index('contact_isFavorite_idx').on(table.isFavorite, table.userId),
  ],
)
