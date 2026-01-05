import { useStore } from '@tanstack/react-form'

import type { ReactNode } from 'react'

import { Checkbox } from '@/integrations/shadcn/components/ui/checkbox'
import { useFieldContext } from '@/integrations/tanstack-form/hooks/formContext'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/integrations/shadcn/components/ui/field'

export interface CheckboxFieldProps extends React.ComponentProps<typeof Checkbox> {
  label?: string
  description?: string
  labelChildren?: ReactNode
  fieldProps?: React.ComponentProps<typeof Field>
}

export function CheckboxField({
  label = '',
  description,
  labelChildren,
  fieldProps,
  ...CheckboxProps
}: CheckboxFieldProps) {
  const field = useFieldContext<boolean | 'indeterminate'>()
  const errors = useStore(field.store, (state) => state.meta.errors)
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <Field data-invalid={isInvalid} orientation="horizontal" {...fieldProps}>
      <Checkbox
        id={`${field.name}-form-field`}
        name={field.name}
        onBlur={field.handleBlur}
        checked={field.state.value}
        onCheckedChange={(checked) => field.handleChange(checked)}
        aria-invalid={isInvalid}
        {...CheckboxProps}
      />
      <FieldContent>
        <FieldLabel htmlFor={CheckboxProps.id || `${field.name}-form-field`}>{label}</FieldLabel>
        {description ? <FieldDescription>{description}</FieldDescription> : null}
        {isInvalid ? <FieldError errors={errors} /> : null}
      </FieldContent>
    </Field>
  )
}
