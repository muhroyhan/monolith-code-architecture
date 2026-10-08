interface ApiResponseError {
  message: string
  code: string
  stack?: string
}

export interface ApiResponseMeta {
  currentPage: number
  limit: number
  totalItems: number
  totalPages: number
}

export interface ApiResponseBody<T = any> {
  success: boolean
  message?: string
  data?: T | null
  meta?: ApiResponseMeta
  error?: ApiResponseError
}

export interface LoginBody {
  username: string
  password: string
}

export interface LoginDataResponse {
  admin: { id: string; displayName: string }
}

export interface TableDataResponse<T> {
  dataFeed: T[]
}

export interface PaginationQueryRequest {
  number: number
  size: number
}

export interface BaseQueryRequest<T> {
  filters?: T
  page?: PaginationQueryRequest
}

export * from './admin.type'
