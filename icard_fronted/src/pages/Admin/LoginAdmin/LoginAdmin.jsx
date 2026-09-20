import { Navigate } from 'react-router'
import { LoginForm } from '../../../components/Admin'
import { useAuth } from '../../../hooks'
import './LoginAdmin.scss'

export function LoginAdmin() {
  const { auth } = useAuth()

  if (auth) {
    return <Navigate to="/admin" replace />
  }

  return (
    <div className="login-admin">
      <div className="login-admin__content">
        <h1>Entrar al panel</h1>
        <LoginForm />
      </div>
    </div>
  )
}