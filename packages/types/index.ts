export interface ApiResponseBody<T = any> {
  success: boolean
  message?: string
  data?: T | null
  error?: {
    message: string
    code: string
    stack?: string
  }
}
export interface LoginBody {
  username: string
  password: string
}

export interface LoginDataResponse {
  admin: { id: string }
}

export interface TableDataResponse<T> {
  dataFeeds: T[]
}

export * from './admin.type'
