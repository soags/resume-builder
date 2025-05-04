import { Form, redirect } from 'react-router'
import { Button } from '~/components/ui/button'
import type { Route } from './+types/basics'
import { requireUserId } from '~/utils/auth.server'
import { getResumeByUserId, upsertResume } from '~/models/resume.server'
import { Field } from '~/components/ui/field'

export async function loader() {
  const userId = await requireUserId()
  const resume = await getResumeByUserId(userId)
  return resume
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()
  const name = formData.get('name')?.toString() || ''
  const label = formData.get('label')?.toString() || ''
  const userId = await requireUserId()

  await upsertResume(userId, name, label)

  return redirect('/editor/basics')
}

export default function BasicsForm({ loaderData }: Route.ComponentProps) {
  const { name = '', label = '' } = loaderData ?? {}

  return (
    <Form
      method="post"
      className="w-3xl rounded-lg border border-slate-300 p-8"
    >
      <div className="flex flex-col gap-4">
        <Field label="名前" name="name" defaultValue={name} />
        <Field label="職種" name="label" defaultValue={label} />

        <div className="mt-6 flex gap-8">
          <Button type="submit" className="flex-1 bg-sky-800 hover:bg-sky-950">
            保存
          </Button>
          <Button type="reset" className="flex-1" variant="outline">
            元に戻す
          </Button>
        </div>
      </div>
    </Form>
  )
}
