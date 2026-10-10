import { AddEditFormRegistary, FilterFormRegistary, ProgramRegistary } from '@/types'
import { adminColumns, adminDataFeedFormat, adminUpdateFormat } from './admin.table'
import { ParsedLocation } from '@tanstack/react-router'
import { yesnoOptions } from '@/constants'
import { AdminPermissionForm } from './admin.premission.form'
import { PermissionBodyResponse } from '@monolith-code-architecture/types'
import { isUndefined } from 'es-toolkit'
import { createAdminBodySchema } from '@monolith-code-architecture/constants'

const adminAddEditForms: (location?: ParsedLocation) => AddEditFormRegistary[] = (location) => [
  {
    name: 'username',
    type: 'text',
    required: true,
    label: 'Username',
  },
  {
    name: 'displayName',
    type: 'text',
    required: true,
    label: 'Display Name',
  },
  {
    name: 'password',
    type: 'password',
    required: location?.pathname.includes('add'),
    label: 'Password',
  },
  {
    name: 'isActive',
    type: 'radio',
    required: true,
    label: 'Active Status',
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
    label: 'Superadmin Status',
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
    name: 'permissions',
    type: 'custom',
    title: 'Permissions',
    Component: AdminPermissionForm,
  },
]

const adminFilterForms: FilterFormRegistary[] = [
  {
    placeholder: 'Display Name / Username',
    name: 'name',
    type: 'text',
  },
  {
    placeholder: 'Active?',
    name: 'isActive',
    type: 'select',
    options: yesnoOptions,
  },
  {
    placeholder: 'Superadmin?',
    name: 'isSuper',
    type: 'select',
    options: yesnoOptions,
  },
]

const adminRegistary: (
  permissions?: PermissionBodyResponse[],
  location?: ParsedLocation,
) => ProgramRegistary<'admin'> = (permissions, location) => {
  const adminPermissions = permissions?.filter((item) => item.featureName === 'admin')
  const isCreateAllowed = !isUndefined(adminPermissions?.find((item) => item.access === 'create'))
  const isReadAllowed = !isUndefined(adminPermissions?.find((item) => item.access === 'read'))
  const isUpdateAllowed = !isUndefined(adminPermissions?.find((item) => item.access === 'update'))
  const isDeleteAllowed = !isUndefined(adminPermissions?.find((item) => item.access === 'delete'))

  return {
    add: {
      defaultValues: {
        displayName: '',
        username: '',
        password: '',
        isActive: 'true',
        isSuper: 'false',
        permissions: [],
      },
      forms: adminAddEditForms(location),
      schema: createAdminBodySchema,
    },
    api: '/admin',
    columns: adminColumns,
    dataFormat: adminDataFeedFormat,
    filters: adminFilterForms,
    isCreateAllowed,
    isReadAllowed,
    isUpdateAllowed,
    isDeleteAllowed,
    name: 'Admin',
    path: '/admin',
    rowActions: ['edit', 'view'],
    updateFormat: adminUpdateFormat,
  }
}

export { adminRegistary }
