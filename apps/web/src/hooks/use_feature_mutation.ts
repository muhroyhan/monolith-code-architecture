import { patch, post } from '@/api/client'
import { Feature } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

const useFeatureMutation = <K extends keyof Feature, T extends boolean>(
  api: string,
  isAddPage: T,
) => {
  type CreateBodyType = Feature[K]['createBody']
  type UpdateBodyType = Feature[K]['updateBody']
  type MutationBody<T extends boolean> = T extends true ? CreateBodyType : UpdateBodyType

  const { isIdle, isSuccess, mutate } = useMutation<void, Error, MutationBody<T>>({
    mutationFn: async (data: MutationBody<T>) => {
      if (isAddPage) await post(api, data)
      else await patch(api, data)
    },
    onSuccess: () => {
      toast.success(isAddPage ? 'Create Successful!' : 'Update Successful!')
    },
  })

  return { isIdle, isSuccess, mutate }
}

export { useFeatureMutation }
