import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './router'
import { toast, Toaster } from './shadcn/components/ui/toast'
import axios from 'axios'
import { ApiResponseBody } from '@monolith-code-architecture/types'

const App = () => {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        if (axios.isAxiosError<ApiResponseBody>(error)) {
          toast.add({ type: 'failed', description: error.response?.data.error?.message })
        } else {
          toast.add({ type: 'failed', description: error.message })
        }
      },
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
        if (axios.isAxiosError<ApiResponseBody>(error)) {
          toast.add({ type: 'failed', description: error.response?.data.error?.message })
        } else {
          toast.add({ type: 'failed', description: error.message })
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
