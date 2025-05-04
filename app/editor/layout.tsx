import { NavLink, Outlet } from 'react-router'
import { cn } from '~/lib/utils'

export default function Layout() {
  return (
    <div className="flex justify-center p-6">
      <div className="flex w-full max-w-5xl">
        <div className="w-full p-4">
          <div className="rounded-lg border border-slate-300 px-2 py-4">
            <nav className="flex flex-col space-y-4">
              <SectionLink to="/editor/basics">基本情報</SectionLink>
              <SectionLink to="/editor/techStack">技術スタック</SectionLink>
              <SectionLink to="/editor/highlights">スキル</SectionLink>
              <SectionLink to="/editor/work">職務経歴</SectionLink>
              <SectionLink to="/editor/promotions">自己PR</SectionLink>
              <SectionLink to="/editor/side-projects">業務外活動</SectionLink>
              <SectionLink to="/editor/education">学歴</SectionLink>
              <SectionLink to="/editor/certificates">資格</SectionLink>
            </nav>
          </div>
        </div>
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

function SectionLink({
  to,
  children,
}: {
  to: string
  children: React.ReactNode
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'rounded-lg px-4 py-2 text-slate-700 hover:bg-slate-100',
          isActive && 'bg-slate-200 font-semibold'
        )
      }
    >
      {children}
    </NavLink>
  )
}
