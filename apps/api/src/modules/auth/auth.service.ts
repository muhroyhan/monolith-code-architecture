import { verify } from 'argon2'
import { ApiError } from '@/classes/ApiError'
import { dbClient } from '@/db/client'
import { adminTable } from '@/db/schema/admin.schema'
import { eq } from 'drizzle-orm/pg-core/expressions'
import { LoginBody, LoginDataResponse } from '@monolith-code-architecture/types'

const authService = () => ({
  login: async (body?: LoginBody): Promise<LoginDataResponse['admin']> => {
    if (!body) throw new ApiError('Missing body', 403, 'FORBIDDEN')
    const admins = await dbClient
      .select({
        displayName: adminTable.displayName,
        id: adminTable.id,
        password: adminTable.password,
        isActive: adminTable.isActive,
        isSuper: adminTable.isSuper,
        deletedAt: adminTable.deletedAt,
      })
      .from(adminTable)
      .where(eq(adminTable.username, body.username.toString()))
      .limit(1)
    if (!admins || admins.length < 1) throw new ApiError('Admin not found', 404, 'NOT FOUND')
    const admin = admins[0]
    if (!admin.isActive) throw new ApiError('Admin not activated', 403, 'FORBIDDEN')
    if (!!admin.deletedAt) throw new ApiError('Admin was deleted', 410, 'GONE')
    const isVerified = await verify(admin.password, body.password)
    if (!isVerified) throw new ApiError('Not verified', 403, 'FORBIDDEN')
    return {
      id: admin.id,
      displayName: admin.displayName,
      isActive: admin.isActive,
      isSuper: admin.isSuper,
    }
  },
})

export { authService }
