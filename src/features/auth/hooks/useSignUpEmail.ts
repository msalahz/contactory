import { useMutation } from '@tanstack/react-query'

import { authKeys } from '@/features/auth/keys'
import { authClient } from '@/integrations/better-auth/authClient'

export function useSignUpEmail() {
  return useMutation({
    mutationKey: authKeys.signUpEmail,
    mutationFn: (props: Parameters<typeof authClient.signUp.email>[0]) =>
      authClient.signUp.email(props),
  })
}
