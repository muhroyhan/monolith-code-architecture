import express from 'express'
import { adminController } from './admin.controller'
import { requirePermission } from '@/middlewares/requirePermission'
import { requestValidator } from '@/middlewares/requestValidator'
import {
  createAdminBodySchema,
  getAdminQuerySchema,
  updateAdminBodySchema,
} from '@monolith-code-architecture/constants'

const adminRouter = () => {
  const router = express.Router()
  const controller = adminController()

  router.get(
    '/',
    requirePermission('admin:read'),
    requestValidator({ query: getAdminQuerySchema }),
    controller.findAll,
  )
  router.get('/:id', requirePermission('admin:read'), controller.findOne)
  router.post(
    '/',
    requirePermission('admin:create'),
    requestValidator({ body: createAdminBodySchema }),
    controller.create,
  )
  router.patch(
    '/:id',
    requirePermission('admin:update'),
    requestValidator({ body: updateAdminBodySchema }),
    controller.update,
  )
  router.delete('/:id', requirePermission('admin:delete'), controller.delete)

  return router
}

export { adminRouter }
