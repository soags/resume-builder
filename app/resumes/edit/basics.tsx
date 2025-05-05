import { redirect } from 'react-router'
import { Button } from '~/components/ui/button'
import { Field } from '~/components/ui/field'
import { parseFormData, useForm, validationError } from '@rvf/react-router'
import { ResumeBasicsSchema } from '~/validators/basics'
import { getResume, updateResumeBasics } from '~/models/resume.server'
import type { Route } from './+types/basics'

export async function loader({ params }: Route.LoaderArgs) {
  const resume = await getResume(params.resumeId)
  if (!resume) {
    throw new Response('Not Found', { status: 404 })
  }

  return resume
}

export async function action({ params, request }: Route.ActionArgs) {
  const result = await parseFormData(request, ResumeBasicsSchema)
  if (result.error) {
    return validationError(result.error, result.submittedData)
  }

  await updateResumeBasics(params.resumeId, result.data)

  return redirect(`/resumes`)
}

export default function BasicsForm({ loaderData }: Route.ComponentProps) {
  const resume = loaderData ?? {
    title: '',
    name: '',
    label: '',
    github: '',
    qiita: '',
    zenn: '',
    speakerDeck: '',
    slideShare: '',
  }
  const form = useForm({
    method: 'post',
    schema: ResumeBasicsSchema,
    defaultValues: {
      title: resume.title,
      name: resume.name,
      label: resume.label,
      github: resume.github,
      qiita: resume.qiita,
      zenn: resume.zenn,
      speakerDeck: resume.speakerDeck,
      slideShare: resume.slideShare,
    },
  })

  return (
    <form
      {...form.getFormProps()}
      className="w-3xl rounded-lg border border-slate-300 p-8"
    >
      <div className="flex flex-col gap-4">
        <Field label="職務経歴書タイトル" scope={form.scope('title')} />
        <Field label="名前" scope={form.scope('name')} />
        <Field label="職種" scope={form.scope('label')} />
        <Field label="GitHub" scope={form.scope('github')} />
        <Field label="Qiita" scope={form.scope('qiita')} />
        <Field label="Zenn" scope={form.scope('zenn')} />
        <Field label="SpeakerDeck" scope={form.scope('speakerDeck')} />
        <Field label="SlideShare" scope={form.scope('slideShare')} />

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
