import { ProgramRegistary } from './types'

const programs: ProgramRegistary[] = [
  { api: '/admin', isReadAllowed: true, isWriteAllowed: true, path: '/admin' },
]

export { programs }
