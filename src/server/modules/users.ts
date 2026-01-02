import { db } from '@/server/db/client'

export function findUser(userId: string) {
  return db.query.user.findFirst({ where: (user, { eq }) => eq(user.id, userId) })
}
