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

export interface LoginResponseData {
  admin: { id: string }
}
