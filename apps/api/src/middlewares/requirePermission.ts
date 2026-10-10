import { ApiResponseBody } from '@monolith-code-architecture/types'
import { type Request, type Response } from 'express'
import type { RequestHandler } from 'express'

const requirePermission: (permission: string) => RequestHandler =
  (permission) => async (req: Request, res: Response<ApiResponseBody>, next) => {
    if (!req.session.admin?.isSuper) {
      if (permission.includes('admin')) {
        res.status(403).json({
          success: false,
          error: {
            message: 'You are not allowed to use Admin Features',
            code: 'FORBIDDEN',
          },
        })
        return
      }
      const isAllowed = req.session.admin?.permissions?.find((item) => item === permission)
      if (!isAllowed) {
        res.status(403).json({
          success: false,
          error: {
            message: 'You are not allowed to use this API',
            code: 'FORBIDDEN',
          },
        })
        return
      }
    }
    next()
  }

export { requirePermission }
