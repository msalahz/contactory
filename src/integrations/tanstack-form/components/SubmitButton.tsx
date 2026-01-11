import { Button } from '@/integrations/shadcn/components/ui/button'
import { Spinner } from '@/integrations/shadcn/components/ui/spinner'
import { useFormContext } from '@/integrations/tanstack-form/hooks/formContext'

export interface SubmitButtonProps extends React.ComponentProps<typeof Button> {}

export function SubmitButton({ children, ...props }: SubmitButtonProps) {
  const form = useFormContext()
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button disabled={isSubmitting} {...props}>
          {isSubmitting ? <Spinner className="size-4" /> : children}
        </Button>
      )}
    </form.Subscribe>
  )
}
