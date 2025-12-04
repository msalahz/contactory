import { Button } from '@/features/abstractions/components/primitives/button'
import { Spinner } from '@/features/abstractions/components/primitives/spinner'
import { useFormContext } from '@/integrations/tanstack-form/hooks/form-context'

export function SubscribeButton({ label }: { label: string }) {
  const form = useFormContext()
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button disabled={isSubmitting}>
          {isSubmitting ? <Spinner className="size-4" /> : label}
        </Button>
      )}
    </form.Subscribe>
  )
}
