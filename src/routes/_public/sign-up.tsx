import { createFileRoute } from '@tanstack/react-router'

import { envClient } from '@/env.client'
import { noop } from '@/shared/utils/noop'
import { AlertBox } from '@/shared/components/AlertBox'
import { SignUpForm } from '@/features/users/components/signUpForm'
import { ItemTitle } from '@/integrations/shadcn/components/ui/item'
import { FieldError } from '@/integrations/shadcn/components/ui/field'
import { useSignUpEmail } from '@/features/users/hooks/useSignUpEmail'
import { AnimatedPresence } from '@/shared/components/AnimatedPresence'
import { useSignInSocial } from '@/features/users/hooks/useSignInSocial'

export const Route = createFileRoute('/_public/sign-up')({
  component: RouteComponent,
})

function RouteComponent() {
  const { mutateAsync: signUpEmail, error } = useSignUpEmail()
  const { mutate: signInSocial, isPending: isSigningInSocial } = useSignInSocial()

  function signUpGoogle() {
    signInSocial({
      provider: 'google',
      requestSignUp: true,
      callbackURL: envClient.VITE_BETTER_AUTH_CALLBACK_URL,
    })
  }
  return (
    <AnimatedPresence>
      <SignUpForm
        signUpGoogle={signUpGoogle}
        isSigningUpSocial={isSigningInSocial}
        onFormSubmit={async (data: { name: string; email: string; password: string }) => {
          await signUpEmail({
            name: data.name,
            email: data.email,
            password: data.password,
            callbackURL: '/dashboard',
          }).catch(noop)
        }}
      >
        {error ? (
          <AlertBox type="error">
            <ItemTitle>Sign Up Failed</ItemTitle>
            <FieldError errors={[error]} />
          </AlertBox>
        ) : null}
      </SignUpForm>
    </AnimatedPresence>
  )
}
