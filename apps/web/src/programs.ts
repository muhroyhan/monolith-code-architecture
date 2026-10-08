import { ParsedLocation } from '@tanstack/react-router'
import { Feature, ProgramRegistary } from './types'
import { adminRegistary } from './features/admin/admin.registary'

const programs: (location: ParsedLocation) => { [K in keyof Feature]: ProgramRegistary<K> } = (
  location,
) => ({
  admin: adminRegistary(location),
})

export { programs }
