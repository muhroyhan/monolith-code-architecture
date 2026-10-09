import { AdminProvider } from '@/providers/Admin.provider'
import { Outlet } from '@tanstack/react-router'

const LayoutPage = () => {
  return (
    <AdminProvider>
      <Outlet />
    </AdminProvider>
  )
}

export { LayoutPage }
