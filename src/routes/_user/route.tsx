import { Outlet, createFileRoute } from '@tanstack/react-router'

import { requireAuthMiddleware } from '@/server/middlewares/auth'
import { SidebarProvider } from '@/integrations/shadcn/components/ui/sidebar'
import {
  UserSidebar,
  UserSidebarContent,
  UserSidebarFooter,
  UserSidebarGrip,
  UserSidebarHeader,
} from '@/features/users/components/UserSidebar'

export const Route = createFileRoute('/_user')({
  component: RouteComponent,
  server: {
    middleware: [requireAuthMiddleware],
  },
})

function RouteComponent() {
  const { user } = Route.useRouteContext()
  return (
    <SidebarProvider
      defaultOpen={true}
      className="from-primary/20 dark:from-primary/30 bg-linear-to-br from-0% via-gray-100 via-30% to-transparent to-60% dark:via-gray-800 dark:to-gray-900"
    >
      <UserSidebar>
        <UserSidebarHeader />
        <UserSidebarContent />
        <UserSidebarFooter user={user} />
      </UserSidebar>

      <UserSidebarGrip />

      <div className="bg-background/90 relative m-2 flex-1 rounded-md border p-2 md:ms-0">
        <Outlet />
      </div>
    </SidebarProvider>
  )
}
