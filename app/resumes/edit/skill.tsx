import type { Route } from './+types/skill'
import { useEffect, useState } from 'react'
import { closestCenter, DndContext, type DragEndEvent } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import type { SkillInput } from '~/validators/skills'
import { SortableSkillField } from './skill/sortable-skill-field'

type SortableSkillInput = SkillInput & {
  id: string
}

export function loader({}: Route.LoaderArgs) {
  const sortableSkills: SortableSkillInput[] = [
    {
      id: Date.now.toString(),
      title: '',
    },
  ]

  return sortableSkills
}

export default function Skill({ loaderData }: Route.ComponentProps) {
  const [items, setItems] = useState<SortableSkillInput[]>(loaderData)

  const handleAddSkill = () => {
    const newId = Date.now().toString()
    setItems((items) => [
      ...items,
      {
        id: newId,
        title: '',
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id)
      const newIndex = items.findIndex((item) => item.id === over?.id)
      setItems((items) => arrayMove(items, oldIndex, newIndex))
    }
  }

  useEffect(() => {
    console.log('items', items)
  }, [items])

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
      </DndContext>
    </div>
  )
}
