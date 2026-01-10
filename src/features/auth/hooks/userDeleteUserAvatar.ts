import { useMutation } from '@tanstack/react-query'

import { authKeys } from '@/features/auth/keys'
import { deleteUserAvatarFn } from '@/backend/mutations/auth'

export function useDeleteUserAvatar() {
  return useMutation({
    mutationKey: authKeys.deleteUserAvatar,
    mutationFn: deleteUserAvatarFn,
  })
}
