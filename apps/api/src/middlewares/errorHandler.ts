// middleware/errorMiddleware.ts
import { NextFunction, Request, Response } from 'express'
import { ApiError } from '@/classes/ApiError'
import { ApiResponseBody } from '@monolith-code-architecture/types'

const errorHandler = (
  err: any,
  _req: Request,
  res: Response<ApiResponseBody>,
  _next: NextFunction,
) => {
  const statusCode = err instanceof ApiError ? err.statusCode : 500
  const code = err instanceof ApiError ? err.code : 'INTERNAL_SERVER_ERROR'
  const message = err.message || 'An unexpected error occurred.'

  if (statusCode >= 500) {
    console.error({
      requestId: res.locals.requestId,
      details: err,
    })
    return res.status(statusCode).json({
      success: false,
      error: {
        message: 'Internal Server Error',
        code,
      },
    })
  }
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
