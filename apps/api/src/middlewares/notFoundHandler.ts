import { ApiResponseBody } from '@monolith-code-architecture/types'
import { type NextFunction, type Request, type Response } from 'express'

const notFoundHandler = (_req: Request, res: Response<ApiResponseBody>, _next: NextFunction) => {
  return res.status(404).json({
    success: false,
    error: {
      message: 'Request tidak ditemukan.',
      code: 'Not Found',
    },
  })
}

export { notFoundHandler }
