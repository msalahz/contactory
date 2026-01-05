import { useMutation } from '@tanstack/react-query'
import { changePassword } from '@/features/auth/lib/changePassword'

import { authKeys } from '@/features/auth/keys'

export function useChangePassword() {
  return useMutation({
    mutationKey: authKeys.changePassword,
    mutationFn: changePassword,
  })
}
