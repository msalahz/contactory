import { useMutation } from '@tanstack/react-query'

import { authKeys } from '@/features/auth/keys'
import { authClient } from '@/integrations/better-auth/authClient'

export function useResetPassword() {
  return useMutation({
    mutationKey: authKeys.resetPassword,
    mutationFn: (props: Parameters<typeof authClient.resetPassword>[0]) =>
      authClient.resetPassword(props),
  })
}
