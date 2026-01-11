import { useMutation, useQueryClient } from '@tanstack/react-query'

import { authKeys } from '@/features/auth/keys'
import { authOptions } from '@/features/auth/options'
import { authClient } from '@/integrations/better-auth/authClient'

export function useUpdateAuthUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: authKeys.updateAuthUser,
    mutationFn: (props: Parameters<typeof authClient.updateUser>[0]) =>
      authClient.updateUser(props),
    onSettled() {
      return queryClient.invalidateQueries(authOptions.authUser())
    },
  })
}
