import { Button } from '@/features/abstractions/components/primitives/button'
import { Spinner } from '@/features/abstractions/components/primitives/spinner'
import { useFormContext } from '@/integrations/tanstack-form/hooks/form-context'

export interface SubscribeButtonProps extends React.ComponentProps<typeof Button> {
  label: string
}

export function SubmitButton({ label, ...props }: SubscribeButtonProps) {
  const form = useFormContext()
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button
          disabled={isSubmitting}
          onClick={(event) => {
            event.preventDefault()
            form.reset()
          }}
          {...props}
        >
          {isSubmitting ? <Spinner className="size-4" /> : label}
        </Button>
      )}
    </form.Subscribe>
  )
}
