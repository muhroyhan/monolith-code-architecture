import express, { type Request, type Response } from 'express'
import { ApiResponseBody } from '@/types/response'

const authRouter = () => {
  const router = express.Router()

  router.post('login', (req: Request, res: Response<ApiResponseBody>) => {
    console.log(req.body)
    return res.status(200).json({
      success: true,
      data: req.body,
    })
  })

  router.post('logout', (req: Request, res: Response<ApiResponseBody>) => {
    console.log(req.body)
    return res.status(200).json({
      success: true,
      data: req.body,
    })
  })

  return router
}

export { authRouter }
