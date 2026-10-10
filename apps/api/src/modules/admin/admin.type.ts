import { AdminCreateUpdateBodyRequest, PermissionData } from '@monolith-code-architecture/types'

export interface AdminServiceCreateBody extends Omit<
  AdminCreateUpdateBodyRequest,
  'isActive' | 'isSuper' | 'permissions'
> {
  isActive: boolean
  isSuper: boolean
  createdBy: string
  updatedBy: string
  permissions?: string[]
}
export interface AdminServiceUpdateBody extends Omit<
  AdminCreateUpdateBodyRequest,
  'isActive' | 'isSuper' | 'id' | 'permissions'
> {
  isActive: boolean
  isSuper: boolean
  updatedBy: string
  permissions?: PermissionData[]
}

export interface AdminServiceDeleteBody {
  deletedAt: Date
  deletedBy: string
}
