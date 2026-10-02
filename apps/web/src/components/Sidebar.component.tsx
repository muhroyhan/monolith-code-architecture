import { logoutMutation } from '@/features/login/login.mutations'
import { Button } from '@/shadcn/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { Link, useLocation, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useUser } from '@/providers/User.provider'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/shadcn/components/ui/sidebar'
import { programs } from '@/programs'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/shadcn/components/ui/navigation-menu'
import { toast } from 'sonner'

const SidebarComponent = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { adminName, setAdminName } = useUser()
  const { isIdle, isSuccess, mutate } = useMutation(logoutMutation)

  useEffect(() => {
    if (!isIdle && isSuccess) {
      toast.success(`See You ${adminName}!`)
      setAdminName('')
      navigate({
        from: location.pathname,
        to: '/login',
      })
    }
  }, [isIdle, isSuccess])

  const programList = Object.values(programs(location))

  return (
    <Sidebar>
      <SidebarHeader className="py-6">Hi, {adminName}</SidebarHeader>
      <SidebarContent>
        <NavigationMenu className="block max-w-full w-full">
          <NavigationMenuList>
            <NavigationMenuItem className="w-full">
              <NavigationMenuLink
                className="w-full rounded-none"
                active={location.pathname === '/'}
                asChild
              >
                <Link
                  className="data-active:bg-sidebar-ring!"
                  to="/"
                >
                  Dashboard
                </Link>
              </NavigationMenuLink>
              {programList.map((item, k) => (
                <NavigationMenuLink
                  className="w-full rounded-none"
                  active={location.pathname.includes(item.path)}
                  key={k}
                  asChild
                >
                  <Link
                    className="data-active:bg-sidebar-ring!"
                    to={item.path}
                  >
                    {item.name}
                  </Link>
                </NavigationMenuLink>
              ))}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </SidebarContent>
      <SidebarFooter>
        <Button
          onClick={() => {
            mutate()
          }}
        >
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}

export { SidebarComponent }
