import { ApiResponseBody } from '@monolith-code-architecture/types'
import { type Request, type Response } from 'express'
import type { RequestHandler } from 'express'

const requireAuth: RequestHandler = (req: Request, res: Response<ApiResponseBody>, next) => {
  if (!req.session.adminId) {
    res.status(401).json({
      success: false,
      error: {
        message: 'You are not authorized to use this feature',
        code: 'UNAUTORIZED',
      },
    })
    return
  }

  next()
}

export { requireAuth }
