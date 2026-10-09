import { type Request, type Response } from 'express'
import {
  AdminCreateBodyRequest,
  AdminData,
  AdminQueryRequest,
  AdminUpdateBodyRequest,
  ApiResponseBody,
  BaseQueryRequest,
  TableDataResponse,
} from '@monolith-code-architecture/types'
import { adminService } from './admin.service'
import { hash } from 'argon2'
import { ApiError } from '@/classes/ApiError'
import { AdminServiceCreateBody } from './admin.type'

const adminController = () => {
  const service = adminService()
  return {
    findAll: async (
      req: Request<{}, {}, {}, BaseQueryRequest<AdminQueryRequest>>,
      res: Response<ApiResponseBody<TableDataResponse<AdminData>>>,
    ) => {
      const queries = service.getWhere(req.query.filters)
      const count = await service.count(queries)
      const dataFeed = await service.findAll(req.query.page, queries)
      let body: ApiResponseBody<TableDataResponse<AdminData>> = {
        success: true,
        data: { dataFeed },
      }
      if (req.query.page) {
        const totalPage = Math.ceil(count / req.query.page.size)
        body = {
          ...body,
          meta: {
            totalItems: count,
            totalPages: totalPage,
            currentPage: req.query.page.number,
            limit: req.query.page.size,
          },
        }
      }
      res.status(200).send(body)
    },
    findOne: async (
      req: Request<{ id: string }>,
      res: Response<ApiResponseBody<AdminData | object>>,
    ) => {
      const data = await service.findById(req.params.id)
      res.status(200).send({ success: true, data })
    },
    create: async (
      req: Request<{}, {}, AdminCreateBodyRequest>,
      res: Response<ApiResponseBody>,
    ) => {
      const admin = await service.findByUsername(req.body.username)
      if (admin) throw new ApiError('Admin username available.', 409, 'CONFLICT')
      const hashedPass = await hash(req.body.password)
      const input: AdminServiceCreateBody = {
        username: req.body.username,
        displayName: req.body.displayName,
        password: hashedPass,
        isActive: req.body.isActive === 'true',
        isSuper: req.body.isSuper === 'true',
        createdBy: req.session.admin?.displayName ?? '',
        updatedBy: req.session.admin?.displayName ?? '',
        permissions: req.body.permissions,
      }
      await service.create(input)
      res.status(200).send({ success: true })
    },
    update: async (
      req: Request<{ id: string }, {}, Partial<AdminUpdateBodyRequest>>,
      res: Response<ApiResponseBody>,
    ) => {
      const input = await service.getUpdateValues(req.body)
      await service.update(req.params.id, input)
      res.status(200).send({ success: true })
    },
    delete: async (req: Request<{ id: string }>, res: Response<ApiResponseBody>) => {
      await service.delete(req.params.id, {
        deletedAt: new Date(),
        deletedBy: req.session.admin?.displayName || '',
      })
      res.status(200).send({ success: true })
    },
  }
}

export { adminController }
