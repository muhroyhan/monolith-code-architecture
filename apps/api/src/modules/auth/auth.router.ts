import express from 'express'
import { authController } from './auth.controller'

const authRouter = () => {
  const router = express.Router()
  const controller = authController()

  router.post('/login', controller.login)
  router.post('/logout', controller.logout)

  return router
}

export { authRouter }
