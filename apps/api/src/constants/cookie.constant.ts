import { CookieOptions } from 'express'

const isProduction = process.env.NODE_ENV === 'production'

const cookieSessionName = isProduction ? '__Host-session' : 'sid'

const maxAgeInSeconds = 24 * 60 * 60 // 1 day in second

const cookieConfig: CookieOptions = {
  httpOnly: true,
  path: '/',
  secure: isProduction,
  sameSite: isProduction ? 'strict' : 'lax',
  maxAge: maxAgeInSeconds * 1000, // 1 day in milisecond
}

export { isProduction, cookieConfig, cookieSessionName, maxAgeInSeconds }
