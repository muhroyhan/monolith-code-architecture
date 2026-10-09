import express from 'express'
import { adminController } from './admin.controller'
import { requirePermission } from '@/middlewares/requirePermission'

const adminRouter = () => {
  const router = express.Router()
  const controller = adminController()

  router.get('/', requirePermission('admin:read'), controller.findAll)
  router.get('/:id', requirePermission('admin:read'), controller.findOne)
  router.post('/', requirePermission('admin:create'), controller.create)
  router.patch('/:id', requirePermission('admin:update'), controller.update)
  router.delete('/:id', requirePermission('admin:delete'), controller.delete)

  return router
}

export { adminRouter }
