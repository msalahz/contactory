import { v7 as uuidv7 } from 'uuid'
import { boolean, index, jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

import { user } from './auth'

export const contact = pgTable(
  'contact',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),

    // Basic Info
    firstName: text('first_name').notNull(),
    lastName: text('last_name'),
    displayName: text('display_name'), // computed or custom name
    nickname: text('nickname'),

    // Contact Methods
    primaryEmail: text('primary_email'),
    primaryPhone: text('primary_phone'),

    // Organization Info
    company: text('company'),
    jobTitle: text('job_title'),
    department: text('department'),

    // Address (stored as JSON for flexibility)
    address: jsonb('address').$type<{
      street?: string
      city?: string
      state?: string
      postalCode?: string
      country?: string
      type?: 'home' | 'work' | 'other'
    }>(),

    // Additional Info
    notes: text('notes'),
    website: text('website'),

    // Metadata
    isFavorite: boolean('is_favorite').default(false).notNull(),

    // Timestamps
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
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
