export interface AdminData {
  id: string
  username: string
  displayName: string
  isActive: boolean
  isSuper: boolean
  updatedAt: Date
  updatedBy: string | null
}

export interface AdminQueryRequest {
  username?: string
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
}

export interface AdminUpdateBodyRequest extends AdminCreateBodyRequest {
  isDeleted: string
}
