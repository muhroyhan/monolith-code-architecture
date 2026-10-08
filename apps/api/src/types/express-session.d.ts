import 'express-session'

declare module 'express-session' {
  interface SessionData {
    userId?: string
    displayName?: string
    csrfToken?: string
  }
}
