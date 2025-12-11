import { Link } from '@tanstack/react-router'
import { BookUserIcon, HomeIcon, LogOutIcon, PlusIcon, PresentationIcon } from 'lucide-react'

import { useSignOut } from '@/features/users/hooks/use-sign-out'
import { Spinner } from '@/features/abstractions/components/primitives/spinner'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/features/abstractions/components/primitives/sidebar'
import { LiliLogo } from '@/features/abstractions/components/reused/lili-logo'

export function ConsoleSidebar() {
  const { signOut, isSigningOut } = useSignOut()
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="p-[0.460rem]">
        <SidebarMenu>
          <SidebarMenuItem>
            <LiliLogo />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent className="my-2">
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu className="flex flex-col gap-2">
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Dashboard">
                  <Link to="/console">
                    <HomeIcon /> <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Contact Book">
                  <Link to="/console/contacts">
                    <BookUserIcon /> <span>Contact Book</span>
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
            <SidebarMenuButton asChild tooltip="Landing Page">
              <Link to="/">
                <PresentationIcon /> <span>Landing Page</span>
              </Link>
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
