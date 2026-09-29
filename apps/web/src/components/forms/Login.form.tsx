import { loginMutation } from '@/features/login/login.mutations'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { useEffect } from 'react'
import * as z from 'zod'
import { Label } from '@/shadcn/components/ui/label'
import { Input } from '@/shadcn/components/ui/input'
import { Button } from '@/shadcn/components/ui/button'
import { LoginBody } from '@monolith-code-architecture/types'

const loginRequestBodySchema = z.object({
  username: z.string(),
  password: z.string(),
})

const LoginForm = () => {
  const navigate = useNavigate()
  const { isIdle, isSuccess, mutate: login } = useMutation(loginMutation)

  const form = useForm({
    defaultValues: {} as LoginBody,
    validators: {
      onSubmit: loginRequestBodySchema,
    },
    onSubmit: async ({ value }) => {
      login(value)
    },
  })

  useEffect(() => {
    if (!isIdle && isSuccess) {
      navigate({
        from: '/login',
        to: '/',
      })
    }
  }, [isIdle, isSuccess])

  return (
    <form
      className="flex flex-col gap-y-2"
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <Label>Username</Label>
      <form.Field
        name="username"
        children={(field) => (
          <Input
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            placeholder="username"
            required
            type="text"
            value={field.state.value}
          />
        )}
      />
      <Label>Password</Label>
      <form.Field
        name="password"
        children={(field) => (
          <Input
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            placeholder="password"
            required
            type="password"
            value={field.state.value}
          />
        )}
      />
      <Button
        type="submit"
        className="w-full mt-6"
      >
        Login
      </Button>
    </form>
  )
}

export { LoginForm }
