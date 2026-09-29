// src/db/index.ts
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

const DATABASE_URL =
  `postgresql://${process.env.DATABASE_USER}` +
  `:${process.env.DATABASE_PASS}@${process.env.DATABASE_HOST}` +
  `/${process.env.DATABASE_NAME}`
const pool = new Pool({
  connectionString: DATABASE_URL,
})
export const dbClient = drizzle({ client: pool })
