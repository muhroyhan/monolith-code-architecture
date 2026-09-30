import { post } from '@/api/client'
import { mutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { LoginBody, LoginDataResponse } from '@monolith-code-architecture/types'
import { toast } from 'sonner'

export const loginMutation = mutationOptions<LoginDataResponse, AxiosError, LoginBody>({
  mutationFn: async (data) => {
    const response = await post<LoginDataResponse>('/auth/login', data)
    return response.data
  },
  onSuccess: (data) => {
    console.log(data)
    toast.success('Welcome Back!')
  },
})

export const logoutMutation = mutationOptions<unknown, AxiosError>({
  mutationFn: async () => {
    const response = await post('/auth/logout')
    return response.data
  },
})
