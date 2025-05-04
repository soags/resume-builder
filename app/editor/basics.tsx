import { redirect } from 'react-router'
import { Button } from '~/components/ui/button'
import type { Route } from './+types/basics'
import { requireUserId } from '~/utils/auth.server'
import { getResumeByUserId, upsertResume } from '~/models/resume.server'
import { Field } from '~/components/ui/field'
import { parseFormData, useForm, validationError } from '@rvf/react-router'
import { basicsSchema } from '~/validators/basics'

export async function loader() {
  const userId = await requireUserId()
  const resume = await getResumeByUserId(userId)
  return resume
}

export async function action({ request }: Route.ActionArgs) {
  const result = await parseFormData(request, basicsSchema)

  if (result.error) {
    return validationError(result.error, result.submittedData)
  }

  const { name, label } = result.data

  const userId = await requireUserId()

  await upsertResume(userId, name, label)

  return redirect('/editor/basics')
}

export default function BasicsForm({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const resume = loaderData ?? {
    name: '',
    label: '',
  }
  const form = useForm({
    method: 'post',
    schema: basicsSchema,
    defaultValues: {
      name: resume.name,
      label: resume.label,
    },
  })

  console.log('actionData', actionData)

  return (
    <form
      {...form.getFormProps()}
      className="w-3xl rounded-lg border border-slate-300 p-8"
    >
      <div className="flex flex-col gap-4">
        <Field label="名前" scope={form.scope('name')} />
        <Field label="職種" scope={form.scope('label')} />

        <div className="mt-6 flex gap-8">
          <Button type="submit" className="flex-1 bg-sky-800 hover:bg-sky-950">
            保存
          </Button>
          <Button
            className="flex-1"
            variant="outline"
            onClick={() => form.resetForm()}
          >
            元に戻す
          </Button>
        </div>
      </div>
    </form>
  )
}
