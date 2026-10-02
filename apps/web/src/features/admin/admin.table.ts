import { AdminData, AdminUpdateBodyRequest } from '@monolith-code-architecture/types'
import { AdminListData } from './admin.type'

export const adminColumns = {
  id: 'ID',
  username: 'Username',
  displayName: 'Display Name',
  isActive: 'Active?',
  isSuper: 'Superadmin?',
  updatedAt: 'Updated At',
  updatedBy: 'Updated By',
}

export const adminDataFeedFormat = (data: AdminData): AdminListData => {
  return {
    id: data.id,
    username: data?.username ?? '',
    displayName: data?.displayName ?? '',
    isActive: data.isActive ? 'YES' : 'NO',
    isSuper: data.isSuper ? 'YES' : 'NO',
    updatedAt: data.updatedAt,
    updatedBy: data.updatedBy,
  }
}

export const adminUpdateFormat = (data: AdminData): Partial<AdminUpdateBodyRequest> => {
  return {
    username: data?.username ?? '',
    displayName: data?.displayName ?? '',
    password: '',
    isActive: String(data.isActive),
    isSuper: String(data.isSuper),
  }
}
