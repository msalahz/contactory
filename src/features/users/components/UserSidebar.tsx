import { Link } from '@tanstack/react-router'
import {
  ContactIcon,
  EllipsisVerticalIcon,
  GripVerticalIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  UserCircleIcon,
} from 'lucide-react'

import type { User } from '@/integrations/better-auth/authClient'

import { cn } from '@/integrations/shadcn/lib/utils'
import { useTheme } from '@/shared/theme/useTheme'
import { ThemeToggleIcon } from '@/shared/theme/ThemeToggle'
import { useSignOut } from '@/features/auth/hooks/useSignOut'
import { LogoIcon, LogoWord } from '@/shared/components/Logo'
import { Spinner } from '@/integrations/shadcn/components/ui/spinner'
import {
  UserMenu,
  UserMenuContent,
  UserMenuTrigger,
  UserProfile,
} from '@/features/users/components/UserMenu'
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/integrations/shadcn/components/ui/dropdown-menu'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/integrations/shadcn/components/ui/sidebar'

export interface UserSidebarProps extends React.ComponentProps<typeof SidebarFooter> {
  user?: User
}

export function UserSidebarFooter({ user, className, ...props }: UserSidebarProps) {
  const { theme, setTheme } = useTheme()
  const { signOut, isSigningOut } = useSignOut()
  return (
    <SidebarFooter className={cn('mt-auto', className)} {...props}>
      {user ? (
        <UserMenu user={user}>
          <UserMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <UserProfile user={user} />
              <EllipsisVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </UserMenuTrigger>

          <UserMenuContent user={user}>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <UserProfile user={user} />
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link to="/profile">
                  <UserCircleIcon />
                  Profile
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setTheme(theme === 'light' ? 'dark' : 'light')
                }}
              >
                <ThemeToggleIcon theme={theme} />
                Toggle Theme
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                signOut({})
              }}
            >
              {isSigningOut ? <Spinner /> : <LogOutIcon />}
              Log out
            </DropdownMenuItem>
          </UserMenuContent>
        </UserMenu>
      ) : null}
    </SidebarFooter>
  )
}

export function UserSidebarContent({
  className,
  ...props
}: React.ComponentProps<typeof SidebarContent>) {
  return (
    <SidebarContent className={cn('', className)} {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Dashboard">
                <Link to="/dashboard">
                  <LayoutDashboardIcon />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Contacts</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Contact list">
                <Link to="/contacts">
                  <ContactIcon />
                  <span>Contact list</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </SidebarContent>
  )
}

export function UserSidebarHeader({
  children,
  className,
  ...props
}: React.ComponentProps<typeof SidebarHeader>) {
  return (
    <SidebarHeader className={cn('', className)} {...props}>
      <div className="flex items-center justify-start gap-1 group-data-[collapsible=icon]:flex-col">
        <Link to="/" className="flex items-center gap-2">
          <LogoIcon className="size-8" />
          <LogoWord className="fade-in-animate text-2xl group-data-[collapsible=icon]:hidden" />
        </Link>
      </div>
    </SidebarHeader>
  )
}

export function UserSidebar({
  children,
  className,
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { toggleSidebar } = useSidebar()
  return (
    <Sidebar
      className={cn('relative border-none p-2', className)}
      variant="sidebar"
      collapsible="icon"
      {...props}
    >
      <button
        className="text-secondary-foreground absolute -end-1.25 top-1/2 -translate-y-1/2 transform cursor-pointer"
        onClick={toggleSidebar}
      >
        <GripVerticalIcon className="size-4" />
      </button>
      {children}
    </Sidebar>
  )
}
