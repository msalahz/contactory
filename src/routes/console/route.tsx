import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

import { Layout } from '@/features/abstractions/components/reused/layout'
import { authRequestMiddleware } from '@/integrations/better-auth/middlewares/auth-request-middleware'

export const Route = createFileRoute('/console')({
  server: {
    middleware: [authRequestMiddleware],
  },
  beforeLoad({ context }) {
    if (!context.session) {
      throw redirect({ to: '/signin' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Layout>
      Hello "/layout/"!
      <Outlet />
    </Layout>
  )
}
