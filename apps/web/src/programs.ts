import { adminColumns, adminDataFeedFormat } from './features/admin/admin.table'
import { Feature, ProgramRegistary } from './types'

const programs: { [K in keyof Feature]: ProgramRegistary<K> } = {
  admin: {
    api: '/admin',
    apiData: 'admins',
    columns: adminColumns,
    dataFormat: adminDataFeedFormat,
    feature: 'admin',
    isReadAllowed: true,
    isWriteAllowed: true,
    path: '/admin',
  },
}

export { programs }
