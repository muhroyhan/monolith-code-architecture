import { createContext, ReactNode, useContext, useState } from 'react'
import {
  adminNameCookieName,
  adminPermissionCookieName,
  superadminCookieName,
} from '@monolith-code-architecture/constants'
import { PermissionBodyResponse } from '@monolith-code-architecture/types'

const AdminContext = createContext<{
  adminName?: string
  setAdminName: React.Dispatch<React.SetStateAction<string | undefined>>
  permissions: PermissionBodyResponse[]
  setPermissions: React.Dispatch<React.SetStateAction<PermissionBodyResponse[]>>
  isAdminSuper: boolean
  setIsAdminSuper: React.Dispatch<React.SetStateAction<boolean>>
}>({
  adminName: '',
  setAdminName: () => '',
  permissions: [],
  setPermissions: () => [],
  isAdminSuper: false,
  setIsAdminSuper: () => false,
})

const AdminProvider = ({ children }: { children: ReactNode }) => {
  const splittedCookie = document.cookie
    .split('; ')
    .reduce<{ [x in string]: string }>((obj, item) => {
      const split = item.split('=')
      const key = split[0]
      const value = split[1]
      return { ...obj, [key]: value }
    }, {})
  const [adminName, setAdminName] = useState(
    splittedCookie[adminNameCookieName]
      ? decodeURIComponent(splittedCookie[adminNameCookieName])
      : undefined,
  )
  const [permissions, setPermissions] = useState(
    splittedCookie[adminPermissionCookieName]
      ? JSON.parse(decodeURIComponent(splittedCookie[adminPermissionCookieName]))
      : [],
  )
  const [isAdminSuper, setIsAdminSuper] = useState(
    decodeURIComponent(splittedCookie[superadminCookieName]) === 'true',
  )
  return (
    <AdminContext
      value={{
        adminName,
        setAdminName,
        permissions,
        setPermissions,
        isAdminSuper,
        setIsAdminSuper,
      }}
    >
      {children}
    </AdminContext>
  )
}

const useAdmin = () => useContext(AdminContext)

export { AdminProvider, useAdmin }
