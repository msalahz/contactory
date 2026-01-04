import { useMutation } from '@tanstack/react-query'

import { authKeys } from '@/features/auth/keys'
import { signInSocial } from '@/features/auth/lib/signInSocial'

export function useSignInSocial() {
  return useMutation({
    mutationKey: authKeys.signInSocial,
    mutationFn: signInSocial,
  })
}
