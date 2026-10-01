import { ApiResponseBody } from '@monolith-code-architecture/types'
import express, { type Request, type Response } from 'express'
import { adminController } from './admin.controller'

const adminRouter = () => {
  const router = express.Router()
  const controller = adminController()

  router.get('/', controller.findAll)
  router.get('/:id', controller.findOne)
  router.post('/', controller.create)
  router.patch('/:id', controller.update)

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
