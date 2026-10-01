import { ParsedLocation } from '@tanstack/react-router'
import { adminColumns, adminDataFeedFormat, adminUpdateFormat } from './features/admin/admin.table'
import { addAdminSchema } from './features/admin/admin.type'
import { Feature, ProgramRegistary } from './types'

const programs: (location: ParsedLocation) => { [K in keyof Feature]: ProgramRegistary<K> } = (
  location,
) => ({
  admin: {
    add: {
      defaultValues: {
        username: '',
        password: '',
        isActive: 'true',
        isSuper: 'false',
      },
      schema: addAdminSchema,
      forms: [
        {
          name: 'username',
          type: 'text',
          required: true,
          title: 'Username',
        },
        {
          name: 'password',
          type: 'password',
          required: location.pathname.includes('add'),
          title: 'Password',
        },
        {
          name: 'isActive',
          type: 'radio',
          required: true,
          title: 'Active Status',
          options: [
            {
              label: 'YES',
              value: 'true',
            },
            {
              label: 'NO',
              value: 'false',
            },
          ],
        },
        {
          name: 'isSuper',
          type: 'radio',
          required: true,
          title: 'Superadmin Status',
          options: [
            {
              label: 'YES',
              value: 'true',
            },
            {
              label: 'NO',
              value: 'false',
            },
          ],
        },
      ],
    },
    api: '/admin',
    columns: adminColumns,
    dataFormat: adminDataFeedFormat,
    updateFormat: adminUpdateFormat,
    feature: 'admin',
    name: 'Admin',
    isReadAllowed: true,
    isWriteAllowed: true,
    path: '/admin',
  },
})

export { programs }
