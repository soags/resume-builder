import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { SkillItem, type SkillItemProps } from './skill-item'
import { useField } from '@rvf/react-router'

export type SortableSkillItemProps = SkillItemProps

export function SortableSkillItem({
  idScope,
  ...rest
}: SortableSkillItemProps) {
  const field = useField(idScope)

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: field.value() })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const dragHandleProps = {
    ...attributes,
    ...listeners,
  }

  return (
    <div ref={setNodeRef} style={style}>
      <SkillItem
        {...rest}
        idScope={idScope}
        dragHandleProps={dragHandleProps}
      />
    </div>
  )
}
