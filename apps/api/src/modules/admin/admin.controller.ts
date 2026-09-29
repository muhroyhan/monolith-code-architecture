import { type Request, type Response } from 'express'
import {
  AdminCreateBodyRequest,
  AdminDataResponse,
  AdminQueryRequest,
  ApiResponseBody,
} from '@monolith-code-architecture/types'
import { adminService } from './admin.service'

const adminController = () => {
  const service = adminService()
  return {
    findAll: async (
      req: Request<{}, {}, {}, AdminQueryRequest>,
      res: Response<ApiResponseBody<AdminDataResponse>>,
    ) => {
      const queries = service.getWhere(req.query)
      const admins = await service.findAll(queries)
      res.status(200).send({ success: true, data: { admins } })
    },
    create: async (
      req: Request<{}, {}, AdminCreateBodyRequest>,
      res: Response<ApiResponseBody>,
    ) => {
      await service.create(req.body)
      res.status(200).send({ success: true })
    },
  }
}

export { adminController }
