import { RequestHandler } from 'express'
import { randomUUID } from 'node:crypto'

const generateReqId: RequestHandler = (_req, res, next) => {
  res.locals.requestId = randomUUID()
  res.setHeader('X-Request-Id', res.locals.requestId)
  next()
}

export { generateReqId }
