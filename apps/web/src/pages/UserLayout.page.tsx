import { ProgramProvider } from '@/providers/Program.provider'
import { SidebarProvider } from '@/shadcn/components/ui/sidebar'
import { ContentComponent } from '@/components/Content.component'
import { SidebarComponent } from '@/components/Sidebar.component'
import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useUser } from '@/providers/User.provider'

const UserLayoutPage = () => {
  const navigate = useNavigate()
  const { adminName } = useUser()

  useEffect(() => {
    if (!adminName) navigate({ replace: true, to: '/login' })
  }, [adminName])

  return (
    <ProgramProvider>
      <SidebarProvider>
        <SidebarComponent />
        <ContentComponent />
      </SidebarProvider>
    </ProgramProvider>
  )
}

export { UserLayoutPage }
