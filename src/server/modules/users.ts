import { getDb } from '@/server/db/client'

export function findUser(userId: string) {
  const db = getDb()
  return db.query.users.findFirst({ where: (users, { eq }) => eq(users.id, userId) })
}
