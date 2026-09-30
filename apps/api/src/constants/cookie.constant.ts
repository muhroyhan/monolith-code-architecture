import { CookieOptions } from 'express'

const isProduction = process.env.NODE_ENV === 'production'

const cookieSessionName = isProduction ? '__Host-session' : 'sid'

const cookieConfig: CookieOptions = {
  httpOnly: !isProduction,
  path: '/',
  secure: isProduction,
  sameSite: isProduction ? 'strict' : 'lax',
}

export { isProduction, cookieConfig, cookieSessionName }
