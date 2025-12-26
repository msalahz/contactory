import { createFileRoute } from '@tanstack/react-router'

import { ConsoleInsetContent, ConsoleInsetHeader } from '@/shared/console/Console'
import { useCreateContactMutation } from '@/features/contacts/queries'
import { ContactForm } from '@/features/contacts/components/ContactForm'
import { AlertBox } from '@/shared/components/AlertBox'
import { ItemTitle } from '@/integrations/shadcn/components/ui/item'
import { FieldError } from '@/integrations/shadcn/components/ui/field'

export const Route = createFileRoute('/dashboard/contacts/new')({
  component: RouteComponent,
})

function RouteComponent() {
  const { error } = useCreateContactMutation()

  return (
    <>
      <ConsoleInsetHeader>Create Contact</ConsoleInsetHeader>

      <ConsoleInsetContent>
        <ContactForm
          onFormSubmit={async () => {
            // await mutateAsync(data)
          }}
        >
          {error ? (
            <AlertBox type="error">
              <ItemTitle>Create Account Failed</ItemTitle>
              <FieldError errors={[error]} />
            </AlertBox>
          ) : null}
        </ContactForm>
      </ConsoleInsetContent>
    </>
  )
}
