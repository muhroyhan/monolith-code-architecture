import express, { type Request, type Response } from 'express'
import { ApiResponseBody } from '@/types/response'

const adminRouter = () => {
  const router = express.Router()

  router.get('/', (req: Request, res: Response<ApiResponseBody>) => {
    console.log(req.query)
    return res.status(200).json({
      success: true,
      data: req.query,
    })
  })

  router.get('/:id', (req: Request, res: Response<ApiResponseBody>) => {
    console.log(req.params)
    return res.status(200).json({
      success: true,
      data: req.params,
    })
  })

  router.post('/', (req: Request, res: Response<ApiResponseBody>) => {
    console.log(req.body)
    return res.status(200).json({
      success: true,
      data: req.body,
    })
  })

  router.patch('/', (req: Request, res: Response<ApiResponseBody>) => {
    console.log(req.body)
    return res.status(200).json({
      success: true,
      data: req.body,
    })
  })

  router.delete('/:id', (req: Request, res: Response<ApiResponseBody>) => {
    console.log(req.params)
    return res.status(200).json({
      success: true,
      data: req.params,
    })
  })

  return router
}

export { adminRouter }
