import { Feature, ProgramRegistary } from './types'

const programs: { [K in keyof Feature]: ProgramRegistary<K> } = {
  admin: {
    feature: 'admin',
    api: '/admin',
    isReadAllowed: true,
    isWriteAllowed: true,
    path: '/admin',
  },
}

export { programs }
