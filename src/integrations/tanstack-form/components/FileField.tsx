import * as React from 'react'
import { useStore } from '@tanstack/react-form'

import type { ReactNode } from 'react'

import { Input } from '@/integrations/shadcn/components/ui/input'
import { useFieldContext } from '@/integrations/tanstack-form/hooks/formContext'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/integrations/shadcn/components/ui/field'

export interface FileFieldProps extends React.ComponentProps<typeof Input> {
  label?: string
  description?: string
  labelChildren?: ReactNode
  fieldProps?: React.ComponentProps<typeof Field>
}

export function FileField({
  label,
  description,
  labelChildren,
  fieldProps,
  ...InputProps
}: FileFieldProps) {
  const field = useFieldContext<File>()
  const errors = useStore(field.store, (state) => state.meta.errors)
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <Field data-invalid={isInvalid} {...fieldProps}>
      {label ? (
        <div className="flex w-full items-center justify-between">
          <FieldLabel htmlFor={InputProps.id || `${field.name}-form-field`}>{label}</FieldLabel>
          {labelChildren}
        </div>
      ) : null}

      <Input
        id={`${field.name}-form-field`}
        name={field.name}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.files?.[0] ?? ('' as unknown as File))}
        aria-invalid={isInvalid}
        {...InputProps}
        type="file"
      />

      {description ? <FieldDescription>{description}</FieldDescription> : null}
      {isInvalid ? <FieldError errors={errors} /> : null}
    </Field>
  )
}
