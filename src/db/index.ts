import { config } from 'dotenv'

import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

import * as auth from './schemas/auth'
import * as contact from './schemas/contacts'

// Load environment variables from .env.local
config({ path: '.env.local' })

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  min: 10,
})

pool.on('error', (err) => {
  console.error('Unexpected error on idle client:', err)
})

export const db = drizzle(pool, { schema: { ...auth, ...contact }, casing: 'snake_case' })
