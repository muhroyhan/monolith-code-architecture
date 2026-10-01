import { type Request, type Response } from 'express'
import {
  AdminCreateBodyRequest,
  AdminData,
  AdminQueryRequest,
  AdminUpdateBodyRequest,
  ApiResponseBody,
  TableDataResponse,
} from '@monolith-code-architecture/types'
import { adminService } from './admin.service'
import { hash } from 'argon2'

const adminController = () => {
  const service = adminService()
  return {
    findAll: async (
      req: Request<{}, {}, {}, AdminQueryRequest>,
      res: Response<ApiResponseBody<TableDataResponse<AdminData>>>,
    ) => {
      const queries = service.getWhere(req.query)
      const dataFeed = await service.findAll(queries)
      res.status(200).send({ success: true, data: { dataFeed } })
    },
    findOne: async (
      req: Request<{ id: string }>,
      res: Response<ApiResponseBody<AdminData | object>>,
    ) => {
      const data = await service.findOne(req.params.id)
      res.status(200).send({ success: true, data })
    },
    create: async (
      req: Request<{}, {}, AdminCreateBodyRequest>,
      res: Response<ApiResponseBody>,
    ) => {
      const hashedPass = await hash(req.body.password)
      await service.create({
        ...req.body,
        password: hashedPass,
        isActive: Boolean(req.body.isActive),
        isSuper: Boolean(req.body.isSuper),
        createdBy: req.session.username ?? '',
        updatedBy: req.session.username ?? '',
      })
      res.status(200).send({ success: true })
    },
    update: async (
      req: Request<{ id: string }, {}, Partial<AdminUpdateBodyRequest>>,
      res: Response<ApiResponseBody>,
    ) => {
      let body: object = {
        ...req.body,
        updatedBy: req.session.username ?? '',
      }
      if (req.body.password) {
        const hashedPass = await hash(req.body.password)
        body = { ...body, password: hashedPass }
      }
      if (req.body.isActive) {
        body = { ...body, isActive: Boolean(req.body.isActive) }
      }
      if (req.body.isSuper) {
        body = { ...body, isActive: Boolean(req.body.isSuper) }
      }
      if (req.body.isDeleted) {
        body = { ...body, isActive: Boolean(req.body.isDeleted) }
      }
      await service.update(req.params.id, body)
      res.status(200).send({ success: true })
    },
    delete: async (req: Request<{ id: string }>, res: Response<ApiResponseBody>) => {
      await service.delete(req.params.id, {
        deletedAt: new Date(),
        deletedBy: req.session.username || '',
      })
      res.status(200).send({ success: true })
    },
  }
}

export { adminController }
