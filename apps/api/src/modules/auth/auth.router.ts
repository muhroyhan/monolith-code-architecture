import express from 'express'
import { authController } from './auth.controller'
import { loginBodySchema } from '@monolith-code-architecture/constants'
import { requestValidator } from '@/middlewares/requestValidator'

const authRouter = () => {
  const router = express.Router()
  const controller = authController()

  router.post('/login', requestValidator({ body: loginBodySchema }), controller.login)
  router.post('/logout', controller.logout)

  return router
}

export { authRouter }
