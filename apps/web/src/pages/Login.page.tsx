import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shadcn/components/ui/card'
import { LoginForm } from '@/components/forms/Login.form'
import { useUser } from '@/providers/User.provider'
import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'

const LoginPage = () => {
  const navigate = useNavigate()
  const { isLoggedIn } = useUser()

  useEffect(() => {
    if (isLoggedIn) navigate({ to: '/' })
  }, [isLoggedIn])

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="text-center w-md">
        <CardHeader>
          <CardTitle className="text-4xl">Login</CardTitle>
          <CardDescription className="text-xl">This is Monolith Architecture</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  )
}

export { LoginPage }
