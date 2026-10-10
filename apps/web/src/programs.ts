import { ParsedLocation } from '@tanstack/react-router'
import { Feature, ProgramRegistary } from './types'
import { adminRegistary } from './features/admin/admin.registary'
import { PermissionBodyResponse } from '@monolith-code-architecture/types'

const programs: (
  permissions?: PermissionBodyResponse[],
  location?: ParsedLocation,
) => { [K in keyof Feature]: ProgramRegistary<K> } = (permissions, location) => ({
  admin: adminRegistary(permissions, location),
})

export { programs }
