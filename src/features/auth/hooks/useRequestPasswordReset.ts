import { useMutation } from '@tanstack/react-query'

import { authKeys } from '@/features/auth/keys'
import { requestPasswordReset } from '@/features/auth/lib/requestPasswordReset'

export function useRequestPasswordReset() {
  return useMutation({
    mutationKey: authKeys.requestPasswordReset,
    mutationFn: requestPasswordReset,
  })
}
