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
