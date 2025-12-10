import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

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
    <div>
      Hello "/layout/"!
      <Outlet />
    </div>
  )
}
