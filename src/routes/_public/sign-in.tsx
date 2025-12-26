import { createFileRoute } from '@tanstack/react-router'

import { SignIn } from '@/features/users/signIn'
import { AnimatedPresence } from '@/shared/components/AnimatedPresence'

export const Route = createFileRoute('/_public/sign-in')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AnimatedPresence>
      <SignIn />
    </AnimatedPresence>
  )
}
