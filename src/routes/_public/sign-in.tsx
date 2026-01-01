import { createFileRoute } from '@tanstack/react-router'

import { envClient } from '@/env.client'
import { noop } from '@/shared/utils/noop'
import { AlertBox } from '@/shared/components/AlertBox'
import { SignInForm } from '@/features/users/components/SignInForm'
import { ItemTitle } from '@/integrations/shadcn/components/ui/item'
import { useSignInEmail } from '@/features/users/hooks/useSignInEmail'
import { FieldError } from '@/integrations/shadcn/components/ui/field'
import { AnimatedPresence } from '@/shared/components/AnimatedPresence'
import { useSignInSocial } from '@/features/users/hooks/useSignInSocial'

export const Route = createFileRoute('/_public/sign-in')({
  component: RouteComponent,
})

function RouteComponent() {
  const { mutateAsync: singInEmail, error } = useSignInEmail()
  const { mutate: signInSocial, isPending: isSigningInSocial } = useSignInSocial()

  function signInGoogle() {
    signInSocial({
      provider: 'google',
      callbackURL: envClient.VITE_BETTER_AUTH_CALLBACK_URL,
    })
  }

  return (
    <AnimatedPresence>
      <SignInForm
        signInGoogle={signInGoogle}
        isSigningInSocial={isSigningInSocial}
        onFormSubmit={async (data) => {
          await singInEmail({
            ...data,
            rememberMe: true,
            callbackURL: envClient.VITE_BETTER_AUTH_CALLBACK_URL,
          }).catch(noop)
        }}
      >
        {error ? (
          <AlertBox type="error">
            <ItemTitle>Sign In Failed</ItemTitle>
            <FieldError errors={[error]} />
          </AlertBox>
        ) : null}
      </SignInForm>
    </AnimatedPresence>
  )
}
