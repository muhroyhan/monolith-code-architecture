import 'express-session'

declare module 'express-session' {
  interface SessionData {
    admin: {
      id: string
      displayName?: string
      isActive?: boolean
      isSuper?: boolean
      permissions: string[]
    }
    csrfToken?: string
  }
}
