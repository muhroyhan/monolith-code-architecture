import { post } from '@/api/client'
import { mutationOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from '@/shadcn/components/ui/toast'
import { LoginBody, LoginResponseData } from '@monolith-code-architecture/types'

export const loginMutation = mutationOptions<LoginResponseData, AxiosError, LoginBody>({
  mutationFn: async (data) => {
    const response = await post<LoginResponseData>('/auth/login', data)
    return response.data
  },
  onSuccess: (data) => {
    console.log(data)
    toast.add({ type: 'success', description: 'Welcome Back!' })
  },
})

export const logoutMutation = mutationOptions<unknown, AxiosError>({
  mutationFn: async () => {
    const response = await post('/auth/logout')
    return response.data
  },
})
