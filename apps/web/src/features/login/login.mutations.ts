import { post } from '@/api/client'
import { mutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { ApiResponseBody, LoginBody, LoginDataResponse } from '@monolith-code-architecture/types'
import { toast } from 'sonner'

export const loginMutation = mutationOptions<
  ApiResponseBody<LoginDataResponse>,
  AxiosError,
  LoginBody
>({
  mutationFn: async (data) => {
    const response = await post<ApiResponseBody<LoginDataResponse>>('/auth/login', data)
    return response.data
  },
  onSuccess: (data) => {
    toast.success(`Welcome ${data?.data?.admin.displayName ?? ''}!`)
  },
})

export const logoutMutation = mutationOptions<unknown, AxiosError>({
  mutationFn: async () => {
    const response = await post('/auth/logout')
    return response.data
  },
})
