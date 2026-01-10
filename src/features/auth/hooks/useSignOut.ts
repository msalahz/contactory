import { useServerFn } from '@tanstack/react-start'
import { useMutation } from '@tanstack/react-query'

import { authKeys } from '@/features/auth/keys'
import { signOutFn } from '@/backend/mutations/auth'

export function useSignOut() {
  const serverSignOut = useServerFn(signOutFn)
  const { mutate: signOut, isPending: isSigningOut } = useMutation({
    mutationKey: authKeys.signOut,
    mutationFn: serverSignOut,
  })
  return { signOut, isSigningOut }
}
