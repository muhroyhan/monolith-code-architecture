import { AddEditFormRegistary, FilterFormRegistary, ProgramRegistary } from '@/types'
import { addAdminSchema } from './admin.type'
import { adminColumns, adminDataFeedFormat, adminUpdateFormat } from './admin.table'
import { ParsedLocation } from '@tanstack/react-router'
import { yesnoOptions } from '@/constants'

const adminAddEditForms: (location: ParsedLocation) => AddEditFormRegistary[] = (location) => [
  {
    name: 'username',
    type: 'text',
    required: true,
    title: 'Username',
  },
  {
    name: 'displayName',
    type: 'text',
    required: true,
    title: 'Display Name',
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
]

const adminFilterForms: FilterFormRegistary[] = [
  {
    label: 'Display Name / Username',
    name: 'name',
    type: 'text',
  },
  {
    label: 'Active?',
    name: 'isActive',
    type: 'select',
    options: yesnoOptions,
  },
  {
    label: 'Superadmin?',
    name: 'isSuper',
    type: 'select',
    options: yesnoOptions,
  },
]

const adminRegistary: (location: ParsedLocation) => ProgramRegistary<'admin'> = (location) => ({
  add: {
    defaultValues: {
      displayName: '',
      username: '',
      password: '',
      isActive: 'true',
      isSuper: 'false',
    },
    forms: adminAddEditForms(location),
    schema: addAdminSchema,
  },
  api: '/admin',
  columns: adminColumns,
  dataFormat: adminDataFeedFormat,
  filters: adminFilterForms,
  isReadAllowed: true,
  isWriteAllowed: true,
  name: 'Admin',
  path: '/admin',
  rowActions: ['edit', 'view'],
  updateFormat: adminUpdateFormat,
})

export { adminRegistary }
