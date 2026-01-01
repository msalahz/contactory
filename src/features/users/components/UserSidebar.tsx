import { Link } from '@tanstack/react-router'

import { ContactIcon, LayoutDashboardIcon } from 'lucide-react'
import { useTheme } from '@/shared/theme/useTheme'
import { cn } from '@/integrations/shadcn/lib/utils'
import { LogoIcon, LogoWord } from '@/shared/components/Logo'
import { ThemeToggleButton } from '@/shared/theme/ThemeToggleButton'
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
  SidebarTrigger,
} from '@/integrations/shadcn/components/ui/sidebar'

export function UserSidebarFooter({
  className,
  ...props
}: React.ComponentProps<typeof SidebarFooter>) {
  const { theme, setTheme } = useTheme()

  return (
    <SidebarFooter className={cn('mt-auto', className)} {...props}>
      <div className="flex items-start justify-start gap-1 group-data-[collapsible=icon]:flex-col">
        <ThemeToggleButton
          theme={theme}
          onChange={setTheme}
          className="fade-in-animate hidden size-8 group-data-[state=collapsed]:flex"
        />
        <SidebarTrigger className="hidden size-8 md:flex" variant="outline" />
        <ThemeToggleButton
          theme={theme}
          onChange={setTheme}
          className="fade-in-animate hidden size-8 group-data-[state=expanded]:flex"
        />
      </div>
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
