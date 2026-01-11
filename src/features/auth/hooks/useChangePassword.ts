import { useMutation } from '@tanstack/react-query'

import { authKeys } from '@/features/auth/keys'
import { authClient } from '@/integrations/better-auth/authClient'

export function useChangePassword() {
  return useMutation({
    mutationKey: authKeys.changePassword,
    mutationFn: (props: Parameters<typeof authClient.changePassword>[0]) =>
      authClient.changePassword(props),
  })
}
