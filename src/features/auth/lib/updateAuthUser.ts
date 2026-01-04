import { authClient } from '@/integrations/better-auth/authClient'

export async function updateAuthUser(props: Parameters<typeof authClient.updateUser>[0]) {
  const { data, error } = await authClient.updateUser(props)

  if (error) {
    throw new Error(error.message, { cause: error })
  }

  return data
}
