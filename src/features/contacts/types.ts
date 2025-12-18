import type { contact } from '@/db/schemas/contacts'

export type Contact = typeof contact.$inferSelect
