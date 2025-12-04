import { useNavigate } from '@tanstack/react-router'

import { createFileRoute } from '@tanstack/react-router'
import { authClient } from '@/integrations/better-auth/auth-client'

export const Route = createFileRoute('/sign-out')({
  ssr: false,
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  authClient.signOut({
    fetchOptions: {
      async onSuccess() {
        await navigate({ to: '/signin' })
      },
    },
  })
  return (
    <section className="flex min-h-full flex-col items-center justify-center p-6">
      Signing out...
    </section>
  )
}
