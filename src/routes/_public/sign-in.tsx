import { createFileRoute } from '@tanstack/react-router'

import { SignIn } from '@/features/users/components/signIn'
import { AnimatedPresence } from '@/shared/components/AnimatedPresence'
import { useSignInSocial } from '@/features/users/hooks/useSignInSocial'
import { envClient } from '@/env.client'

export const Route = createFileRoute('/_public/sign-in')({
  component: RouteComponent,
})

function RouteComponent() {
  const { mutate: signInSocial, isPending: isSigningInSocial } = useSignInSocial()

  function signInGoogle() {
    signInSocial({
      provider: 'google',
      callbackURL: envClient.VITE_BETTER_AUTH_CALLBACK_URL,
    })
  }

  return (
    <AnimatedPresence>
      <SignIn signInGoogle={signInGoogle} isSigningInSocial={isSigningInSocial} />
    </AnimatedPresence>
  )
}
