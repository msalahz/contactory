import { useMutation } from '@tanstack/react-query'
import { authClient } from '@/integrations/better-auth/authClient'

export async function signInSocial(props: Parameters<typeof authClient.signIn.social>[0]) {
  const { data, error } = await authClient.signIn.social(props)

  if (error) {
    throw new Error(error.message, { cause: error })
  }

  return data
}

export function useSignInSocial() {
  return useMutation({
    mutationKey: ['sign-in-social'],
    mutationFn: signInSocial,
  })
}
