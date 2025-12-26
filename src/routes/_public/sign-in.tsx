import { createFileRoute } from '@tanstack/react-router'
import { SignIn } from '@/features/users/signIn'

export const Route = createFileRoute('/_public/sign-in')({
  component: RouteComponent,
})

function RouteComponent() {
  return <SignIn />
}
