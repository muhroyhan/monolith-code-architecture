import { AdminCreateBodyRequest, AdminData } from '@monolith-code-architecture/types'
import * as z from 'zod'

export const addAdminSchema: z.ZodType<AdminCreateBodyRequest, AdminCreateBodyRequest> = z.object({
  password: z.string(),
  username: z.string(),
  displayName: z.string(),
  isActive: z.string(),
  isSuper: z.string(),
})
export interface AdminListData extends Omit<AdminData, 'id' | 'isActive' | 'isSuper'> {
  isActive: string
  isSuper: string
}
export interface AdminDataFeed extends Omit<AdminData, 'isActive' | 'isSuper'> {
  isActive: string
  isSuper: string
}
