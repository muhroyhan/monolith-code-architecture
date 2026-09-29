import { programs } from '@/programs'
import { ProgramRegistary } from '@/types'
import { useLocation } from '@tanstack/react-router'
import { createContext, ReactNode, useContext } from 'react'

const ProgramContext = createContext<{ program?: ProgramRegistary | undefined }>({})

const ProgramProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation()
  const program = programs.find((program) => location.pathname.includes(program.path))
  return <ProgramContext value={{ program }}>{children}</ProgramContext>
}

const useProgram = () => useContext(ProgramContext)

export { ProgramProvider, useProgram }
