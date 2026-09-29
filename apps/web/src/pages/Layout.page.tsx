import { Outlet } from '@tanstack/react-router'

const LayoutPage = () => {
  return (
    <div className="bg-gray-100">
      <Outlet />
    </div>
  )
}

export { LayoutPage }
