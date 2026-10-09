import { verify } from 'argon2'
import { ApiError } from '@/classes/ApiError'
import { dbClient } from '@/db/client'
import { LoginBody, LoginDataResponse } from '@monolith-code-architecture/types'

const authService = () => ({
  login: async (body?: LoginBody): Promise<LoginDataResponse['admin']> => {
    if (!body) throw new ApiError('Missing body', 403, 'FORBIDDEN')
    const admin = await dbClient.query.adminTable.findFirst({
      columns: {
        displayName: true,
        id: true,
        password: true,
        isActive: true,
        isSuper: true,
        deletedAt: true,
      },
      where: {
        username: body.username,
      },
      with: {
        permissions: {
          columns: {
            featureName: true,
            access: true,
          },
        },
      },
    })
    if (!admin) throw new ApiError('Admin not found', 404, 'NOT FOUND')
    if (!admin.isActive) throw new ApiError('Admin not activated', 403, 'FORBIDDEN')
    if (!!admin.deletedAt) throw new ApiError('Admin was deleted', 410, 'GONE')
    const isVerified = await verify(admin.password, body.password)
    if (!isVerified) throw new ApiError('Not verified', 403, 'FORBIDDEN')
    return {
      id: admin.id,
      displayName: admin.displayName,
      isActive: admin.isActive,
      isSuper: admin.isSuper,
      permissions: admin.permissions,
    }
  },
})

export { authService }
