import type { user } from '@/db/schemas/auth'

export type User = typeof user.$inferSelect
