import * as React from 'react'
import { Button } from '@/features/abstractions/components/primitives/button'
import { useFormContext } from '@/integrations/tanstack-form/hooks/form-context'

export interface ResetButtonProps extends React.ComponentProps<typeof Button> {
  label: string
}

export function ResetButton({ label = 'Reset', ...props }: ResetButtonProps) {
  const form = useFormContext()
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button
          type="reset"
          disabled={isSubmitting}
          onClick={(e) => {
            e.preventDefault()
            form.reset()
          }}
          {...props}
        >
          {label}
        </Button>
      )}
    </form.Subscribe>
  )
}
