import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { loggedCookieName } from '@monolith-code-architecture/constants'

const UserContext = createContext<{
  isLoggedIn: boolean
  setIsloggedIn: React.Dispatch<React.SetStateAction<boolean>>
}>({
  isLoggedIn: false,
  setIsloggedIn: () => false,
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
  const [isLoggedIn, setIsloggedIn] = useState(!!splittedCookie[loggedCookieName])
  return <UserContext value={{ isLoggedIn, setIsloggedIn: setIsloggedIn }}>{children}</UserContext>
}

const useUser = () => useContext(UserContext)

export { UserProvider, useUser }
