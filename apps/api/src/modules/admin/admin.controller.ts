import { type Request, type Response } from 'express'
import {
  AdminCreateBodyRequest,
  AdminData,
  AdminQueryRequest,
  ApiResponseBody,
  TableDataResponse,
} from '@monolith-code-architecture/types'
import { adminService } from './admin.service'

const adminController = () => {
  const service = adminService()
  return {
    findAll: async (
      req: Request<{}, {}, {}, AdminQueryRequest>,
      res: Response<ApiResponseBody<TableDataResponse<AdminData>>>,
    ) => {
      const queries = service.getWhere(req.query)
      const dataFeeds = await service.findAll(queries)
      res.status(200).send({ success: true, data: { dataFeeds } })
    },
    create: async (
      req: Request<{}, {}, AdminCreateBodyRequest>,
      res: Response<ApiResponseBody>,
    ) => {
      await service.create({
        ...req.body,
        isActive: Boolean(req.body.isActive),
        isSuper: Boolean(req.body.isSuper),
        createdBy: req.session.username ?? '',
        updatedBy: req.session.username ?? '',
      })
      res.status(200).send({ success: true })
    },
  }
}

export { adminController }
