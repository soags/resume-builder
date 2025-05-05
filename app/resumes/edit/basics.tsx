import { redirect } from 'react-router'
import { Button } from '~/components/ui/button'
import { Field } from '~/components/ui/field'
import { parseFormData, useForm, validationError } from '@rvf/react-router'
import { basicsSchema } from '~/validators/basics'
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
  const result = await parseFormData(request, basicsSchema)
  if (result.error) {
    return validationError(result.error, result.submittedData)
  }

  await updateResumeBasics(params.resumeId, result.data)

  return redirect(`/resumes`)
}

export default function Basics({ loaderData }: Route.ComponentProps) {
  const form = useForm({
    method: 'post',
    schema: basicsSchema,
    defaultValues: loaderData,
  })

  return (
    <form
      {...form.getFormProps()}
      className="w-3xl rounded-lg border border-slate-300 p-8"
    >
      <header className="mb-8">
        <h2 className="text-2xl font-bold">基本情報</h2>
      </header>
      <div className="flex flex-col gap-4">
        <Field
          label="職務経歴書タイトル"
          scope={form.scope('title')}
          placeholder="職務経歴書"
          description="※ 管理用のタイトルです。職務経歴書には表示されません。"
        />
        <Field
          label="名前"
          scope={form.scope('name')}
          placeholder="曽我 周平"
        />
        <Field
          label="職種"
          scope={form.scope('label')}
          placeholder="フルスタックエンジニア"
        />
        <Field
          label="GitHub URL"
          type="url"
          scope={form.scope('github')}
          placeholder="https://github.com/..."
        />
        <Field
          label="Qiita URL"
          type="url"
          scope={form.scope('qiita')}
          placeholder="https://qiita.com/..."
        />
        <Field
          label="Zenn URL"
          type="url"
          scope={form.scope('zenn')}
          placeholder="https://zenn.dev/..."
        />
        <Field
          label="Speaker Deck URL"
          type="url"
          scope={form.scope('speakerDeck')}
          placeholder="https://speakerdeck.com/..."
        />
        <Field
          label="SlideShare URL"
          type="url"
          scope={form.scope('slideShare')}
          placeholder="https://www.slideshare.net/..."
        />

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
