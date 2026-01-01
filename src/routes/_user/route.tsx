import { Outlet, createFileRoute } from '@tanstack/react-router'

import { SidebarProvider, SidebarTrigger } from '@/integrations/shadcn/components/ui/sidebar'
import {
  UserSidebar,
  UserSidebarContent,
  UserSidebarFooter,
  UserSidebarHeader,
} from '@/features/users/components/UserSidebar'

export const Route = createFileRoute('/_user')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <SidebarProvider
      defaultOpen={true}
      className="from-primary/20 dark:from-primary/30 bg-linear-to-br from-0% via-gray-100 via-30% to-transparent to-60% dark:via-gray-800 dark:to-gray-900"
    >
      <UserSidebar>
        <UserSidebarHeader />
        <UserSidebarContent />
        <UserSidebarFooter />
      </UserSidebar>

      <div className="bg-background/90 relative my-2 ms-2 me-2 flex-1 rounded-md border p-2 md:ms-0">
        <SidebarTrigger className="absolute start-1 top-1 ms-auto md:hidden" />
        <Outlet />
      </div>
    </SidebarProvider>
  )
}
