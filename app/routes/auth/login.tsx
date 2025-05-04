import { Link } from 'react-router'

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Link to="/auth/google"> Googleでログイン</Link>
    </div>
  )
}
