import { authClient } from '@/integrations/better-auth/authClient'

export async function changePassword(props: Parameters<typeof authClient.changePassword>[0]) {
  const { data, error } = await authClient.changePassword(props)

  if (error) {
    throw new Error(error.message, { cause: error })
  }

  return data
}
