export interface AdminData {
  id: string
  username: string
  isActive: boolean
  isSuper: boolean
  isDeleted: boolean
  updatedAt: Date
  updatedBy: string | null
}

export interface AdminDataResponse {
  admins: AdminData[]
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
  isActive: boolean
  isSuper: boolean
}

export interface AdminUpdateBodyRequest {
  id: string
  password?: string
  username?: string
  isActive?: boolean
  isSuper?: boolean
  isDeleted?: boolean
}
