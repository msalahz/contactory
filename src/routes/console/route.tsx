import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

import { Layout } from '@/features/abstractions/components/reused/layout'
import { ConsoleSidebar } from '@/features/abstractions/components/reused/console-sidebar'
import { authRequestMiddleware } from '@/integrations/better-auth/middlewares/auth-request-middleware'
import {
  SidebarInset,
  SidebarProvider,
} from '@/features/abstractions/components/primitives/sidebar'

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
      <SidebarProvider defaultOpen={false}>
        <ConsoleSidebar />
        <SidebarInset>
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </Layout>
  )
}
