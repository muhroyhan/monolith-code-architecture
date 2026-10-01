import { cookieConfig } from '@/constants/cookie.constant'
import { loggedCookieName } from '@monolith-code-architecture/constants'
import { ApiResponseBody } from '@monolith-code-architecture/types'
import { type Request, type Response } from 'express'
import type { RequestHandler } from 'express'

const requireAuth: RequestHandler = (req: Request, res: Response<ApiResponseBody>, next) => {
  if (!req.session.username) {
    res.status(401).json({
      success: false,
      error: {
        message: 'You are not authorized to use this feature',
        code: 'UNAUTORIZED',
      },
    })
    return
  }

  if (req.session && req.session.username) {
    const currentMaxAge = req.session.cookie.maxAge ?? 0

    if (currentMaxAge <= 0) {
      res.cookie(loggedCookieName, 'true', {
        ...cookieConfig,
        httpOnly: false,
      })
    }
  }

  next()
}

export { requireAuth }
