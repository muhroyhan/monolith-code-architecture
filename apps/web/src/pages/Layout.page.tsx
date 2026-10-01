import { UserProvider } from '@/providers/User.provider'
import { Outlet } from '@tanstack/react-router'

const LayoutPage = () => {
  return (
    <UserProvider>
      <Outlet />
    </UserProvider>
  )
}

export { LayoutPage }
