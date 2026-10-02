import { dbClient } from '@/db/client'
import { adminTable } from '@/db/schema'
import {
  AdminData,
  AdminQueryRequest,
  PaginationQueryRequest,
} from '@monolith-code-architecture/types'
import { and, eq, isNotNull, isNull, like, or } from 'drizzle-orm/pg-core/expressions'
import {
  AdminServiceCreateBody,
  AdminServiceDeleteBody,
  AdminServiceUpdateBody,
} from './admin.type'
import { SQL } from 'drizzle-orm/sql/sql'
import { count } from 'drizzle-orm/sql/functions/aggregate'

const adminService = () => ({
  getWhere: (query?: AdminQueryRequest): SQL | undefined => {
    if (!query) return undefined
    const where: SQL[] = []
    if (!!query.isDeleted) where.push(isNotNull(adminTable.deletedAt))
    else where.push(isNull(adminTable.deletedAt))
    if (!!query.isActive) where.push(eq(adminTable.isActive, query.isActive))
    if (!!query.isSuper) where.push(eq(adminTable.isSuper, query.isSuper))
    if (!!query.username)
      where.push(
        or(
          like(adminTable.username, `%${query.username}%`),
          like(adminTable.displayName, `%${query.username}%`),
        )!,
      )
    return and(...where)
  },
  findAll: async (pagination?: PaginationQueryRequest, query?: SQL): Promise<AdminData[]> => {
    const admins = dbClient
      .select({
        id: adminTable.id,
        username: adminTable.username,
        displayName: adminTable.displayName,
        isActive: adminTable.isActive,
        isSuper: adminTable.isSuper,
        updatedAt: adminTable.updatedAt,
        updatedBy: adminTable.updatedBy,
      })
      .from(adminTable)
      .where(query)

    if (pagination) {
      const offset = (pagination.number - 1) * pagination.size
      admins.limit(pagination.size).offset(offset)
    }
    return await admins
  },
  count: async (query?: SQL): Promise<number> => {
    const admins = await dbClient.select({ count: count() }).from(adminTable).where(query)
    return admins[0].count
  },
  findById: async (id: string): Promise<AdminData | object> => {
    const admins = await dbClient
      .select({
        id: adminTable.id,
        username: adminTable.username,
        displayName: adminTable.displayName,
        isActive: adminTable.isActive,
        isSuper: adminTable.isSuper,
        updatedAt: adminTable.updatedAt,
        updatedBy: adminTable.updatedBy,
      })
      .from(adminTable)
      .where(and(eq(adminTable.id, id), isNull(adminTable.deletedAt)))
      .limit(1)
    return admins ? admins[0] : {}
  },
  findByUsername: async (username: string): Promise<AdminData | object> => {
    const admins = await dbClient
      .select({
        id: adminTable.id,
        username: adminTable.username,
        displayName: adminTable.displayName,
        isActive: adminTable.isActive,
        isSuper: adminTable.isSuper,
        updatedAt: adminTable.updatedAt,
        updatedBy: adminTable.updatedBy,
      })
      .from(adminTable)
      .where(eq(adminTable.username, username))
      .limit(1)
    return admins ? admins[0] : {}
  },
  create: async (body: AdminServiceCreateBody) => {
    await dbClient.insert(adminTable).values(body)
  },
  update: async (id: string, body: Partial<AdminServiceUpdateBody>) => {
    await dbClient.update(adminTable).set(body).where(eq(adminTable.id, id))
  },
  delete: async (id: string, body: AdminServiceDeleteBody) => {
    await dbClient.update(adminTable).set(body).where(eq(adminTable.id, id))
  },
})

export { adminService }
