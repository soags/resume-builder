import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import type { Route } from './+types/resumes'
import { getResumesByUserId } from '~/models/resume.server'
import { getSessionUser } from '~/services/auth.server'
import { formatDate } from '~/lib/date'

export async function loader({ request }: Route.LoaderArgs) {
  const user = await getSessionUser(request)
  if (!user) {
    return new Response('Unauthorized', { status: 401 })
  }

  const resumes = await getResumesByUserId(user.id)
  return resumes
}

export default function Resumes({ loaderData: resumes }: Route.ComponentProps) {
  return (
    <div className="flex justify-center bg-slate-50 p-6">
      <div className="w-full max-w-3xl">
        <header className="mb-6 flex items-center px-4">
          <h2 className="text-3xl font-bold">職務経歴書</h2>
        </header>
        <div className="w-3xl rounded-lg border border-slate-300 bg-white px-4">
          <Table className="text-lg">
            <TableHeader>
              <TableRow>
                <TableHead className="py-6">タイトル</TableHead>
                <TableHead className="py-6">最終更新</TableHead>
                <TableHead className="py-6"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resumes.map((resume) => (
                <TableRow key={resume.title}>
                  <TableCell className="py-6 font-medium">
                    {resume.title}
                  </TableCell>
                  <TableCell className="py-6">
                    {formatDate(resume.updatedAt)}
                  </TableCell>
                  <TableHead className="py-6"></TableHead>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
