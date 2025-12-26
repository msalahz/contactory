import { Button } from '@/integrations/shadcn/components/ui/button'
import { Spinner } from '@/integrations/shadcn/components/ui/spinner'
import { useFormContext } from '@/integrations/tanstack-form/hooks/formContext'

export interface SubscribeButtonProps extends React.ComponentProps<typeof Button> {
  label: string
}

export function SubmitButton({ label, ...props }: SubscribeButtonProps) {
  const form = useFormContext()
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button disabled={isSubmitting} {...props}>
          {isSubmitting ? <Spinner className="size-4" /> : label}
        </Button>
      )}
    </form.Subscribe>
  )
}
