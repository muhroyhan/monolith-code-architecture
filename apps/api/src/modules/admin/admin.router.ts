import express from 'express'
import { adminController } from './admin.controller'

const adminRouter = () => {
  const router = express.Router()
  const controller = adminController()

  router.get('/', controller.findAll)
  router.get('/:id', controller.findOne)
  router.post('/', controller.create)
  router.patch('/:id', controller.update)
  router.delete('/:id', controller.delete)

  return router
}

export { adminRouter }
