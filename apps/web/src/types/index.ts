import { AdminListData } from '@/features/admin/admin.type'
import { AdminData, AdminQueryRequest } from '@monolith-code-architecture/types'

export interface Feature {
  admin: {
    data: AdminData
    queryparam: AdminQueryRequest
    dataFeeds: AdminListData
  }
}

export interface ProgramRegistary<K extends keyof Feature> {
  api: string
  apiData: string
  columns: { [P in keyof Feature[K]['data']]: string }
  dataFormat: (data: Feature[K]['data']) => Feature[K]['dataFeeds']
  feature: K
  isReadAllowed: boolean
  isWriteAllowed: boolean
  name: string
  path: string
}
