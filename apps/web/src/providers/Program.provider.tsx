import { programs } from '@/programs'
import { Feature, ProgramRegistary } from '@/types'
import { useParams } from '@tanstack/react-router'
import { createContext, ReactNode, useContext } from 'react'

const ProgramContext = createContext<{ program: ProgramRegistary<keyof Feature> | undefined }>({
  program: undefined,
})

const ProgramProvider = ({ children }: { children: ReactNode }) => {
  const { feature } = useParams({ strict: false })
  const program = programs[feature as keyof Feature]
  return <ProgramContext value={{ program }}>{children}</ProgramContext>
}

const useProgram = () => useContext(ProgramContext)

export { ProgramProvider, useProgram }
