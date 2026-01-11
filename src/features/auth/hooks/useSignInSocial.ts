import { useMutation } from '@tanstack/react-query'

import { authKeys } from '@/features/auth/keys'
import { authClient } from '@/integrations/better-auth/authClient'

export function useSignInSocial() {
  return useMutation({
    mutationKey: authKeys.signInSocial,
    mutationFn: (props: Parameters<typeof authClient.signIn.social>[0]) =>
      authClient.signIn.social(props),
  })
}
