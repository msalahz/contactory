import { env } from 'cloudflare:workers'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as auth from '@/server/schemas/auth'
import * as contact from '@/server/schemas/contacts'

const schema = { ...auth, ...contact }

/**
 * Get database instance using Hyperdrive connection.
 * Must be called within a request context in Cloudflare Workers.
 */
export function getDb() {
  const client = postgres(env.NEON_HYPERDRIVE.connectionString)
  return drizzle(client, { schema, casing: 'snake_case' })
}
