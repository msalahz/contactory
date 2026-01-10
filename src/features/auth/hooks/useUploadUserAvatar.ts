import { useMutation } from '@tanstack/react-query'

import { authKeys } from '@/features/auth/keys'
import { uploadUserAvatarFn } from '@/backend/mutations/auth'

export function useUploadUserAvatar() {
  return useMutation({
    mutationKey: authKeys.uploadUserAvatar,
    mutationFn: uploadUserAvatarFn,
  })
}
