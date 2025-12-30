import { useServerFn } from '@tanstack/react-start'
import { useMutation } from '@tanstack/react-query'

import { signOutFn } from '@/server/mutations/users'

export function useSignOut() {
  const serverSignOut = useServerFn(signOutFn)
  const { mutate: signOut, isPending: isSigningOut } = useMutation({
    mutationKey: ['sign-out'],
    mutationFn: serverSignOut,
  })
  return { signOut, isSigningOut }
}
