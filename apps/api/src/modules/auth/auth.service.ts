import { LoginBody } from './auth.type'
import { hash, verify } from 'argon2'
import { ApiError } from '@/classes/ApiError'

const authService = () => ({
  login: async (body?: LoginBody) => {
    if (!body) throw new ApiError('Missing body', 403, 'FORBIDDEN')
    const userPass = await hash('abc')
    const isVerified = await verify(userPass, body.password)
    if (!isVerified) throw new ApiError('Not verified', 403, 'FORBIDDEN')
    return { id: '1' }
  },
})

export { authService }
