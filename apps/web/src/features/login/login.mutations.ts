import { post } from '@/api/client'
import { mutationOptions } from '@tanstack/react-query'
import { AuthRequest } from './login.type'
import { AxiosError } from 'axios'

export const loginMutation = mutationOptions<unknown, AxiosError, AuthRequest>({
  mutationFn: async (data) => {
    const response = await post('/auth/login', {
      password: data.password,
      username: data.username,
    })
    return response.data
  },
})

export const logoutMutation = mutationOptions<unknown, AxiosError>({
  mutationFn: async () => {
    const response = await post('/auth/logout')
    return response.data
  },
})
