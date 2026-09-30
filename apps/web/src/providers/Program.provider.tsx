import { programs } from '@/programs'
import { Feature, ProgramRegistary } from '@/types'
import { useLocation } from '@tanstack/react-router'
import { createContext, ReactNode, useContext } from 'react'

const ProgramContext = createContext<{ program: ProgramRegistary<keyof Feature> | undefined }>({
  program: undefined,
})

const ProgramProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation()
  const feature = location.pathname.replace('/', '') as keyof Feature
  const program = programs[feature]
  return <ProgramContext value={{ program }}>{children}</ProgramContext>
}

const useProgram = () => useContext(ProgramContext)

export { ProgramProvider, useProgram }
