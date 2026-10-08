import { createContext, ReactNode, useContext, useState } from 'react'
import { adminNameCookieName } from '@monolith-code-architecture/constants'

const UserContext = createContext<{
  adminName: string
  setAdminName: React.Dispatch<React.SetStateAction<string>>
}>({
  adminName: '',
  setAdminName: () => '',
})

const UserProvider = ({ children }: { children: ReactNode }) => {
  const splittedCookie = document.cookie
    .split('; ')
    .reduce<{ [x in string]: string }>((obj, item) => {
      const split = item.split('=')
      const key = split[0]
      const value = split[1]
      return { ...obj, [key]: value }
    }, {})
  const [adminName, setAdminName] = useState(
    decodeURIComponent(splittedCookie[adminNameCookieName]),
  )
  return <UserContext value={{ adminName, setAdminName }}>{children}</UserContext>
}

const useUser = () => useContext(UserContext)

export { UserProvider, useUser }
