import { z } from 'zod'

export const contactSchema = z.object({
  id: z.string(),

  userId: z.string(),

  // Basic Info
  firstName: z.string(),
  lastName: z.string().optional(),
  displayName: z.string().optional(), // computed or custom name
  nickname: z.string().optional(),

  // Contact Methods
  primaryEmail: z.string().optional(),
  primaryPhone: z.string().optional(),

  // Organization Info
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  department: z.string().optional(),

  // Address
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),

  // Additional Info
  notes: z.string().optional(),
  website: z.string().optional(),

  // Metadata
  isFavorite: z.boolean(),

  // Timestamps
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Contact = z.infer<typeof contactSchema>

export const newContactSchema = contactSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
})
export type NewContact = z.infer<typeof newContactSchema>

export const updateContactSchema = contactSchema.omit({
  createdAt: true,
  updatedAt: true,
})

export const contactIdInputSchema = z.object({ contactId: contactSchema.shape.id })
export type ContactIdInput = z.infer<typeof contactIdInputSchema>
