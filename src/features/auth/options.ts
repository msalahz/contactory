import { mutationOptions, queryOptions } from '@tanstack/react-query'

import { authKeys } from '@/features/auth/keys'
import { findAuthUserFn } from '@/server/queries/auth'
import { updateAuthUser } from '@/features/auth/lib/updateAuthUser'

export const authOptions = {
  authUser() {
    return queryOptions({
      queryKey: authKeys.authUser,
      queryFn: () => findAuthUserFn(),
    })
  },
  updateAuthUser() {
    return mutationOptions({
      mutationKey: authKeys.updateAuthUser,
      mutationFn: updateAuthUser,
    })
  },
}
