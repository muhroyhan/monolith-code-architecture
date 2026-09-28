import express, { type Request, type Response } from 'express'
import { ApiResponseBody } from '@/types/response'
import { LoginBody } from './auth.type'
import { authService } from './auth.service'

const authRouter = () => {
  const router = express.Router()
  const service = authService()

  router.post('/login', async (req: Request<{}, {}, LoginBody>, res: Response<ApiResponseBody>) => {
    await service.login(req, res)
  })

  router.post('/logout', async (req: Request, res: Response<ApiResponseBody>) => {
    await service.logout(req, res)
  })

  return router
}

export { authRouter }
