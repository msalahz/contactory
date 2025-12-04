import { createFileRoute } from '@tanstack/react-router'
import { SigninForm } from '@/features/users/components/signin-form'

export const Route = createFileRoute('/signin')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <section className="flex min-h-full flex-col items-center justify-center p-6">
      <SigninForm />
    </section>
  )
}
