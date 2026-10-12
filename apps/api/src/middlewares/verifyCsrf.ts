import { ApiResponseBody } from '@monolith-code-architecture/types'
import { RequestHandler, Response } from 'express'

const verifyCsrf: RequestHandler = (req, res: Response<ApiResponseBody>, next) => {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next()
  }

  const csrfToken = req.headers['x-csrf-token']
  if (!csrfToken || csrfToken !== req.session.csrfToken) {
    return res.status(403).json({
      success: false,
      error: {
        message: 'Your token is not valid',
        code: 'FORBIDDEN',
      },
    })
  }
  next()
}

export { verifyCsrf }
