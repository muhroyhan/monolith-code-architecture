import { AdminCreateBodyRequest } from '@monolith-code-architecture/types'

export interface AdminServiceCreateBody extends Omit<
  AdminCreateBodyRequest,
  'isActive' | 'isSuper'
> {
  isActive: boolean
  isSuper: boolean
  createdBy: string
  updatedBy: string
}
