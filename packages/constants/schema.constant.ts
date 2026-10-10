import z from 'zod'

const PaginationQuerySchema = z.object({
  number: z.string().regex(/^\d+$/),
  size: z.enum(['10', '25', '50', '100']),
})

export const loginBodySchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long' })
    .max(20, { message: 'Username cannot exceed 20 characters' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[^A-Za-z0-9]/, { message: 'Password must contain at least one special character' }),
})

export const getAdminQuerySchema = z.object({
  filters: z
    .object({
      name: z.string().optional(),
      isActive: z.enum(['true', 'false']).optional(),
      isSuper: z.enum(['true', 'false']).optional(),
      isDeleted: z.enum(['true', 'false']).optional(),
    })
    .optional(),
  page: PaginationQuerySchema,
})

export const createAdminBodySchema = loginBodySchema.extend({
  displayName: z.string(),
  isActive: z.enum(['true', 'false']),
  isSuper: z.enum(['true', 'false']),
  permissions: z.array(z.string()).optional(),
})

export const updateAdminBodySchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long' })
    .max(25, { message: 'Username cannot exceed 25 characters' })
    .optional(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[^A-Za-z0-9]/, { message: 'Password must contain at least one special character' })
    .optional(),
  displayName: z.string().optional(),
  isActive: z.enum(['true', 'false']).optional(),
  isSuper: z.enum(['true', 'false']).optional(),
  permissions: z.array(z.string()).optional(),
})
