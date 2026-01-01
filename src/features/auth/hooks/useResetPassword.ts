import { useMutation } from '@tanstack/react-query'
import { authClient } from '@/integrations/better-auth/authClient'

export async function resetPassword(
  props: Pick<Parameters<typeof authClient.resetPassword>[0], 'newPassword' | 'token'>,
) {
  const { data, error } = await authClient.resetPassword(props)

  if (error) {
    throw new Error(error.message, { cause: error })
  }

  return data
}

export function useResetPassword() {
  return useMutation({
    mutationKey: ['reset-password'],
    mutationFn: resetPassword,
  })
}
