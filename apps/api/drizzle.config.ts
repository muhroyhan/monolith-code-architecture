import { defineConfig } from 'drizzle-kit'
import dotenv from 'dotenv'

dotenv.config({ path: '../../.env' })

const DATABASE_URL =
  `postgresql://${process.env.DATABASE_USER}` +
  `:${process.env.DATABASE_PASS}@${process.env.DATABASE_HOST}` +
  `/${process.env.DATABASE_NAME}`

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema/index.ts',
  dialect: 'postgresql',
  dbCredentials: { url: DATABASE_URL },
})
