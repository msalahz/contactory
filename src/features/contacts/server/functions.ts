import { eq } from 'drizzle-orm'
import { createServerFn } from '@tanstack/react-start'

import { db } from '@/db'
import { contact } from '@/db/schemas/contacts'
import { authFnMiddleware } from '@/integrations/better-auth/middlewares/auth-fn-middleware'

export const listContactsFn = createServerFn()
  .middleware([authFnMiddleware])
  .handler(({ context }) =>
    db.select().from(contact).where(eq(contact.userId, context.session.user.id)),
  )
