import { Link, useRouterState } from '@tanstack/react-router'
import {
  AppWindowIcon,
  ContactRoundIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  MoonIcon,
  SunIcon,
} from 'lucide-react'

import { cn } from '@/features/abstractions/lib/utils'
import { useSignOut } from '@/features/users/hooks/use-sign-out'
import { useTheme } from '@/features/abstractions/components/reused/theme'
import { LogoIcon } from '@/features/abstractions/components/reused/logo-icon'
import { Spinner } from '@/features/abstractions/components/primitives/spinner'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/features/abstractions/components/primitives/sidebar'

export function ConsoleSidebar() {
  const routerState = useRouterState()
  const { theme, setTheme } = useTheme()
  const { signOut, isSigningOut } = useSignOut()

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg" tooltip="Contactory">
              <Link to="/">
                <LogoIcon /> <span className="font-bold">Contactory</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip="Dashboard"
                  isActive={routerState.matches.some((match) => match.routeId === '/console/')}
                >
                  <Link to="/">
                    <LayoutDashboardIcon />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip="Contacts"
                  isActive={routerState.matches.some(
                    (match) => match.routeId === '/console/contacts',
                  )}
                >
                  <Link to="/console/contacts">
                    <ContactRoundIcon /> <span>Contacts</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Site">
              <Link to="/">
                <AppWindowIcon />
                <span>Site</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Toggle Theme"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              <MoonIcon className={cn(theme === 'light' ? 'hidden' : 'block')} />
              <SunIcon className={cn(theme === 'dark' ? 'hidden' : 'block')} />
              <span>Toggle Theme</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => signOut()} tooltip="Sign Out">
              {isSigningOut ? <Spinner /> : <LogOutIcon />} <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
