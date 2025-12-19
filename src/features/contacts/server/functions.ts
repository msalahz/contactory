import { and, eq } from 'drizzle-orm'
import { createServerFn } from '@tanstack/react-start'

import { db } from '@/db'
import { contact } from '@/db/schemas/contacts'
import { authFnMiddleware } from '@/integrations/better-auth/middlewares'
import { contactIdInputSchema } from '@/features/contacts/models'

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
