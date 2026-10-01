import { logoutMutation } from '@/features/login/login.mutations'
import { Button } from '@/shadcn/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { Outlet, useLocation, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { BreadcrumbComponent } from '@/components/Breadcrumb.component'
import { ProgramProvider } from '@/providers/Program.provider'
import { useUser } from '@/providers/User.provider'

const UserLayoutPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { isLoggedIn, setIsloggedIn } = useUser()
  const { isIdle, isSuccess, mutate } = useMutation(logoutMutation)

  useEffect(() => {
    if (!isLoggedIn) navigate({ to: '/login' })
  }, [isLoggedIn])

  useEffect(() => {
    if (!isIdle && isSuccess) {
      navigate({
        from: location.pathname,
        to: '/login',
      })
    }
  }, [isIdle, isSuccess])
  const paths = [...new Set(location.pathname.split('/'))]

  return (
    <ProgramProvider>
      {paths.length > 1 && <BreadcrumbComponent paths={paths} />}
      <Button
        onClick={() => {
          mutate()
          setIsloggedIn(false)
        }}
      >
        Logout
      </Button>
      <Outlet />
    </ProgramProvider>
  )
}

export { UserLayoutPage }
