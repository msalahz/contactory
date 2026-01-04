import { queryOptions } from '@tanstack/react-query'

import { authKeys } from '@/features/auth/keys'
import { findAuthUserFn } from '@/server/queries/auth'

export const authOptions = {
  authUser() {
    return queryOptions({
      queryKey: authKeys.authUser,
      queryFn: () => findAuthUserFn(),
    })
  },
}
