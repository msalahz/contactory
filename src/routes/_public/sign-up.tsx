import { createFileRoute } from '@tanstack/react-router'

import { SignUp } from '@/features/users/signUp'
import { AnimatedPresence } from '@/shared/components/AnimatedPresence'

export const Route = createFileRoute('/_public/sign-up')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AnimatedPresence>
      <SignUp />
    </AnimatedPresence>
  )
}
