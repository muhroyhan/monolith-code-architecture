import express, { type Response } from 'express'
import { authRouter } from './modules/auth/auth.router'
import { adminRouter } from './modules/admin/admin.router'
import { requireAuth } from './middlewares/requireAuth'
import { ApiResponseBody } from '@monolith-code-architecture/types'
import { verifyCsrf } from './middlewares/verifyCsrf'
import { verifyRequestOrigin } from './middlewares/verifyRequestOrigin'

const router = () => {
  const appRouter = express.Router()

  appRouter.get('/', (_, res: Response<ApiResponseBody>) => {
    res.status(200).json({
      success: true,
      message: 'Hello World',
    })
  })
  appRouter.use('/auth', authRouter())
  appRouter.use(verifyRequestOrigin)
  appRouter.use(verifyCsrf)
  appRouter.use('/admin', requireAuth, adminRouter())

  return appRouter
}

export { router }
