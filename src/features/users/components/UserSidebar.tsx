import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import {
  ChevronsLeftRightIcon,
  ContactIcon,
  EllipsisVerticalIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  UserCircleIcon,
} from 'lucide-react'

import type { User } from '@/integrations/better-auth/authClient'

import type { Language } from '@/server/schemas/shared'
import { useTheme } from '@/shared/theme/useTheme'
import { cn } from '@/integrations/shadcn/lib/utils'
import { ThemeToggleIcon } from '@/shared/theme/ThemeToggle'
import { useSignOut } from '@/features/auth/hooks/useSignOut'
import { LogoIcon, LogoWord } from '@/shared/components/Logo'
import { Spinner } from '@/integrations/shadcn/components/ui/spinner'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/integrations/shadcn/components/ui/tooltip'
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
import { LanguageToggleIcon } from '@/integrations/i18n/LanguageToggle'

export interface UserSidebarProps extends React.ComponentProps<typeof SidebarFooter> {
  user: User | null
}

export function UserSidebarFooter({ user, className, ...props }: UserSidebarProps) {
  const { t, i18n } = useTranslation('users')
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
              <EllipsisVerticalIcon className="ms-auto size-4" />
            </SidebarMenuButton>
          </UserMenuTrigger>

          <UserMenuContent user={user}>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-start text-sm">
                <UserProfile user={user} />
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link to="/profile">
                  <UserCircleIcon />
                  {t('Profile')}
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
                {t('Toggle Theme')}
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en')
                }}
              >
                <LanguageToggleIcon language={i18n.language as Language} />
                {t('Toggle Language')}
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
              {t('Log out')}
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
  const { t } = useTranslation('users')

  return (
    <SidebarContent className={cn('', className)} {...props}>
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={t('Dashboard')}>
              <Link to="/dashboard">
                <LayoutDashboardIcon />
                <span>{t('Dashboard')}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>{t('Contacts')}</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={t('Contact list')}>
              <Link to="/contacts">
                <ContactIcon />
                <span>{t('Contact list')}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  )
}

export function UserSidebarHeader({
  children,
  className,
  ...props
}: React.ComponentProps<typeof SidebarHeader>) {
  return (
    <SidebarHeader className={cn('flex items-start justify-start', className)} {...props}>
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
  return (
    <Sidebar
      className={cn('border-none p-2', className)}
      variant="sidebar"
      collapsible="icon"
      {...props}
    >
      {children}
    </Sidebar>
  )
}

export function UserSidebarGrip({ className, ...props }: React.ComponentProps<'button'>) {
  const { t } = useTranslation('users')
  const { toggleSidebar } = useSidebar()
  return (
    <button
      className="text-secondary-foreground z-50 -ms-2 transform cursor-pointer"
      onClick={toggleSidebar}
      {...props}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <ChevronsLeftRightIcon className="size-4" />
        </TooltipTrigger>
        <TooltipContent className="z-50">{t('Toggle Sidebar')}</TooltipContent>
      </Tooltip>
    </button>
  )
}
