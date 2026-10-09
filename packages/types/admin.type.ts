export interface AdminData {
  id: string
  username: string
  displayName: string
  isActive: boolean
  isSuper: boolean
  updatedAt: Date
  updatedBy: string | null
  permissions?: PermissionData[]
}

export interface AdminQueryRequest {
  name?: string
  isActive?: boolean
  isSuper?: boolean
  isDeleted?: boolean
}

export interface AdminCreateBodyRequest {
  password: string
  username: string
  displayName: string
  isActive: string
  isSuper: string
  permissions?: string[]
}

export interface AdminUpdateBodyRequest extends AdminCreateBodyRequest {
  isDeleted: string
}

export interface PermissionData {
  id: string
  featureName: string
  access: 'create' | 'read' | 'update' | 'delete'
}

export interface PermissionBodyResponse extends Omit<PermissionData, 'id'> {}
