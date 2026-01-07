import { useMutation } from '@tanstack/react-query'

import { usersKeys } from '@/features/users/keys'
import { deleteUserAvatarFromR2Fn } from '@/server/mutations/users'

export function useDeleteUserAvatarFromR2() {
  return useMutation({
    mutationKey: usersKeys.deleteUserAvatarFromR2,
    mutationFn: deleteUserAvatarFromR2Fn,
  })
}
