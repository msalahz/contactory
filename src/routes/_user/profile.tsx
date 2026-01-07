import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import z from 'zod'
import type { UserInfoFormValues } from '@/features/users/components/UserInfoForm'
import type { UserPasswordFormValues } from '@/features/users/components/UserPasswordForm'

import { noop } from '@/shared/utils/noop'
import { authOptions } from '@/features/auth/options'
import { AlertBox } from '@/shared/components/AlertBox'
import { ItemTitle } from '@/integrations/shadcn/components/ui/item'
import { stripFileMetadata } from '@/shared/utils/stripFileMetadata'
import { FieldError } from '@/integrations/shadcn/components/ui/field'
import { UserInfoForm } from '@/features/users/components/UserInfoForm'
import { UserSocialForm } from '@/features/users/components/UserSocialForm'
import { useUpdateAuthUser } from '@/features/auth/hooks/useUpdateAuthUser'
import { useChangePassword } from '@/features/auth/hooks/useChangePassword'
import { UserPasswordForm } from '@/features/users/components/UserPasswordForm'
import { AnimatedGroup } from '@/integrations/shadcn/components/ui/animated-group'
import { useUploadUserAvatarToR2 } from '@/features/users/hooks/useUploadUserAvatarToR2'
import { UserProfile, UserProfileContent } from '@/features/users/components/UserProfile'
import { useDeleteUserAvatarFromR2 } from '@/features/users/hooks/userDeleteUserAvatarFromR2'

export const Route = createFileRoute('/_user/profile')({
  component: RouteComponent,
  async loader({ context }) {
    return context.queryClient.ensureQueryData(authOptions.authUser())
  },
})

function RouteComponent() {
  const { t } = useTranslation('users')
  const { mutateAsync: updateAuthUser, error: updateAuthUserError } = useUpdateAuthUser()
  const { mutateAsync: changePassword, error: changePasswordError } = useChangePassword()
  const { mutateAsync: uploadUserAvatar, error: uploadUserAvatarError } = useUploadUserAvatarToR2()
  const { mutateAsync: deleteUserAvatarFromR2, error: deleteUserAvatarFromR2Error } =
    useDeleteUserAvatarFromR2()
  const { data: authUser } = useSuspenseQuery(authOptions.authUser())
  const { name, image } = authUser || {}

  async function handleUserInfoSubmit(data: UserInfoFormValues) {
    if (data.avatarFile) {
      const avatarFile = await stripFileMetadata(data.avatarFile)
      const formData = new FormData()
      formData.append('avatar', avatarFile)
      await uploadUserAvatar({ data: formData })
        .then((url) => {
          return updateAuthUser({
            name: data.name,
            image: url,
          })
        })
        .catch(noop)
    } else {
      await updateAuthUser({
        name: data.name,
        image: data.avatarUrl || null,
      }).catch(noop)
    }
    // TODO: It will be a better user flow if the user can delete the avatar directly from the profile page without a need for form submission
    // delete old avatar if it exists
    const avatarUrl = z.url().safeParse(image).data
    if (avatarUrl) {
      await deleteUserAvatarFromR2({ data: { avatarUrl } }).catch(noop)
    }
  }

  async function handlePasswordSubmit(data: UserPasswordFormValues) {
    try {
      const result = await changePassword(data)
      return !!result?.user?.id
    } catch {
      return false
    }
  }

  function handleSocialConnect(provider: string) {
    // TODO: Implement social account connection
    console.log('Connect:', provider)
    return Promise.resolve()
  }

  function handleSocialDisconnect(provider: string) {
    // TODO: Implement social account disconnection
    console.log('Disconnect:', provider)
    return Promise.resolve()
  }

  return (
    <UserProfile>
      <UserProfileContent>
        <AnimatedGroup preset="blur" className="space-y-6">
          <UserInfoForm user={{ name, image }} onFormSubmit={handleUserInfoSubmit}>
            {deleteUserAvatarFromR2Error ? (
              <AlertBox type="error">
                <ItemTitle>{t('Failed to delete avatar')}</ItemTitle>
                <FieldError errors={[deleteUserAvatarFromR2Error]} />
              </AlertBox>
            ) : null}

            {uploadUserAvatarError ? (
              <AlertBox type="error">
                <ItemTitle>{t('Failed to upload avatar')}</ItemTitle>
                <FieldError errors={[uploadUserAvatarError]} />
              </AlertBox>
            ) : null}

            {updateAuthUserError ? (
              <AlertBox type="error">
                <ItemTitle>{t('Failed to update profile')}</ItemTitle>
                <FieldError errors={[updateAuthUserError]} />
              </AlertBox>
            ) : null}
          </UserInfoForm>

          <UserPasswordForm onFormSubmit={handlePasswordSubmit}>
            {changePasswordError ? (
              <AlertBox type="error">
                <ItemTitle>{t('Failed to change password')}</ItemTitle>
                <FieldError errors={[changePasswordError]} />
              </AlertBox>
            ) : null}
          </UserPasswordForm>

          <UserSocialForm
            connectedAccounts={[]}
            onConnect={handleSocialConnect}
            onDisconnect={handleSocialDisconnect}
          />
        </AnimatedGroup>
      </UserProfileContent>
    </UserProfile>
  )
}
