import { AdminData } from '@monolith-code-architecture/types'

export interface AdminListData extends Omit<AdminData, 'id' | 'isActive' | 'isSuper'> {
  isActive: string
  isSuper: string
}
export interface AdminDataFeed extends Omit<AdminData, 'isActive' | 'isSuper'> {
  isActive: string
  isSuper: string
}
