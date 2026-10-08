import { cookieConfig } from '@/constants/cookie.constant'
import { adminNameCookieName } from '@monolith-code-architecture/constants'
import { ApiResponseBody } from '@monolith-code-architecture/types'
import { type Request, type Response } from 'express'
import type { RequestHandler } from 'express'

const requireAuth: RequestHandler = (req: Request, res: Response<ApiResponseBody>, next) => {
  if (!req.session || !req.session.user) {
    res.status(401).json({
      success: false,
      error: {
        message: 'You are not authorized',
        code: 'UNAUTORIZED',
      },
    })
    return
  }
  if (!req.session.user.isActive) {
    res.status(401).json({
      success: false,
      error: {
        message: 'You account is not active',
        code: 'UNAUTORIZED',
      },
    })
    return
  }
  if (req.session.cookie.maxAge) {
    const currentMaxAge = req.session.cookie.maxAge ?? 0

    if (currentMaxAge <= 0) {
      res.cookie(adminNameCookieName, req.session.user.displayName, {
        ...cookieConfig,
        httpOnly: false,
      })
    }
  }
  if (req.session.user.isSuper) {
    next()
  }

  next()
}

export { requireAuth }
