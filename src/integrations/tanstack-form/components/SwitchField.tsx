import * as React from 'react'
import { useStore } from '@tanstack/react-form'

import type { ReactNode } from 'react'

import { Switch } from '@/integrations/shadcn/components/ui/switch'
import { useFieldContext } from '@/integrations/tanstack-form/hooks/formContext'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/integrations/shadcn/components/ui/field'

export interface SwitchFieldProps extends React.ComponentProps<typeof Switch> {
  label?: string
  description?: string
  labelChildren?: ReactNode
  fieldProps?: React.ComponentProps<typeof Field>
}

export function SwitchField({
  label,
  description,
  labelChildren,
  fieldProps,
  ...SwitchProps
}: SwitchFieldProps) {
  const field = useFieldContext<boolean>()
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

      <Switch
        {...SwitchProps}
        id={`${field.name}-form-field`}
        name={field.name}
        checked={field.state.value}
        onBlur={field.handleBlur}
        onCheckedChange={field.handleChange}
        aria-invalid={isInvalid}
      />

      {description ? <FieldDescription>{description}</FieldDescription> : null}
      {isInvalid ? <FieldError errors={errors} /> : null}
    </Field>
  )
}
