import {
  useField,
  type FormScope,
  type ValueOfInputType,
} from '@rvf/react-router'
import { Input } from './input'
import { Label } from './label'
import { forwardRef, useId, type ComponentPropsWithRef } from 'react'

type BaseInputProps = Omit<ComponentPropsWithRef<'input'>, 'type'>

type FieldProps<Type extends string> = {
  label: string
  type?: Type
  scope: FormScope<ValueOfInputType<Type>>
} & BaseInputProps

type InputType = <Type extends string>(
  props: FieldProps<Type>
) => React.ReactNode

const FieldImpl = forwardRef<HTMLInputElement, FieldProps<string>>(
  ({ label, type, scope, ...rest }, ref) => {
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
        {field.error() && (
          <p id={errorId} className="text-red-500">
            {field.error()}
          </p>
        )}
      </div>
    )
  }
)

FieldImpl.displayName = 'Field'

export const Field = FieldImpl as InputType
