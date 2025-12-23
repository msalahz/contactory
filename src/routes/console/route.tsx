import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

import { authRequestMiddleware } from '@/integrations/better-auth/middlewares'
import { Console, ConsoleInset, ConsoleSidebar } from '@/features/abstractions/console/Console'

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
    <Console>
      <ConsoleSidebar />
      <ConsoleInset>
        <Outlet />
      </ConsoleInset>
    </Console>
  )
}
