import { AdminListData } from '@/features/admin/admin.type'
import {
  AdminCreateBodyRequest,
  AdminData,
  AdminQueryRequest,
  AdminUpdateBodyRequest,
} from '@monolith-code-architecture/types'
import { ZodType } from 'zod'

export interface Feature {
  admin: {
    data: AdminData
    queryparam: AdminQueryRequest
    dataFeeds: AdminListData
    createBody: AdminCreateBodyRequest
    updateBody: AdminUpdateBodyRequest
  }
}

export interface ProgramRegistary<K extends keyof Feature> {
  add: {
    defaultValues: Feature[K]['createBody']
    schema: ZodType<Feature[K]['createBody'], Feature[K]['createBody']>
    forms: AddEditFormRegistary[]
  }
  api: string
  columns: { [P in keyof Feature[K]['data']]: string }
  dataFormat: (data: Feature[K]['data']) => Feature[K]['dataFeeds']
  feature: K
  isReadAllowed: boolean
  isWriteAllowed: boolean
  name: string
  path: string
}

export interface AddEditFormRegistary {
  name: string
  type: 'text' | 'select' | 'radio' | 'password'
  required?: boolean
  disabled?: boolean
  title?: string
  options?: {
    label: string
    value: string
  }[]
}
