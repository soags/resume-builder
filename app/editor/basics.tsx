import { Form } from 'react-router'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { prisma } from '~/lib/prisma.server'
import type { Route } from './+types/basics'

export async function loader() {
  const userId = '64131899-e67f-4722-97c1-16b4216d5ebd' // TODO: get from session

  if (!userId) {
    throw new Error('userId is missing')
  }

  const resume = await prisma.resume.findFirst({
    where: { userId },
    select: {
      name: true,
      label: true,
    },
  })

  return resume
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()
  const name = formData.get('name') as string
  const label = formData.get('label') as string

  const userId = '64131899-e67f-4722-97c1-16b4216d5ebd' // TODO: get from session

  if (!name || !userId) {
    throw new Error('name or userId is missing')
  }

  const existing = await prisma.resume.findFirst({
    where: { userId },
  })

  if (existing) {
    await prisma.resume.update({
      where: { id: existing.id },
      data: {
        name,
        label,
      },
    })
  } else {
    await prisma.resume.create({
      data: {
        userId,
        name,
        label,
      },
    })
  }

  return {}
}

export default function BasicsForm({ loaderData }: Route.ComponentProps) {
  const { name, label } = loaderData ?? {
    name: '',
    label: '',
  }

  return (
    <Form
      method="post"
      className="w-3xl rounded-lg border border-slate-300 p-8"
    >
      <div className="flex flex-col gap-4">
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="name">名前</Label>
          <Input id="name" name="name" defaultValue={name} />
        </div>
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="label">職種</Label>
          <Input id="label" name="label" defaultValue={label} />
        </div>
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
