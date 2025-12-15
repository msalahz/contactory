import { Link } from '@tanstack/react-router'
import {
  ContactRoundIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  MoonIcon,
  PlusIcon,
  SunIcon,
} from 'lucide-react'

import { cn } from '@/features/abstractions/lib/utils'
import { useSignOut } from '@/features/users/hooks/use-sign-out'
import { useTheme } from '@/features/abstractions/components/reused/theme'
import { Spinner } from '@/features/abstractions/components/primitives/spinner'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/features/abstractions/components/primitives/sidebar'

export function ConsoleSidebar() {
  const { theme, setTheme } = useTheme()
  const { signOut, isSigningOut } = useSignOut()

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu className="flex flex-col gap-2">
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Dashboard">
                  <Link to="/console">
                    <LayoutDashboardIcon /> <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Contacts">
                  <Link to="/console/contacts">
                    <ContactRoundIcon /> <span>Contacts</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuAction title="Add Contact" asChild>
                  <Link to="/console/contacts/new">
                    <PlusIcon />
                  </Link>
                </SidebarMenuAction>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Toogle Theme"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              <MoonIcon className={cn(theme === 'light' ? 'hidden' : 'block')} />
              <SunIcon className={cn(theme === 'dark' ? 'hidden' : 'block')} />
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
