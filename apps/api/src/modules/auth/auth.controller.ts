import { type Request, type Response } from 'express'
import { authService } from './auth.service'
import { ApiError } from '@/classes/ApiError'
import { ApiResponseBody, LoginBody, LoginDataResponse } from '@monolith-code-architecture/types'
import { cookieConfig, cookieSessionName } from '@/constants/cookie.constant'
import {
  adminNameCookieName,
  adminPermissionCookieName,
  superadminCookieName,
} from '@monolith-code-architecture/constants'

const authController = () => {
  const service = authService()
  return {
    login: async (
      req: Request<{}, {}, LoginBody>,
      res: Response<ApiResponseBody<LoginDataResponse>>,
    ) => {
      const admin = await service.login(req.body)
      res.cookie(adminNameCookieName, admin.displayName, {
        ...cookieConfig,
        httpOnly: false,
      })
      res.cookie(adminPermissionCookieName, JSON.stringify(admin.permissions), {
        ...cookieConfig,
        httpOnly: false,
      })
      res.cookie(superadminCookieName, admin.isSuper, {
        ...cookieConfig,
        httpOnly: false,
      })
      req.session.regenerate((err) => {
        if (err) throw new ApiError(err, 403, 'FORBIDDEN')
        req.session.admin = {
          id: admin.id,
          displayName: admin.displayName,
          isActive: admin.isActive,
          isSuper: admin.isSuper,
          permissions: admin.permissions.map((item) => `${item.featureName}:${item.access}`),
        }

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
        res.clearCookie(cookieSessionName, cookieConfig)
        res.clearCookie(adminNameCookieName, cookieConfig)
        res.clearCookie(adminPermissionCookieName, cookieConfig)
        res.status(200).send({ success: true })
      })
    },
  }
}

export { authController }
