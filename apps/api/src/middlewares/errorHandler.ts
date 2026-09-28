// middleware/errorMiddleware.ts
import { NextFunction, Request, Response } from 'express'
import { ApiResponseBody } from '../types/response'
import { ApiError } from '@/classes/ApiError'

const errorHandler = (
  err: any,
  _req: Request,
  res: Response<ApiResponseBody>,
  _next: NextFunction
) => {
  const statusCode = err instanceof ApiError ? err.statusCode : 500
  const code = err instanceof ApiError ? err.code : 'INTERNAL_SERVER_ERROR'
  const message = err.message || 'An unexpected error occurred.'

  return res.status(statusCode).json({
    success: false,
    error: {
      message,
      code,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  })
}

export { errorHandler }
