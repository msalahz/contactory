import { useMutation } from '@tanstack/react-query'

import { authKeys } from '@/features/auth/keys'
import { signUpEmail } from '@/features/auth/lib/signUpEmail'

export function useSignUpEmail() {
  return useMutation({
    mutationKey: authKeys.signUpEmail,
    mutationFn: signUpEmail,
  })
}
