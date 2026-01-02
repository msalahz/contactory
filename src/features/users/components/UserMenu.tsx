import type { User } from '@/integrations/better-auth/authClient'

import { useIsMobile } from '@/integrations/shadcn/hooks/use-mobile'
import { getUserNameInitials } from '@/features/users/utils/helpers'
import { Avatar, AvatarFallback, AvatarImage } from '@/integrations/shadcn/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/integrations/shadcn/components/ui/dropdown-menu'

export function UserAvatar({ user }: { user: User }) {
  return (
    <Avatar className="h-8 w-8 rounded-lg">
      <AvatarImage src={user.image ? user.image : undefined} alt={user.name} />
      <AvatarFallback className="rounded-lg">{getUserNameInitials(user)}</AvatarFallback>
    </Avatar>
  )
}

export function UserProfile({ user }: { user: User }) {
  return (
    <>
      <UserAvatar user={user} />
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{user.name}</span>
        <span className="text-muted-foreground truncate text-xs">{user.email}</span>
      </div>
    </>
  )
}

export interface UserMenuContentProps extends React.ComponentProps<typeof DropdownMenuContent> {
  user: User
}

export function UserMenuContent({ user, ...props }: UserMenuContentProps) {
  const isMobile = useIsMobile()

  return (
    <DropdownMenuContent
      className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
      side={isMobile ? 'bottom' : 'right'}
      align="end"
      sideOffset={4}
      {...props}
    />
  )
}

export function UserMenuTrigger(props: React.ComponentProps<typeof DropdownMenuTrigger>) {
  return <DropdownMenuTrigger {...props} />
}

export interface UserMenuProps extends React.ComponentProps<typeof DropdownMenu> {
  user: User
}

export function UserMenu({ user, ...props }: UserMenuProps) {
  return <DropdownMenu modal={false} {...props} />
}
