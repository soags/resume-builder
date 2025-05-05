import { useState } from 'react'
import { closestCenter, DndContext, type DragEndEvent } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import type { SkillInput } from '~/validators/skills'
import { SortableSkillField } from './sortable-skill-field'
import { Button } from '~/components/ui/button'
import { redirect, useSubmit } from 'react-router'
import type { Route } from './+types/skill'
import { getSkills, updateSkills } from '~/models/skill.server'
import { nanoid } from 'nanoid/non-secure'

type SortableSkillInput = SkillInput & {
  id: string
}

export async function loader({ params }: Route.LoaderArgs) {
  const skills = await getSkills(params.resumeId)

  // 入力用オブジェクトに変換
  const sortableSkills: SortableSkillInput[] = skills.map((skill) => ({
    ...skill,
    id: nanoid(),
  }))

  // 0件の場合は空のデータをセット
  if (sortableSkills.length === 0) {
    sortableSkills.push({
      id: nanoid(),
      title: '',
      orderNo: 0,
    })
  }

  return sortableSkills
}

export async function action({ params, request }: Route.ActionArgs) {
  const items = await request.json()

  await updateSkills(params.resumeId, items)

  return redirect('./')
}

export default function Skill({ loaderData }: Route.ComponentProps) {
  const [items, setItems] = useState<SortableSkillInput[]>(loaderData)

  const submit = useSubmit()

  const handleAddSkill = () => {
    setItems((items) => [
      ...items,
      {
        id: nanoid(),
        title: '',
        orderNo: items.length,
      },
    ])
  }
  const handleRemoveSkill = (index: number) => {
    setItems((items) => items.filter((_, i) => i !== index))
  }

  const handleSkillChange = (index: number, value: string) => {
    setItems((items) =>
      items.map((item, i) => (i === index ? { ...item, title: value } : item))
    )
  }

  // 並び替え
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id)
      const newIndex = items.findIndex((item) => item.id === over?.id)
      setItems((items) => arrayMove(items, oldIndex, newIndex))
    }
  }

  const handleSave = () => {
    // リスト順をOrderNoにセット
    const submitItems: SkillInput[] = items.map((item, index) => ({
      title: item.title,
      orderNo: index,
    }))

    submit(submitItems, { method: 'post', encType: 'application/json' })
  }

  return (
    <div className="w-3xl rounded-lg border border-slate-300 p-8">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={items.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {items.map((item, index) => (
              <SortableSkillField
                key={item.id}
                id={item.id}
                title={item.title}
                count={items.length}
                index={index}
                onChange={handleSkillChange}
                onAdd={handleAddSkill}
                onRemove={handleRemoveSkill}
              />
            ))}
          </div>
        </SortableContext>

        <div className="mt-6 flex gap-8">
          <Button
            className="flex-1 bg-sky-800 hover:bg-sky-950"
            onClick={handleSave}
          >
            保存
          </Button>
          <Button
            className="flex-1"
            variant="outline"
            onClick={() => setItems(loaderData)}
          >
            元に戻す
          </Button>
        </div>
      </DndContext>
    </div>
  )
}
