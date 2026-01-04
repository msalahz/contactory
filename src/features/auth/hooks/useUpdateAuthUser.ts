import { useMutation, useQueryClient } from '@tanstack/react-query'

import { authKeys } from '@/features/auth/keys'
import { authOptions } from '@/features/auth/options'
import { updateAuthUser } from '@/features/auth/lib/updateAuthUser'

export function useUpdateAuthUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: authKeys.updateAuthUser,
    mutationFn: updateAuthUser,
    onSettled() {
      return queryClient.invalidateQueries(authOptions.authUser())
    },
  })
}
