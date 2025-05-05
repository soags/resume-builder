import { Link } from 'react-router'

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/login">ログイン</Link>
    </div>
  )
}
