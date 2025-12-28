import { useMutation } from '@tanstack/react-query'
import { authClient } from '@/integrations/better-auth/authClient'

export async function signUpEmail(
  props: Pick<
    Parameters<typeof authClient.signUp.email>[0],
    'name' | 'email' | 'password' | 'callbackURL'
  >,
) {
  const { data, error } = await authClient.signUp.email(props)

  if (error) {
    throw new Error(error.message, { cause: error })
  }

  return data
}

export function useSignUpEmail() {
  return useMutation({
    mutationKey: ['sign-up-email'],
    mutationFn: signUpEmail,
  })
}
