import { and, eq } from 'drizzle-orm'
import { notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

import { db } from '@/server/db/client'
import { contact } from '@/server/schemas/contacts'
import { authFnMiddleware } from '@/integrations/better-auth/middlewares'
import { contactIdInputSchema, contactSchema, newContactSchema } from '@/features/contacts/schema'

export const getContactsCountFn = createServerFn()
  .middleware([authFnMiddleware])
  .handler(({ context }) => db.$count(contact, eq(contact.userId, context.user.id)))

export const listContactsFn = createServerFn()
  .middleware([authFnMiddleware])
  .handler(({ context }) =>
    db.query.contact.findMany({
      where: eq(contact.userId, context.user.id),
    }),
  )

export const findContactFn = createServerFn()
  .middleware([authFnMiddleware])
  .inputValidator(contactIdInputSchema)
  .handler(async ({ data, context }) => {
    const item = await db.query.contact.findFirst({
      where: and(eq(contact.id, data.contactId), eq(contact.userId, context.user.id)),
    })
    return item ?? null
  })

export const createContactFn = createServerFn({ method: 'POST' })
  .middleware([authFnMiddleware])
  .inputValidator(newContactSchema)
  .handler(
    async ({ data, context }) =>
      await db.insert(contact).values({ ...data, userId: context.user.id }),
  )

export const updateContactFn = createServerFn({ method: 'POST' })
  .middleware([authFnMiddleware])
  .inputValidator(contactSchema)
  .handler(async ({ data, context }) => {
    if (data.userId !== context.user.id) {
      throw new Error('Unauthorized')
    }

    const [updated] = await db
      .update(contact)
      .set(data)
      .where(and(eq(contact.id, data.id), eq(contact.userId, context.user.id)))
      .returning({ contactId: contact.id })

    if (!updated?.contactId) {
      throw notFound()
    }

    return Promise.resolve()
  })
