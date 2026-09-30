import { logoutMutation } from '@/features/login/login.mutations'
import { Button } from '@/shadcn/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { Outlet, useLocation, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { BreadcrumbComponent } from '@/components/Breadcrumb.component'

const UserLayoutPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { isIdle, isSuccess, mutate } = useMutation(logoutMutation)

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
    <div>
      {paths.length > 1 && <BreadcrumbComponent paths={paths} />}
      <Button onClick={() => mutate()}>Logout</Button>
      <Outlet />
    </div>
  )
}

export { UserLayoutPage }
