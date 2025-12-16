import { createFileRoute, redirect } from '@tanstack/react-router'

import { noop } from '@/features/abstractions/lib/utils'
import { SigninForm } from '@/features/users/components/signin-form'
import { ItemTitle } from '@/features/abstractions/components/primitives/item'
import { AlertBox } from '@/features/abstractions/components/reused/alert-box'
import { FieldError } from '@/features/abstractions/components/primitives/field'
import { useSigninEmail } from '@/integrations/better-auth/hooks/use-signin-email'
import { AnimatedPresence } from '@/features/abstractions/components/reused/animated-presence'

export const Route = createFileRoute('/_auth/signin')({
  beforeLoad({ context }) {
    if (context.session) {
      throw redirect({ to: '/console' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { mutateAsync, error } = useSigninEmail()

  return (
    <AnimatedPresence>
      <SigninForm
        onFormSubmit={async (data: { email: string; password: string }) => {
          await mutateAsync({
            email: data.email,
            password: data.password,
            rememberMe: true,
            callbackURL: '/console',
          }).catch(noop)
        }}
      >
        {error ? (
          <AlertBox type="error">
            <ItemTitle>Signin Failed</ItemTitle>
            <FieldError errors={[error]} />
          </AlertBox>
        ) : null}
      </SigninForm>
    </AnimatedPresence>
  )
}
