import express from 'express'
import { authController } from './auth.controller'
import { loginBodySchema } from '@monolith-code-architecture/constants'
import { requestValidator } from '@/middlewares/requestValidator'
import { verifyCsrf } from '@/middlewares/verifyCsrf'
import { verifyRequestOrigin } from '@/middlewares/verifyRequestOrigin'
import { rateLimit } from 'express-rate-limit'

const authRouter = () => {
  const router = express.Router()
  const controller = authController()

  router.post(
    '/login',
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 3,
      message: {
        success: false,
        error: {
          message: 'Too much request, try again after 15 minutes',
          code: 'RATE_LIMIT',
        },
      },
      standardHeaders: true,
      legacyHeaders: false,
      skipSuccessfulRequests: true,
    }),
    verifyRequestOrigin,
    requestValidator({ body: loginBodySchema }),
    controller.login,
  )
  router.post('/logout', verifyCsrf, controller.logout)

  return router
}

export { authRouter }
