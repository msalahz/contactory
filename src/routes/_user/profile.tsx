import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import z from 'zod'
import type { UserInfoFormValues } from '@/features/auth/components/UserInfoForm'
import type { UserPasswordFormValues } from '@/features/auth/components/UserPasswordForm'
import { UserInfoForm } from '@/features/auth/components/UserInfoForm'

import { noop } from '@/shared/utils/noop'
import { authOptions } from '@/features/auth/options'
import { AlertBox } from '@/shared/components/AlertBox'
import { ItemTitle } from '@/integrations/shadcn/components/ui/item'
import { stripFileMetadata } from '@/shared/utils/stripFileMetadata'
import { FieldError } from '@/integrations/shadcn/components/ui/field'
import { UserSocialForm } from '@/features/auth/components/UserSocialForm'
import { useUpdateAuthUser } from '@/features/auth/hooks/useUpdateAuthUser'
import { useChangePassword } from '@/features/auth/hooks/useChangePassword'
import { UserPasswordForm } from '@/features/auth/components/UserPasswordForm'
import { useUploadUserAvatar } from '@/features/auth/hooks/useUploadUserAvatar'
import { useDeleteUserAvatar } from '@/features/auth/hooks/userDeleteUserAvatar'
import { AnimatedGroup } from '@/integrations/shadcn/components/ui/animated-group'
import { UserProfile, UserProfileContent } from '@/features/auth/components/UserProfile'

export const Route = createFileRoute('/_user/profile')({
  component: RouteComponent,
  async loader({ context }) {
    return context.queryClient.ensureQueryData(authOptions.authUser())
  },
})

function RouteComponent() {
  const { t } = useTranslation('auth')
  const { mutateAsync: updateAuthUser, error: updateAuthUserError } = useUpdateAuthUser()
  const {
    mutateAsync: changePassword,
    error: changePasswordError,
    isSuccess: changePasswordSuccess,
  } = useChangePassword()
  const { mutateAsync: uploadUserAvatar, error: uploadUserAvatarError } = useUploadUserAvatar()
  const { mutateAsync: deleteUserAvatar, error: deleteUserAvatarError } = useDeleteUserAvatar()
  const { data: authUser } = useSuspenseQuery(authOptions.authUser())
  const { name, image } = authUser || {}

  async function handleUserInfoSubmit(data: UserInfoFormValues) {
    const oldAvatarUrl = image && z.url().safeParse(image).data ? image : null

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
    if (oldAvatarUrl) {
      deleteUserAvatar({ data: { avatarUrl: oldAvatarUrl } }).catch(noop)
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
            {deleteUserAvatarError ? (
              <AlertBox type="error">
                <ItemTitle>{t('Failed to delete avatar')}</ItemTitle>
                <FieldError errors={[deleteUserAvatarError]} />
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

            {changePasswordSuccess ? (
              <AlertBox type="success">
                <ItemTitle>{t('Password updated successfully')}</ItemTitle>
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
