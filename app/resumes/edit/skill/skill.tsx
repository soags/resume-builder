import type { Route } from './+types/skill'
import { getSkills, updateSkills } from '~/models/skill.server'
import { nanoid } from 'nanoid/non-secure'
import {
  parseFormData,
  useFieldArray,
  useForm,
  validationError,
} from '@rvf/react-router'
import { z } from 'zod'
import { Button } from '~/components/ui/button'
import { SortableSkillItem } from './sortable-skill-item'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { closestCenter, DndContext, type DragEndEvent } from '@dnd-kit/core'
import { redirect } from 'react-router'
import { useId } from 'react'

const schema = z.object({
  skills: z.array(
    z.object({
      id: z.string(),
      text: z.string().max(50),
    })
  ),
})

export async function loader({ params }: Route.LoaderArgs) {
  const skills = await getSkills(params.resumeId)
  return {
    skills: skills.length
      ? skills.map((s) => ({ id: nanoid(), text: s.text }))
      : [{ id: nanoid(), text: '' }],
  }
}

export async function action({ params, request }: Route.ActionArgs) {
  const result = await parseFormData(request, schema)
  if (result.error) {
    return validationError(result.error, result.submittedData)
  }

  const skills = result.data.skills.map((item, index) => ({
    text: item.text,
    orderNo: index,
  }))

  await updateSkills(params.resumeId, skills)

  return redirect(`/resumes`)
}

export default function Skill({ loaderData }: Route.ComponentProps) {
  const form = useForm({
    method: 'post',
    schema: schema,
    defaultValues: loaderData,
    onSubmitSuccess: () => {
      alert('保存しました')
    },
  })

  const fields = useFieldArray(form.scope('skills'))

  const dndId = useId()

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    // IDから移動前後のインデックスを検索する
    const idList = fields.map((_, item) => item.value('id'))
    const oldIndex = idList.indexOf(active.id as string)
    const newIndex = idList.indexOf(over.id as string)

    if (oldIndex === -1 || newIndex === -1) return

    // 移動前のオブジェクトを取得
    const items = fields.map((_, item) => ({
      id: item.value('id'),
      text: item.value('text'),
    }))
    const movedItem = items[oldIndex]

    fields.remove(oldIndex)
    fields.insert(newIndex, movedItem)
  }

  return (
    <form
      {...form.getFormProps()}
      className="w-3xl rounded-lg border border-slate-300 p-8"
    >
      <header className="mb-8">
        <h2 className="text-2xl font-bold">スキル</h2>
      </header>
      <DndContext
        id={dndId}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={fields.map((_, item) => item.value('id'))}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {fields.map((key, item, index) => (
              <SortableSkillItem
                key={key}
                idScope={item.scope('id')}
                textScope={item.scope('text')}
                count={fields.length()}
                index={index}
                onAdd={() => fields.push({ id: nanoid(), text: '' })}
                onRemove={(index) => fields.remove(index)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <div className="mt-6 flex gap-8">
        <Button type="submit" className="flex-1 bg-sky-800 hover:bg-sky-950">
          保存
        </Button>
        <Button type="reset" className="flex-1" variant="outline">
          元に戻す
        </Button>
      </div>
    </form>
  )
}
