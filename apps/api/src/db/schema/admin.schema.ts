import { boolean, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

export const adminTable = pgTable('admin', {
  id: uuid('id').primaryKey().defaultRandom().unique(),
  username: varchar('username', { length: 25 }).notNull().unique(),
  password: text('password').notNull(),
  isActive: boolean('is_active').notNull().default(true),
  isSuper: boolean('is_super').notNull().default(false),
  isDeleted: boolean('is_deleted').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  createdBy: varchar('created_by', { length: 25 }),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  updatedBy: varchar('updated_by', { length: 25 }),
})
