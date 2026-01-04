import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

import { noop } from '@/shared/utils/noop'
import { authOptions } from '@/features/auth/options'
import { FieldSeparator } from '@/integrations/shadcn/components/ui/field'
import { useUpdateAuthUser } from '@/features/auth/hooks/useUpdateAuthUser'
import {
  UserAvatarField,
  UserNameField,
  UserPasswordField,
  UserProfile,
  UserProfileContent,
  UserSocialLinkField,
} from '@/features/users/components/UserProfile'

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

  async function handleUserNameFormSubmit(data: { name: string }) {
    await updateUser(data).catch(noop)
  }

  return (
    <UserProfile>
      <UserProfileContent>
        <UserAvatarField user={{ name, image }} />
        <FieldSeparator />
        <UserNameField user={{ name }} onFormSubmit={handleUserNameFormSubmit} />
        <FieldSeparator />
        <UserPasswordField />
        <FieldSeparator />
        <UserSocialLinkField />
      </UserProfileContent>
    </UserProfile>
  )
}
