import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { SkillField, type SkillFieldProps } from './skill-field'

export type SortableSkillFieldProps = SkillFieldProps & {
  id: string
}

export function SortableSkillField(props: SortableSkillFieldProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style}>
      <SkillField
        {...props}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  )
}
