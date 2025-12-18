import { z } from 'zod'

import type { contact } from '@/db/schemas/contacts'

export type Contact = typeof contact.$inferSelect

export const contactIdInputSchema = z.object({ contactId: z.string() })
export type ContactIdInput = z.infer<typeof contactIdInputSchema>
