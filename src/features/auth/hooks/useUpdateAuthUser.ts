import { useMutation, useQueryClient } from '@tanstack/react-query'

import { authOptions } from '@/features/auth/options'

export function useUpdateAuthUser() {
  const queryClient = useQueryClient()
  return useMutation({
    ...authOptions.updateAuthUser(),
    onSettled() {
      return queryClient.invalidateQueries(authOptions.authUser())
    },
  })
}
