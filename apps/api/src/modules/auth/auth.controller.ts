import { type Request, type Response } from 'express'
import { ApiResponseBody } from '@/types/response'
import { LoginBody } from './auth.type'
import { authService } from './auth.service'
import { ApiError } from '@/classes/ApiError'

const authController = () => {
  const service = authService()
  return {
    login: async (req: Request<{}, {}, LoginBody>, res: Response<ApiResponseBody>) => {
      const admin = await service.login(req.body)
      req.session.regenerate((err) => {
        if (err) throw new ApiError('FORBIDDEN', 403)
        req.session.adminId = admin.id
        req.session.save((saveErr) => {
          if (saveErr) throw new ApiError(saveErr, 403, 'FORBIDDEN')
          res.status(200).json({
            success: true,
            data: { admin },
          })
        })
      })
    },
    logout: async (req: Request, res: Response<ApiResponseBody>) => {
      req.session.destroy((err) => {
        if (err) throw new ApiError(err, 400, 'ERROR')
        res.clearCookie('__Host-session', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
        })
        res.status(200).send({ success: true })
      })
    },
  }
}

export { authController }
