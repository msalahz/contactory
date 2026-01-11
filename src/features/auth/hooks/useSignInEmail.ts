import { useMutation } from '@tanstack/react-query'

import { authKeys } from '@/features/auth/keys'
import { authClient } from '@/integrations/better-auth/authClient'

export function useSignInEmail() {
  return useMutation({
    mutationKey: authKeys.signInEmail,
    mutationFn: (props: Parameters<typeof authClient.signIn.email>[0]) =>
      authClient.signIn.email(props),
  })
}
