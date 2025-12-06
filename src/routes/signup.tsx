import { createFileRoute, redirect } from '@tanstack/react-router'
import { SignupForm } from '@/features/users/components/signup-form'

export const Route = createFileRoute('/signup')({
  beforeLoad({ context }) {
    if (context.session) {
      throw redirect({ to: '/console' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <section className="flex min-h-full flex-col items-center justify-center p-6">
      <SignupForm />
    </section>
  )
}
