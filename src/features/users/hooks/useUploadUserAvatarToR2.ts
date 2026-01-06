import { useMutation } from '@tanstack/react-query'

import { usersKeys } from '@/features/users/keys'
import { uploadUserAvatarToR2Fn } from '@/server/mutations/users'

export function useUploadUserAvatarToR2() {
  return useMutation({
    mutationKey: usersKeys.uploadUserAvatarToR2,
    mutationFn: uploadUserAvatarToR2Fn,
  })
}
