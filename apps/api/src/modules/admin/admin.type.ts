import { AdminCreateBodyRequest, AdminUpdateBodyRequest } from '@monolith-code-architecture/types'

export interface AdminServiceCreateBody extends Omit<
  AdminCreateBodyRequest,
  'isActive' | 'isSuper'
> {
  isActive: boolean
  isSuper: boolean
  createdBy: string
  updatedBy: string
}
export interface AdminServiceUpdateBody extends Omit<
  AdminUpdateBodyRequest,
  'isActive' | 'isSuper' | 'isDeleted' | 'id'
> {
  isActive: boolean
  isSuper: boolean
  isDeleted: boolean
  updatedBy: string
}

export interface AdminServiceDeleteBody {
  deletedAt: Date
  deletedBy: string
}
