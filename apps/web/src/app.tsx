import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './router'

import { Toaster } from './shadcn/components/ui/sonner'
import axios from 'axios'
import { ApiResponseBody } from '@monolith-code-architecture/types'
import { toast } from 'sonner'

const App = () => {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        if (axios.isAxiosError<ApiResponseBody>(error)) {
          toast.error(error.response?.data.error?.message)
        } else {
          toast.error(error.message)
        }
      },
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
        if (axios.isAxiosError<ApiResponseBody>(error)) {
          toast.error(error.response?.data.error?.message)
        } else {
          toast.error(error.message)
        }
      },
    }),
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  )
}

export { App }
