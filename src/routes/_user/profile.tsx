import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

import type { UserInfoFormValues } from '@/features/users/components/UserInfoForm'
import type { UserPasswordFormValues } from '@/features/users/components/UserPasswordForm'

import { noop } from '@/shared/utils/noop'
import { authOptions } from '@/features/auth/options'
import { AlertBox } from '@/shared/components/AlertBox'
import { ItemTitle } from '@/integrations/shadcn/components/ui/item'
import { FieldError } from '@/integrations/shadcn/components/ui/field'
import { UserInfoForm } from '@/features/users/components/UserInfoForm'
import { UserSocialForm } from '@/features/users/components/UserSocialForm'
import { useUpdateAuthUser } from '@/features/auth/hooks/useUpdateAuthUser'
import { useChangePassword } from '@/features/auth/hooks/useChangePassword'
import { UserPasswordForm } from '@/features/users/components/UserPasswordForm'
import { UserProfile, UserProfileContent } from '@/features/users/components/UserProfile'

export const Route = createFileRoute('/_user/profile')({
  component: RouteComponent,
  async loader({ context }) {
    return context.queryClient.ensureQueryData(authOptions.authUser())
  },
})

function RouteComponent() {
  const { mutateAsync: updateAuthUser, error: updateAuthUserError } = useUpdateAuthUser()
  const { mutateAsync: changePassword, error: changePasswordError } = useChangePassword()
  const { data: authUser } = useSuspenseQuery(authOptions.authUser())
  const { name, image } = authUser || {}

  async function handleUSerInfoSubmit(data: UserInfoFormValues) {
    await updateAuthUser(data).catch(noop)
  }

  async function handlePasswordSubmit(data: UserPasswordFormValues) {
    await changePassword(data).catch(noop)
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
        <UserInfoForm user={{ name, image }} onFormSubmit={handleUSerInfoSubmit}>
          {updateAuthUserError ? (
            <AlertBox type="error">
              <ItemTitle>Failed to update profile</ItemTitle>
              <FieldError errors={[updateAuthUserError]} />
            </AlertBox>
          ) : null}
        </UserInfoForm>

        <UserPasswordForm onFormSubmit={handlePasswordSubmit}>
          {changePasswordError ? (
            <AlertBox type="error">
              <ItemTitle>Failed to change password</ItemTitle>
              <FieldError errors={[changePasswordError]} />
            </AlertBox>
          ) : null}
        </UserPasswordForm>

        <UserSocialForm
          connectedAccounts={[]}
          onConnect={handleSocialConnect}
          onDisconnect={handleSocialDisconnect}
        />
      </UserProfileContent>
    </UserProfile>
  )
}
