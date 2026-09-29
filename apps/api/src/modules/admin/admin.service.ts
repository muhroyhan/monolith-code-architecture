import { dbClient } from '@/db/client'
import { adminTable } from '@/db/schema'
import {
  AdminCreateBodyRequest,
  AdminDataResponse,
  AdminQueryRequest,
} from '@monolith-code-architecture/types'
import { hash } from 'argon2'
import { SQL } from 'drizzle-orm'
import { and, eq, ilike } from 'drizzle-orm/pg-core/expressions'

const adminService = () => ({
  getWhere: (query?: AdminQueryRequest): SQL | undefined => {
    if (!query) return undefined
    const where: SQL[] = []
    if (!!query.isDeleted) where.push(eq(adminTable.isDeleted, query.isDeleted))
    else where.push(eq(adminTable.isDeleted, false))
    if (!!query.isActive) where.push(eq(adminTable.isActive, query.isActive))
    if (!!query.username) where.push(ilike(adminTable.username, query.username))
    return and(...where)
  },
  findAll: async (query?: SQL): Promise<AdminDataResponse['admins']> => {
    const admins = await dbClient
      .select({
        id: adminTable.id,
        username: adminTable.username,
        isActive: adminTable.isActive,
        isSuper: adminTable.isSuper,
        isDeleted: adminTable.isDeleted,
        updatedAt: adminTable.updatedAt,
        updatedBy: adminTable.updatedBy,
      })
      .from(adminTable)
      .where(query)
    return admins
  },
  create: async (body: AdminCreateBodyRequest) => {
    const hashedPass = await hash(body.password)
    await dbClient.insert(adminTable).values({
      ...body,
      password: hashedPass,
    })
  },
})

export { adminService }
