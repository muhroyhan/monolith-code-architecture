import {
  AdminCreateBodyRequest,
  AdminUpdateBodyRequest,
  PermissionData,
} from '@monolith-code-architecture/types'

export interface AdminServiceCreateBody extends Omit<
  AdminCreateBodyRequest,
  'isActive' | 'isSuper' | 'permissions'
> {
  isActive: boolean
  isSuper: boolean
  createdBy: string
  updatedBy: string
  permissions?: string[]
}
export interface AdminServiceUpdateBody extends Omit<
  AdminUpdateBodyRequest,
  'isActive' | 'isSuper' | 'isDeleted' | 'id' | 'permissions'
> {
  isActive: boolean
  isSuper: boolean
  deletedAt: Date | null
  updatedBy: string
  permissions?: PermissionData[]
}

export interface AdminServiceDeleteBody {
  deletedAt: Date
  deletedBy: string
}
