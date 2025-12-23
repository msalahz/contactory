import * as React from 'react'
import { useStore } from '@tanstack/react-form'

import type { ReactNode } from 'react'

import { Input } from '@/features/abstractions/components/primitives/input'
import { useFieldContext } from '@/integrations/tanstack-form/hooks/formContext'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/features/abstractions/components/primitives/field'

export interface InputFieldProps extends React.ComponentProps<typeof Input> {
  label?: string
  description?: string
  labelChildren?: ReactNode
  fieldProps?: React.ComponentProps<typeof Field>
}

export function InputField({
  label,
  description,
  labelChildren,
  fieldProps,
  ...InputProps
}: InputFieldProps) {
  const field = useFieldContext<string>()
  const errors = useStore(field.store, (state) => state.meta.errors)
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <Field data-invalid={isInvalid} {...fieldProps}>
      {label ? (
        <div className="flex w-full items-center justify-between">
          <FieldLabel htmlFor={`${field.name}-form-field`}>{label}</FieldLabel>
          {labelChildren}
        </div>
      ) : null}

      <Input
        autoComplete="on"
        {...InputProps}
        id={`${field.name}-form-field`}
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
