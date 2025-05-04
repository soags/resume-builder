import { Input } from './input'
import { Label } from './label'

function Field({
  label,
  name,
  defaultValue,
}: {
  label: string
  name: string
  defaultValue?: string
}) {
  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} defaultValue={defaultValue} />
    </div>
  )
}

export { Field }
