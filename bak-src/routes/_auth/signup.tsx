import { createFileRoute, redirect } from '@tanstack/react-router'

import { noop } from '@/shared/utils/noop'
import { SignupForm } from '@/features/users/components/SignupForm'
import { AlertBox } from '@/shared/components/AlertBox'
import { ItemTitle } from '@/integrations/shadcn/components/ui/item'
import { FieldError } from '@/integrations/shadcn/components/ui/field'
import { useSignupEmail } from '@/integrations/better-auth/hooks/useSignupEmail'
import { AnimatedPresence } from '@/shared/components/AnimatedPresence'

export const Route = createFileRoute('/_auth/signup')({
  beforeLoad({ context }) {
    if (context.session) {
      throw redirect({ to: '/console' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { mutateAsync, error } = useSignupEmail()

  return (
    <AnimatedPresence>
      <SignupForm
        onFormSubmit={async (data: { name: string; email: string; password: string }) => {
          await mutateAsync(
            {
              name: data.name,
              email: data.email,
              password: data.password,
              callbackURL: '/console',
            },
            {
              onSuccess() {
                throw redirect({ to: '/console' })
              },
            },
          ).catch(noop)
        }}
      >
        {error ? (
          <AlertBox type="error">
            <ItemTitle>Signup Failed</ItemTitle>
            <FieldError errors={[error]} />
          </AlertBox>
        ) : null}
      </SignupForm>
    </AnimatedPresence>
  )
}
