import { get } from '@/api/client'
import { AdminDataResponse, AdminQueryRequest } from '@monolith-code-architecture/types'
import { queryOptions } from '@tanstack/react-query'

export const findAllAdmins = (query: AdminQueryRequest) =>
  queryOptions({
    queryKey: ['admin', 'findall'],
    queryFn: async () => {
      const response = await get<AdminDataResponse>('/admin', query)
      return response.data.admins
    },
  })
