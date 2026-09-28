import express, { type Response } from 'express'
import { authRouter } from './modules/auth/auth.router'
import type { ApiResponseBody } from './types/response'
import { adminRouter } from './modules/admin/admin.router'

const router = () => {
  const appRouter = express.Router()

  appRouter.get('/', (_, res: Response<ApiResponseBody>) => {
    res.status(200).json({
      success: true,
      message: 'Hello World',
    })
  })
  appRouter.use('/auth', authRouter())
  appRouter.use('/admin', adminRouter())

  return appRouter
}

export { router }
