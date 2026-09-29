import { logoutMutation } from '@/features/login/login.mutations'
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
      <input
        onClick={() => mutate()}
        type="button"
        value="Logout"
      />
      <Outlet />
    </div>
  )
}

export { UserLayoutPage }
