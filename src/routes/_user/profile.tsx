import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

import { noop } from '@/shared/utils/noop'
import { authOptions } from '@/features/auth/options'
import { UserNameForm } from '@/features/users/components/UserNameForm'
import { UserSocialForm } from '@/features/users/components/UserSocialForm'
import { UserAvatarForm } from '@/features/users/components/UserAvatarForm'
import { useUpdateAuthUser } from '@/features/auth/hooks/useUpdateAuthUser'
import { UserPasswordForm } from '@/features/users/components/UserPasswordForm'
import { UserProfile, UserProfileContent } from '@/features/users/components/UserProfile'

export const Route = createFileRoute('/_user/profile')({
  component: RouteComponent,
  async loader({ context }) {
    return context.queryClient.ensureQueryData(authOptions.authUser())
  },
})

function RouteComponent() {
  const { mutateAsync: updateUser } = useUpdateAuthUser()
  const { data: authUser } = useSuspenseQuery(authOptions.authUser())
  const { name, image } = authUser || {}

  async function handleAvatarSubmit(data: { image: string }) {
    await updateUser(data).catch(noop)
  }

  async function handleNameSubmit(data: { name: string }) {
    await updateUser(data).catch(noop)
  }

  async function handlePasswordSubmit(data: { currentPassword: string; newPassword: string }) {
    // TODO: Implement password change via auth client
    console.log('Password change:', data)
  }

  async function handleSocialConnect(provider: string) {
    // TODO: Implement social account connection
    console.log('Connect:', provider)
  }

  async function handleSocialDisconnect(provider: string) {
    // TODO: Implement social account disconnection
    console.log('Disconnect:', provider)
  }

  return (
    <UserProfile>
      <UserProfileContent>
        <UserAvatarForm user={{ name, image }} onFormSubmit={handleAvatarSubmit} />
        <UserNameForm user={{ name }} onFormSubmit={handleNameSubmit} />
        <UserPasswordForm onFormSubmit={handlePasswordSubmit} />
        <UserSocialForm
          connectedAccounts={[]}
          onConnect={handleSocialConnect}
          onDisconnect={handleSocialDisconnect}
        />
      </UserProfileContent>
    </UserProfile>
  )
}
