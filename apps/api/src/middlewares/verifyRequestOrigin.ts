import type { RequestHandler } from 'express'

const getOrigin = (value: string): string | undefined => {
  try {
    return new URL(value).origin
  } catch {
    return undefined
  }
}

const verifyRequestOrigin: RequestHandler = (req, res, next) => {
  const trustedOrigin = process.env.WEB_ORIGIN && getOrigin(process.env.WEB_ORIGIN)
  const requestOrigin = req.get('origin') ?? req.get('referer')

  if (!trustedOrigin || !requestOrigin || getOrigin(requestOrigin) !== trustedOrigin) {
    return res.status(403).json({
      success: false,
      error: {
        message: 'Request origin is not allowed',
        code: 'FORBIDDEN',
      },
    })
  }
  next()
}

export { verifyRequestOrigin }
