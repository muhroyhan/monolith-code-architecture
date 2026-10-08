import 'express-session'

declare module 'express-session' {
  interface SessionData {
    user: {
      id?: string
      displayName?: string
      isActive?: boolean
      isSuper?: boolean
    }
    csrfToken?: string
  }
}
