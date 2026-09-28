// src/auth/auth.middleware.ts

import type { RequestHandler } from 'express'

const requireAuth: RequestHandler = (req, res, next) => {
  if (!req.session.adminId) {
    res.status(401).json({
      message: 'Unauthorized',
    })
    return
  }

  next()
}

export { requireAuth }
