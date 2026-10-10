import type { RequestHandler } from 'express'
import { ZodObject } from 'zod'

const requestValidator: (schemas: { body?: ZodObject; query?: ZodObject }) => RequestHandler =
  (schemas) => async (req, res, next) => {
    let parsed = null
    if (schemas.body) parsed = schemas.body.safeParse(req.body)
    if (schemas.query) parsed = schemas.query.safeParse(req.query)
    if (parsed && !parsed.success) {
      res.status(409).json({
        success: false,
        error: {
          message: 'You send wrong data format',
          code: 'CONFLICT',
        },
      })
      return
    }
    next()
  }

export { requestValidator }
