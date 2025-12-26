import { createFileRoute } from '@tanstack/react-router'
import { SignUp } from '@/features/users/signUp'

export const Route = createFileRoute('/_public/sign-up')({
  component: RouteComponent,
})

function RouteComponent() {
  return <SignUp />
}
