import { useServerFn } from '@tanstack/react-start'
import { useMutation } from '@tanstack/react-query'

import { signOutFn } from '@/features/users/server/functions'

export function useSignOut() {
  const serverSignOut = useServerFn(signOutFn)
  const { mutate: signOut, isPending: isSigningOut } = useMutation({
    mutationKey: ['signing-out'],
    mutationFn: () => serverSignOut(),
  })

  return { signOut, isSigningOut }
}
