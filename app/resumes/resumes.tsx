import type { Route } from './+types/resumes'
import { getResumesByUserId } from '~/models/resume.server'
import { getSessionUser } from '~/services/auth.server'
import { formatDate } from '~/lib/date'
import { CalendarIcon, EditIcon } from 'lucide-react'
import { Button } from '~/components/ui/button'

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
    <div className="flex justify-center p-6">
      <div className="w-full max-w-3xl">
        <header className="mb-6 flex items-center px-4">
          <h2 className="text-3xl font-bold">職務経歴書</h2>
        </header>
        <div className="w-3xl rounded-lg border border-slate-300 bg-white px-4">
          {resumes.map((resume) => (
            <div
              key={resume.id}
              className="flex items-center border-b px-4 py-6 last:border-b-0"
            >
              <div className="flex flex-1 items-center gap-4">
                <Button variant="outline" size="icon">
                  <EditIcon />
                </Button>
                <div className="font-medium">{resume.title}</div>
              </div>
              <p className="text-gray-500">
                <CalendarIcon className="mr-2 inline h-4 w-4" />
                {formatDate(resume.updatedAt)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
