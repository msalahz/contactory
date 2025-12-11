import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

import { Layout } from '@/features/abstractions/components/reused/layout'
import { Separator } from '@/features/abstractions/components/primitives/separator'
import { authRequestMiddleware } from '@/integrations/better-auth/middlewares/auth-request-middleware'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/features/abstractions/components/primitives/sidebar'
import { ConsoleSidebar } from '@/features/abstractions/components/reused/console-sidebar'

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
      <SidebarProvider>
        <ConsoleSidebar />
        <SidebarInset>
          <section className="flex flex-1 flex-col">
            <header className="flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mx-2 data-[orientation=vertical]:h-4"
                />
              </div>
            </header>
            <main className="flex-1 overflow-auto">
              <Outlet />
            </main>
          </section>
        </SidebarInset>
      </SidebarProvider>
    </Layout>
  )
}
