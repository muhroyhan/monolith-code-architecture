import {
  boolean,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  unique,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

export const adminTable = pgTable('admin', {
  id: uuid('id').primaryKey().defaultRandom().unique(),
  username: varchar('username', { length: 50 }).notNull().unique(),
  displayName: varchar('display_name', { length: 50 }).notNull(),
  password: text('password').notNull(),
  isActive: boolean('is_active').notNull().default(true),
  isSuper: boolean('is_super').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  createdBy: varchar('created_by', { length: 25 }),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  updatedBy: varchar('updated_by', { length: 25 }),
  deletedAt: timestamp('deleted_at'),
  deletedBy: varchar('deleted_by', { length: 25 }),
})

export const permissionAccess = pgEnum('permission_access', ['create', 'read', 'update', 'delete'])

export const permissionTable = pgTable(
  'permission',
  {
    id: uuid('id').primaryKey().defaultRandom().unique(),
    featureName: varchar('feature_name', { length: 25 }).notNull(),
    access: permissionAccess('access').default('read').notNull(),
  },
  (t) => [unique('feature_name_access_unique').on(t.featureName, t.access)],
)

export const adminPermissionTable = pgTable(
  'admin_permission',
  {
    adminId: uuid('admin_id')
      .notNull()
      .references(() => adminTable.id),
    permissionId: uuid('permission_id')
      .notNull()
      .references(() => permissionTable.id),
  },
  (t) => [primaryKey({ columns: [t.adminId, t.permissionId] })],
)
