import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

import { useSuspenseQuery } from '@tanstack/react-query'
import { authOptions } from '@/features/auth/options'
import { findAuthUserFn } from '@/server/queries/auth'
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
  async beforeLoad() {
    const authUser = await findAuthUserFn()
    if (!authUser) {
      throw redirect({ to: '/sign-in' })
    }
    return { context: { authUser } }
  },
  loader({ context }) {
    return context.queryClient.ensureQueryData(authOptions.authUser())
  },
})

function RouteComponent() {
  const { data: authUser } = useSuspenseQuery(authOptions.authUser())

  return (
    <SidebarProvider
      defaultOpen={true}
      className="from-primary/20 dark:from-primary/30 bg-linear-to-br from-0% via-gray-100 via-30% to-transparent to-60% dark:via-gray-800 dark:to-gray-900"
    >
      <UserSidebar>
        <UserSidebarHeader />
        <UserSidebarContent />
        <UserSidebarFooter user={authUser} />
      </UserSidebar>

      <UserSidebarGrip />

      <div className="bg-background/90 relative m-2 flex-1 rounded-md border p-2 md:ms-0">
        <Outlet />
      </div>
    </SidebarProvider>
  )
}
