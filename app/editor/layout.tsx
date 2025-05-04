import { Outlet } from 'react-router'

export default function Layout() {
  return (
    <div className="flex justify-center p-6">
      <Outlet />
    </div>
  )
}
