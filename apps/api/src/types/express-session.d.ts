import 'express-session'

declare module 'express-session' {
  interface SessionData {
    displayName?: string
    csrfToken?: string
  }
}
