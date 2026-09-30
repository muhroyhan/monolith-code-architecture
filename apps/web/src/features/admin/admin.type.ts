import { AdminData } from '@monolith-code-architecture/types'

export interface AdminListData extends Omit<AdminData, 'isActive' | 'isSuper'> {
  isActive: string
  isSuper: string
}
