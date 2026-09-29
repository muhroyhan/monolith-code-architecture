import { logoutMutation } from '@/features/login/login.mutations'
import { Button } from '@/shadcn/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { Outlet, useLocation, useNavigate } from '@tanstack/react-router'
import React, { useEffect } from 'react'

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

  return (
    <div>
      UserLayoutPage
      <br />
      <Button onClick={() => mutate()}>Logout</Button>
      <Outlet />
    </div>
  )
}

export { UserLayoutPage }
