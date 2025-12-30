import { createFileRoute } from '@tanstack/react-router'

import { envClient } from '@/env.client'
import { SignInForm } from '@/features/users/components/signInForm'
import { AnimatedPresence } from '@/shared/components/AnimatedPresence'
import { useSignInSocial } from '@/features/users/hooks/useSignInSocial'
import { useSignInEmail } from '@/features/users/hooks/useSignInEmail'

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
