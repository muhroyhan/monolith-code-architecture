import { ProgramProvider } from '@/providers/Program.provider'
import { Outlet } from '@tanstack/react-router'

const LayoutPage = () => {
  return (
    <ProgramProvider>
      <Outlet />
    </ProgramProvider>
  )
}

export { LayoutPage }
