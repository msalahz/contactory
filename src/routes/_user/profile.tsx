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
import { useUploadUserAvatarToR2 } from '@/features/users/hooks/useUploadUserAvatarToR2'
import { UserProfile, UserProfileContent } from '@/features/users/components/UserProfile'
import { stripFileMetadata } from '@/shared/utils/stripFileMetadata'

export const Route = createFileRoute('/_user/profile')({
  component: RouteComponent,
  async loader({ context }) {
    return context.queryClient.ensureQueryData(authOptions.authUser())
  },
})

function RouteComponent() {
  const { mutateAsync: updateAuthUser, error: updateAuthUserError } = useUpdateAuthUser()
  const { mutateAsync: changePassword, error: changePasswordError } = useChangePassword()
  const { mutateAsync: uploadUserAvatar, error: uploadUserAvatarError } = useUploadUserAvatarToR2()
  const { data: authUser } = useSuspenseQuery(authOptions.authUser())
  const { name, image } = authUser || {}

  async function handleUserInfoSubmit(data: UserInfoFormValues) {
    if (data.avatarFile) {
      const avatarFile = await stripFileMetadata(data.avatarFile)
      const formData = new FormData()
      formData.append('avatar', avatarFile)
      await uploadUserAvatar({ data: formData })
        .then((url) =>
          updateAuthUser({
            name: data.name,
            image: url,
          }),
        )
        .catch(noop)
    }

    await updateAuthUser({
      name: data.name,
      image: data.avatarUrl || null,
    }).catch(noop)
  }

  async function handlePasswordSubmit(data: UserPasswordFormValues) {
    try {
      const result = await changePassword(data)
      return !!result?.user?.id
    } catch {
      return false
    }
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
        <UserInfoForm user={{ name, image }} onFormSubmit={handleUserInfoSubmit}>
          {uploadUserAvatarError ? (
            <AlertBox type="error">
              <ItemTitle>Failed to upload avatar</ItemTitle>
              <FieldError errors={[uploadUserAvatarError]} />
            </AlertBox>
          ) : null}

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
