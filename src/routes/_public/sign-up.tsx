import { createFileRoute } from '@tanstack/react-router'

import { SignUp } from '@/features/users/components/signUp'
import { AnimatedPresence } from '@/shared/components/AnimatedPresence'
import { useSignInSocial } from '@/features/users/hooks/useSignInSocial'
import { envClient } from '@/env.client'

export const Route = createFileRoute('/_public/sign-up')({
  component: RouteComponent,
})

function RouteComponent() {
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
      <SignUp signUpGoogle={signUpGoogle} isSigningUpSocial={isSigningInSocial} />
    </AnimatedPresence>
  )
}
