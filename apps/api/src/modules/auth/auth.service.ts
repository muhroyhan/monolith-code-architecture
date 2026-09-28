import type { Request, Response } from 'express'
import { LoginBody } from './auth.type'
import { ApiResponseBody } from '@/types/response'
import { hash, verify } from 'argon2'
import { ApiError } from '@/classes/ApiError'

const authService = () => ({
  login: async (
    req: Request<{}, {}, LoginBody>,
    res: Response<ApiResponseBody<{ admin: { id: string } }>>
  ) => {
    if (!req.body) throw new ApiError('Missing body', 403, 'FORBIDDEN')
    const userPass = await hash('abc')
    const isVerified = await verify(userPass, req.body.password)
    if (!isVerified) throw new ApiError('Not verified', 403, 'FORBIDDEN')
    const admin = { id: '1' }

    // Rotate session ID after authentication.
    req.session.regenerate((err) => {
      if (err) {
        throw new ApiError('FORBIDDEN', 403)
      }

      req.session.adminId = admin.id
      req.session.save((saveErr) => {
        if (saveErr) {
          throw new ApiError(saveErr, 403, 'FORBIDDEN')
        }

        res.status(200).json({
          success: true,
          data: { admin: { id: admin.id } },
        })
      })
    })
  },
  logout: (req: Request, res: Response<ApiResponseBody<{ admin: { id: string } }>>) => {
    req.session.destroy((err) => {
      if (err) {
        throw new ApiError(err, 400, 'ERROR')
      }

      res.clearCookie('__Host-session', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      })

      res.status(204).send()
    })
  },
})

export { authService }
