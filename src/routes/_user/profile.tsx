import { createFileRoute } from '@tanstack/react-router'

import { findUserFn } from '@/server/queries/users'
import { UserProfileForm } from '@/features/users/components/UserProfileFrom'
import { Card, CardContent, CardHeader, CardTitle } from '@/integrations/shadcn/components/ui/card'
import { getUserNameInitials } from '@/features/users/utils/helpers'

export const Route = createFileRoute('/_user/profile')({
  component: RouteComponent,
  async loader({ context }) {
    if (context.user?.id) {
      return await findUserFn({ data: { userId: context.user.id } })
    }
  },
})

function RouteComponent() {
  const user = Route.useLoaderData()

  if (!user) return null

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your profile and preferences</p>
      </div>

      <div className="grid gap-6 md:grid-cols-[280px_1fr]">
        {/* Profile Card */}
        <Card className="h-fit border-none shadow-md">
          <CardContent className="flex flex-col items-center p-6">
            <div className="bg-primary/10 ring-primary/20 mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full ring-4 transition-transform hover:scale-105">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name ?? 'User'}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-primary text-4xl font-bold">{getUserNameInitials(user)}</span>
              )}
            </div>
            <h2 className="text-xl font-semibold">{user.name ?? 'User'}</h2>
            <p className="text-muted-foreground text-sm">{user.email}</p>
            <div className="bg-primary/10 text-primary mt-3 rounded-full px-3 py-1 text-xs font-medium">
              Active
            </div>
          </CardContent>
        </Card>

        {/* Settings Form Card */}
        <Card className="border-none shadow-md">
          <CardHeader className="border-b pb-4">
            <CardTitle className="text-lg font-medium">Profile Information</CardTitle>
            <p className="text-muted-foreground text-sm">Update your personal details</p>
          </CardHeader>
          <CardContent className="p-6">
            <UserProfileForm user={user} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
