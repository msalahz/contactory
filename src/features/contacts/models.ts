import { z } from 'zod'
import { createSelectSchema } from 'drizzle-zod'

import { contact } from '@/db/schemas/contacts'

export const contactSchema = createSelectSchema(contact)
export type Contact = z.infer<typeof contactSchema>

export const newContactSchema = contactSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
})
export type NewContact = z.infer<typeof newContactSchema>

export const updateContactSchema = contactSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
})

export const contactIdInputSchema = z.object({ contactId: contactSchema.shape.id })
export type ContactIdInput = z.infer<typeof contactIdInputSchema>
