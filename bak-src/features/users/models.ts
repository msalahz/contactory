import type { user } from '@/server/schemas/auth'

export type User = typeof user.$inferSelect
