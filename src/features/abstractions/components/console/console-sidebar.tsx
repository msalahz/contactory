import { Link } from '@tanstack/react-router'
import { ContactRoundIcon, LayoutDashboardIcon, LogOutIcon, PlusIcon } from 'lucide-react'

import { useSignOut } from '@/features/users/hooks/use-sign-out'
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
            <SidebarMenuButton onClick={() => signOut()} tooltip="Sign Out">
              {isSigningOut ? <Spinner /> : <LogOutIcon />} <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
