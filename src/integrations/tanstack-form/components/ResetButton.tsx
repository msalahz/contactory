import { Button } from '@/integrations/shadcn/components/ui/button'
import { useFormContext } from '@/integrations/tanstack-form/hooks/formContext'

export interface ResetButtonProps extends React.ComponentProps<typeof Button> {}

export function ResetButton({ ...props }: ResetButtonProps) {
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
        />
      )}
    </form.Subscribe>
  )
}
