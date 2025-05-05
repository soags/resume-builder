import { GripVerticalIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'

export type SkillFieldProps = {
  title: string
  count: number
  index: number
  onChange: (index: number, value: string) => void
  onAdd: () => void
  onRemove: (index: number) => void
  dragHandleProps?: React.HTMLAttributes<HTMLElement>
}

export function SkillField({
  title,
  count,
  index,
  onChange,
  onAdd,
  onRemove,
  dragHandleProps,
}: SkillFieldProps) {
  return (
    <div className="flex items-center gap-2">
      {count > 1 && (
        <div {...dragHandleProps} className="cursor-grab">
          <GripVerticalIcon />
        </div>
      )}

      <Input value={title} onChange={(e) => onChange(index, e.target.value)} />

      {count > 1 && (
        <Button
          variant="outline"
          size="icon"
          aria-label="スキルを削除"
          onClick={() => onRemove(index)}
        >
          <Trash2Icon />
        </Button>
      )}

      {index === count - 1 && (
        <Button
          variant="outline"
          size="icon"
          aria-label="スキルを追加"
          onClick={() => onAdd()}
        >
          <PlusIcon />
        </Button>
      )}
    </div>
  )
}
