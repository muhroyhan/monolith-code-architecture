import { loginMutation } from '@/features/login/login.mutations'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { useEffect } from 'react'
import { Button } from '@/shadcn/components/ui/button'
import { useAdmin } from '@/providers/Admin.provider'
import { loginBodySchema } from '@monolith-code-architecture/constants'
import InputForm from '@/components/form/Input.form'

const LoginForm = () => {
  const navigate = useNavigate()
  const { isIdle, isSuccess, mutate: login, data } = useMutation(loginMutation)
  const { setAdminName, setPermissions, setIsAdminSuper } = useAdmin()

  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    validators: {
      onSubmit: loginBodySchema,
    },
    canSubmitWhenInvalid: true,
    onSubmit: async ({ value }) => {
      login(value)
    },
  })

  useEffect(() => {
    if (!isIdle && isSuccess) {
      setAdminName(data?.data?.admin.displayName ?? '')
      setPermissions(data?.data?.admin.permissions ?? [])
      setIsAdminSuper(data?.data?.admin?.isSuper ?? false)
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
      <form.Field
        name="username"
        children={(field) => (
          <InputForm
            field={field}
            label="Username"
          />
        )}
      />
      <form.Field
        name="password"
        children={(field) => (
          <InputForm
            field={field}
            label="Password"
            type="password"
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
