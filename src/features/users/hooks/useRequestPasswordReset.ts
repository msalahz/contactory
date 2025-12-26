import { useMutation } from '@tanstack/react-query'
import { authClient } from '@/integrations/better-auth/authClient'

export async function requestPasswordReset(
  props: Pick<Parameters<typeof authClient.requestPasswordReset>[0], 'email' | 'redirectTo'>,
) {
  const { data, error } = await authClient.requestPasswordReset(props)

  if (error) {
    throw new Error(error.message, { cause: error })
  }

  return data
}

export function useRequestPasswordReset() {
  return useMutation({
    mutationKey: ['request-password-reset'],
    mutationFn: requestPasswordReset,
  })
}
