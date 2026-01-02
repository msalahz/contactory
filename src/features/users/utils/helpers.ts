import type { User } from '@/integrations/better-auth/authClient'

export function getUserNameInitials(user: User) {
  return user.name
    .split(' ')
    .map((name: string) => name[0])
    .join('')
}
