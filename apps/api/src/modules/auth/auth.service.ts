import { verify } from 'argon2'
import { ApiError } from '@/classes/ApiError'
import { dbClient } from '@/db/client'
import { LoginBody, LoginDataResponse } from '@monolith-code-architecture/types'
import { omit } from 'es-toolkit'

const authService = () => ({
  login: async (body?: LoginBody): Promise<LoginDataResponse['admin']> => {
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
        username: body?.username,
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

    // trade-off: timing oracle = perbedaan waktu respons bisa memberi petunjuk tentang keadaan API.
    const isAccountAvalable = body && !!admin && admin.isActive && !admin.deletedAt
    const sourcePassword = admin?.password ?? process.env.PASSWORD_DUMMY_HASH!
    const isVerified = await verify(sourcePassword, body?.password || '')
    if (!isAccountAvalable || !isVerified) {
      console.error({
        timestamp: new Date().getUTCDate(),
        message: 'Login Failed',
        data: {
          admin: admin ? omit(admin, ['password']) : {},
        },
        code: 401,
      })
      throw new ApiError('Check your username/password and try again.', 401, 'UNAUTORIZED')
    }
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
