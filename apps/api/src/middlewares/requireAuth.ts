import { cookieConfig, cookieSessionName } from '@/constants/cookie.constant'
import { dbClient } from '@/db/client'
import {
  adminNameCookieName,
  adminPermissionCookieName,
  superadminCookieName,
} from '@monolith-code-architecture/constants'
import { ApiResponseBody } from '@monolith-code-architecture/types'
import { isNull } from 'drizzle-orm'
import { isUndefined } from 'es-toolkit'
import { type Request, type Response } from 'express'
import type { RequestHandler } from 'express'

const requireAuth: RequestHandler = async (req: Request, res: Response<ApiResponseBody>, next) => {
  if (!req.session.admin?.id) {
    res.status(401).json({
      success: false,
      error: {
        message: 'You are not authorized',
        code: 'UNAUTORIZED',
      },
    })
    return
  }
  const admin = await dbClient.query.adminTable.findFirst({
    columns: {
      displayName: true,
      id: true,
      isActive: true,
      isSuper: true,
    },
    with: {
      permissions: true,
    },
    where: {
      AND: [
        { id: req.session.admin.id, isActive: true },
        { RAW: (table) => isNull(table.deletedAt) },
      ],
    },
  })
  if (isUndefined(admin)) {
    req.session.destroy((err) => {
      if (err) next(err)
      res.clearCookie(cookieSessionName, cookieConfig)
      res.clearCookie(adminNameCookieName, cookieConfig)
      res.clearCookie(adminPermissionCookieName, cookieConfig)
      res.status(404).json({
        success: false,
        error: {
          message: 'You account not found',
          code: 'NOT FOUND',
        },
      })
    })
    return
  }
  if (!admin?.isActive) {
    res.status(401).json({
      success: false,
      error: {
        message: 'Your account is not active',
        code: 'UNAUTORIZED',
      },
    })
    return
  }

  if (req.session.cookie.maxAge) {
    const currentMaxAge = req.session.cookie.maxAge ?? 0

    if (currentMaxAge <= 0) {
      res.cookie(adminNameCookieName, req.session.admin.displayName, {
        ...cookieConfig,
        httpOnly: false,
      })
      res.cookie(adminPermissionCookieName, admin.permissions, {
        ...cookieConfig,
        httpOnly: false,
      })
      res.cookie(superadminCookieName, admin.isSuper, {
        ...cookieConfig,
        httpOnly: false,
      })
    }
  }

  req.session.admin = {
    id: admin.id,
    displayName: admin.displayName,
    isActive: admin.isActive,
    isSuper: admin.isSuper,
    permissions: admin.permissions.map((item) => `${item.featureName}:${item.access}`),
  }
  next()
}

export { requireAuth }
