import { dbClient } from '@/db/client'
import { adminPermissionTable, adminTable } from '@/db/schema'
import {
  AdminData,
  AdminQueryRequest,
  AdminCreateUpdateBodyRequest,
  PaginationQueryRequest,
  PermissionData,
} from '@monolith-code-architecture/types'
import { and, eq, inArray, isNotNull, isNull, like, or } from 'drizzle-orm/pg-core/expressions'
import {
  AdminServiceCreateBody,
  AdminServiceDeleteBody,
  AdminServiceUpdateBody,
} from './admin.type'
import { sql, SQL } from 'drizzle-orm/sql/sql'
import { count } from 'drizzle-orm/sql/functions/aggregate'
import { hash } from 'argon2'
import { isEmptyObject } from 'es-toolkit/predicate'
import { ApiError } from '@/classes/ApiError'

const adminService = () => ({
  getWhere: (query?: AdminQueryRequest): SQL | undefined => {
    if (!query) return undefined
    const where: SQL[] = []
    if (query.isDeleted === 'true') where.push(isNotNull(adminTable.deletedAt))
    else where.push(isNull(adminTable.deletedAt))
    if (!!query.isActive) where.push(eq(adminTable.isActive, query.isActive === 'true'))
    if (!!query.isSuper) where.push(eq(adminTable.isSuper, query.isSuper === 'true'))
    if (!!query.name)
      where.push(
        or(
          like(adminTable.username, `%${query.name}%`),
          like(adminTable.displayName, `%${query.name}%`),
        )!,
      )
    return and(...where)
  },
  getUpdateValues: async (body: Partial<AdminCreateUpdateBodyRequest>) => {
    let newBody: Partial<AdminServiceUpdateBody> = {}

    if (body.username) {
      newBody = { ...newBody, username: body.username }
    }
    if (body.displayName) {
      newBody = { ...newBody, displayName: body.displayName }
    }
    if (body.password) {
      const hashedPass = await hash(body.password)
      newBody = { ...newBody, password: hashedPass }
    }
    if (body.isActive) {
      newBody = { ...newBody, isActive: body.isActive === 'true' }
    }
    if (body.isSuper) {
      newBody = { ...newBody, isSuper: body.isSuper === 'true' }
    }
    if (body.permissions) {
      newBody = {
        ...newBody,
        permissions: body.permissions?.map((item) => {
          const splitted = item.split(':')
          return <PermissionData>{
            featureName: splitted[0],
            access: splitted[1],
          }
        }),
      }
    }
    return newBody
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
      admins.limit(Number(pagination.size)).offset(offset)
    }
    return await admins
  },
  count: async (query?: SQL): Promise<number> => {
    const admins = await dbClient.select({ count: count() }).from(adminTable).where(query)
    return admins[0].count
  },
  findById: async (id: string): Promise<AdminData | undefined> => {
    const admin = await dbClient.query.adminTable.findFirst({
      columns: {
        id: true,
        username: true,
        displayName: true,
        isActive: true,
        isSuper: true,
        updatedAt: true,
        updatedBy: true,
      },
      where: { id },
      with: {
        permissions: true,
      },
    })
    return admin
  },
  findByUsername: async (username: string): Promise<AdminData | undefined> => {
    const admin = await dbClient.query.adminTable.findFirst({
      columns: {
        id: true,
        username: true,
        displayName: true,
        isActive: true,
        isSuper: true,
        updatedAt: true,
        updatedBy: true,
      },
      where: { username },
    })
    return admin
  },
  create: async (body: AdminServiceCreateBody) => {
    const { permissions, ...rest } = body
    await dbClient.transaction(async (tx) => {
      const [newAdmin] = await tx.insert(adminTable).values(rest).returning({ id: adminTable.id })
      if (permissions && permissions.length > 0) {
        const currentPermissions = await tx.query.permissionTable.findMany({
          where: {
            RAW: (table): SQL =>
              inArray(sql`concat(${table.featureName},':',${table.access})`, permissions),
          },
        })
        if (currentPermissions.length <= 0) {
          tx.rollback()
          throw new ApiError('Permission not found', 404, 'NOT FOUND')
        }
        const newRelations = currentPermissions.map((item) => ({
          adminId: newAdmin.id,
          permissionId: item.id,
        }))
        if (newRelations.length > 0) await tx.insert(adminPermissionTable).values(newRelations)
      }
    })
  },
  update: async (id: string, body: Partial<AdminServiceUpdateBody>) => {
    const { permissions, ...rest } = body
    await dbClient.transaction(async (tx) => {
      if (!isEmptyObject(rest)) await tx.update(adminTable).set(rest).where(eq(adminTable.id, id))
      if (permissions) {
        await tx.delete(adminPermissionTable).where(eq(adminPermissionTable.adminId, id))
        if (permissions.length > 0) {
          const avPermissions = await tx.query.permissionTable.findMany({
            where: {
              RAW: (table): SQL =>
                inArray(
                  sql`concat(${table.featureName},':',${table.access})`,
                  permissions.map((item) => `${item.featureName}:${item.access}`),
                ),
            },
          })
          if (avPermissions.length <= 0) {
            tx.rollback()
            throw new ApiError('Permission not found', 404, 'NOT FOUND')
          }
          const newRelations = avPermissions.map((item) => ({
            adminId: id,
            permissionId: item.id,
          }))
          await tx.insert(adminPermissionTable).values(newRelations)
        }
      }
    })
  },
  delete: async (id: string, body: AdminServiceDeleteBody) => {
    await dbClient.update(adminTable).set(body).where(eq(adminTable.id, id))
  },
})

export { adminService }
