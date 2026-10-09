import { defineRelations } from 'drizzle-orm/relations'
import { adminTable, adminPermissionTable, permissionTable } from '../schema'

const adminPermissionRelations = defineRelations(
  { adminTable, adminPermissionTable, permissionTable },
  (r) => ({
    adminTable: {
      permissions: r.many.permissionTable({
        from: r.adminTable.id.through(r.adminPermissionTable.adminId),
        to: r.permissionTable.id.through(r.adminPermissionTable.permissionId),
      }),
    },
    permissionTable: {
      admins: r.many.adminTable({
        from: r.permissionTable.id.through(r.adminPermissionTable.permissionId),
        to: r.adminTable.id.through(r.adminPermissionTable.adminId),
      }),
    },
  }),
)

export default { ...adminPermissionRelations }
