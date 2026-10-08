import { AdminDataFeed, AdminListData } from '@/features/admin/admin.type'
import {
  AdminCreateBodyRequest,
  AdminData,
  AdminQueryRequest,
  AdminUpdateBodyRequest,
  BaseQueryRequest,
} from '@monolith-code-architecture/types'
import { ZodType } from 'zod'

export interface Feature {
  admin: {
    createBody: AdminCreateBodyRequest
    data: AdminData
    dataFeed: AdminDataFeed
    dataList: AdminListData
    queryparam: BaseQueryRequest<AdminQueryRequest>
    updateBody: Partial<AdminUpdateBodyRequest>
  }
}

export interface ProgramRegistary<K extends keyof Feature> {
  add: {
    defaultValues: Feature[K]['createBody']
    schema: ZodType<Feature[K]['createBody'], Feature[K]['createBody']>
    forms: AddEditFormRegistary[]
  }
  api: string
  columns: { [P in keyof Feature[K]['dataList']]: string }
  dataFormat: (data: Feature[K]['data']) => Feature[K]['dataFeed']
  filters?: FilterFormRegistary[]
  isReadAllowed: boolean
  isWriteAllowed: boolean
  name: string
  path: string
  rowActions: ('edit' | 'view')[]
  updateFormat: (data: Feature[K]['data']) => Feature[K]['updateBody']
}

export interface AddEditFormRegistary {
  name: string
  type: 'text' | 'select' | 'radio' | 'password'
  required?: boolean
  disabled?: boolean
  title?: string
  placeholder?: string
  options?: {
    label: string
    value: string
  }[]
}

export interface FilterFormRegistary {
  name: string
  type: 'text' | 'select' | 'radio'
  required?: boolean
  disabled?: boolean
  label?: string
  placeholder?: string
  options?: {
    label: string
    value: string
  }[]
}
