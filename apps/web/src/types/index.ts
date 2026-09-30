import { AdminData, AdminDataResponse, AdminQueryRequest } from '@monolith-code-architecture/types'

export interface Feature {
  admin: {
    data: AdminData
    queryparam: AdminQueryRequest
    response: AdminDataResponse
  }
}

export interface ProgramRegistary<K extends keyof Feature> {
  feature: K
  api: string
  isReadAllowed: boolean
  isWriteAllowed: boolean
  path: string
}
