import {
  useField,
  type FormScope,
  type ValueOfInputType,
} from '@rvf/react-router'

type HiddenFieldProps = {
  scope: FormScope<ValueOfInputType<string>>
}

export function HiddenField({ scope }: HiddenFieldProps) {
  const field = useField(scope)
  return (
    <input
      {...field.getInputProps({
        type: 'hidden',
      })}
    />
  )
}
