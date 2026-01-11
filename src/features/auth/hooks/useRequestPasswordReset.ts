import { useMutation } from '@tanstack/react-query'

import { authKeys } from '@/features/auth/keys'
import { authClient } from '@/integrations/better-auth/authClient'

export function useRequestPasswordReset() {
  return useMutation({
    mutationKey: authKeys.requestPasswordReset,
    mutationFn: (props: Parameters<typeof authClient.requestPasswordReset>[0]) =>
      authClient.requestPasswordReset(props),
  })
}
