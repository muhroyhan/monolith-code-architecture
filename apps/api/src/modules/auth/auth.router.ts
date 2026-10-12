import express from 'express'
import { authController } from './auth.controller'
import { loginBodySchema } from '@monolith-code-architecture/constants'
import { requestValidator } from '@/middlewares/requestValidator'
import { verifyCsrf } from '@/middlewares/verifyCsrf'
import { verifyRequestOrigin } from '@/middlewares/verifyRequestOrigin'

const authRouter = () => {
  const router = express.Router()
  const controller = authController()

  router.post(
    '/login',
    verifyRequestOrigin,
    requestValidator({ body: loginBodySchema }),
    controller.login,
  )
  router.post('/logout', verifyCsrf, controller.logout)

  return router
}

export { authRouter }
