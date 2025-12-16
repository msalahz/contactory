import { createFileRoute, redirect } from '@tanstack/react-router'

import { noop } from '@/features/abstractions/lib/utils'
import { SignupForm } from '@/features/users/components/signup-form'
import { AlertBox } from '@/features/abstractions/components/reused/alert-box'
import { ItemTitle } from '@/features/abstractions/components/primitives/item'
import { FieldError } from '@/features/abstractions/components/primitives/field'
import { useSignupEmail } from '@/integrations/better-auth/hooks/use-signup-email'
import { AnimatedPresence } from '@/features/abstractions/components/reused/animated-presence'

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
