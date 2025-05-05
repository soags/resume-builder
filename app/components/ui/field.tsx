import {
  useField,
  type FormScope,
  type ValueOfInputType,
} from '@rvf/react-router'
import { Input } from './input'
import { Label } from './label'
import { forwardRef, useId, type ComponentPropsWithRef } from 'react'

type BaseInputProps = Omit<ComponentPropsWithRef<'input'>, 'type'>

type FieldProps<Type extends string> = BaseInputProps & {
  label: string
  type?: Type
  scope: FormScope<ValueOfInputType<Type>>
  description?: string
}

const Field = forwardRef<HTMLInputElement, FieldProps<string>>(
  ({ label, scope, type, description, ...rest }, ref) => {
    const field = useField(scope)
    const inputId = useId()
    const errorId = useId()

    return (
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor={inputId}>{label}</Label>
        <Input
          {...field.getInputProps({
            type,
            id: inputId,
            ref,
            'aria-describedby': errorId,
            'aria-invalid': !!field.error(),
            ...rest,
          })}
        />
        {description && (
          <p className="text-muted-foreground text-[0.8rem]">{description}</p>
        )}
        {field.error() && (
          <p
            id={errorId}
            className="text-destructive text-[0.8rem] font-medium"
          >
            {field.error()}
          </p>
        )}
      </div>
    )
  }
)

Field.displayName = 'Field'

export { Field }
