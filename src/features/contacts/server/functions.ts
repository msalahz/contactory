import { createServerFn } from '@tanstack/react-start'

import { db } from '@/db'
import { contact } from '@/db/schemas/contacts'

export const listContactsFn = createServerFn().handler(() => {
  return db.select().from(contact)
})
