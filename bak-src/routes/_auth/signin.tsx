import { createFileRoute, redirect } from '@tanstack/react-router'

import { noop } from '@/shared/utils/noop'
import { SigninForm } from '@/features/users/components/SigninForm'
import { AlertBox } from '@/shared/components/AlertBox'
import { ItemTitle } from '@/integrations/shadcn/components/ui/item'
import { FieldError } from '@/integrations/shadcn/components/ui/field'
import { useSigninEmail } from '@/integrations/better-auth/hooks/useSigninEmail'
import { AnimatedPresence } from '@/shared/components/AnimatedPresence'

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
