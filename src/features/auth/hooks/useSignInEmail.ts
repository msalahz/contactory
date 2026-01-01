import { useMutation } from '@tanstack/react-query'
import { authClient } from '@/integrations/better-auth/authClient'

export async function signInEmail(
  props: Pick<
    Parameters<typeof authClient.signIn.email>[0],
    'email' | 'password' | 'rememberMe' | 'callbackURL'
  >,
) {
  const { data, error } = await authClient.signIn.email(props)

  if (error) {
    throw new Error(error.message, { cause: error })
  }

  return data
}

export function useSignInEmail() {
  return useMutation({
    mutationKey: ['sign-in-email'],
    mutationFn: signInEmail,
  })
}
