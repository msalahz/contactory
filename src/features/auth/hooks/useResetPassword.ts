import { useMutation } from '@tanstack/react-query'

import { authKeys } from '@/features/auth/keys'
import { resetPassword } from '@/features/auth/lib/resetPassword'

export function useResetPassword() {
  return useMutation({
    mutationKey: authKeys.resetPassword,
    mutationFn: resetPassword,
  })
}
