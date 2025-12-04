import * as React from 'react'
import { useStore } from '@tanstack/react-form'

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/features/abstractions/components/primitives/field'
import { Input } from '@/features/abstractions/components/primitives/input'
import { useFieldContext } from '@/integrations/tanstack-form/hooks/form-context'

export interface InputFieldProps extends React.ComponentProps<typeof Input> {
  label?: string
  description?: string
}

export function InputField({
  label,
  description,
  ...InputProps
}: InputFieldProps) {
  const field = useFieldContext<string>()
  const errors = useStore(field.store, (state) => state.meta.errors)
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <Field data-invalid={isInvalid}>
      {label ? (
        <FieldLabel htmlFor="form-tanstack-input-username">{label}</FieldLabel>
      ) : null}
      <Input
        {...InputProps}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
      />
      {description ? <FieldDescription>{description}</FieldDescription> : null}
      {isInvalid ? <FieldError errors={errors} /> : null}
    </Field>
  )
}
