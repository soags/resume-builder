import {
  useField,
  type FormScope,
  type ValueOfInputType,
} from '@rvf/react-router'
import { GripVerticalIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import { useId, type ComponentPropsWithoutRef } from 'react'
import { Button } from '~/components/ui/button'
import { HiddenField } from '~/components/ui/hidden-field'
import { Input } from '~/components/ui/input'

export type SkillItemProps = {
  idScope: FormScope<ValueOfInputType<string>>
  textScope: FormScope<ValueOfInputType<string>>
  count: number
  index: number
  onAdd: () => void
  onRemove: (index: number) => void
  dragHandleProps?: ComponentPropsWithoutRef<'div'>
}

export function SkillItem({
  idScope,
  textScope,
  count,
  index,
  onAdd,
  onRemove,
  dragHandleProps,
}: SkillItemProps) {
  const field = useField(textScope)
  const errorId = useId()
  const showDelete = count > 1
  const isLastItem = index === count - 1

  const DragHandle = () =>
    showDelete ? (
      <div {...dragHandleProps} className="cursor-grab">
        <GripVerticalIcon />
      </div>
    ) : null

  const DeleteButton = () =>
    showDelete ? (
      <Button
        variant="outline"
        size="icon"
        aria-label="スキルを削除"
        onClick={() => onRemove(index)}
      >
        <Trash2Icon />
      </Button>
    ) : null

  const AddButton = () =>
    isLastItem ? (
      <Button
        variant="outline"
        size="icon"
        aria-label="スキルを追加"
        onClick={onAdd}
      >
        <PlusIcon />
      </Button>
    ) : null

  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <div className="flex items-center gap-2">
        <DragHandle />

        <Input
          {...field.getInputProps({
            'aria-describedby': errorId,
            'aria-invalid': !!field.error(),
          })}
        />

        <HiddenField scope={idScope} />

        <DeleteButton />
        <AddButton />
      </div>

      {field.error() && (
        <p id={errorId} className="text-destructive text-[0.8rem] font-medium">
          {field.error()}
        </p>
      )}
    </div>
  )
}
