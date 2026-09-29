import { loginMutation } from '@/features/login/login.mutations'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

const LoginPage = () => {
  const navigate = useNavigate()
  const { isIdle, isSuccess, mutate } = useMutation(loginMutation)

  useEffect(() => {
    if (!isIdle && isSuccess) {
      navigate({
        from: '/login',
        to: '/',
      })
    }
  }, [isIdle, isSuccess])

  return (
    <div>
      <input
        onClick={() => mutate({ username: 'admin', password: 'abc' })}
        type="button"
        value="Submit"
      />
    </div>
  )
}

export { LoginPage }
