import { useMutation } from '@tanstack/react-query'

import { authKeys } from '@/features/auth/keys'
import { signInEmail } from '@/features/auth/lib/signInEmail'

export function useSignInEmail() {
  return useMutation({
    mutationKey: authKeys.signInEmail,
    mutationFn: signInEmail,
  })
}
