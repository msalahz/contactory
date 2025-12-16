import { Link, useRouterState } from '@tanstack/react-router'
import {
  AppWindowIcon,
  ChevronRightIcon,
  ContactRoundIcon,
  LogOutIcon,
  MoonIcon,
  PlusIcon,
  SearchIcon,
  SquareTerminalIcon,
  SunIcon,
} from 'lucide-react'

import { cn } from '@/features/abstractions/lib/utils'
import { useSignOut } from '@/features/users/hooks/use-sign-out'
import { LogoIcon } from '@/features/abstractions/components/reused/logo'
import { useTheme } from '@/features/abstractions/components/reused/theme'
import { Spinner } from '@/features/abstractions/components/primitives/spinner'
import {
  Collapsible,
  CollapsibleContent,
} from '@/features/abstractions/components/primitives/collapsible'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/features/abstractions/components/primitives/sidebar'

export function Console({ children, className, ...props }: React.ComponentProps<'section'>) {
  return (
    <section data-slot="console" className={cn('overflow-hidden', className)} {...props}>
      <SidebarProvider defaultOpen>{children}</SidebarProvider>
    </section>
  )
}

export function ConsoleSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const routerState = useRouterState()
  const { theme, setTheme } = useTheme()
  const { signOut, isSigningOut } = useSignOut()

  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
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
          <SidebarGroupLabel>Console</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip="Console"
                  isActive={routerState.matches.some((match) => match.routeId === '/console/')}
                >
                  <Link to="/console">
                    <SquareTerminalIcon />
                    <span>Console</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <Collapsible asChild defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    tooltip="Contacts"
                    isActive={routerState.matches.some((match) =>
                      match.routeId.startsWith('/console/contacts/'),
                    )}
                  >
                    <Link to="/console/contacts">
                      <ContactRoundIcon /> <span>Contacts</span>
                    </Link>
                  </SidebarMenuButton>

                  <SidebarMenuAction>
                    <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuAction>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={routerState.matches.some(
                            (match) => match.routeId === '/console/contacts/',
                          )}
                        >
                          <Link to="/console/contacts">
                            <SearchIcon /> <span>Search</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>

                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={routerState.matches.some(
                            (match) => match.routeId === '/console/contacts/new',
                          )}
                        >
                          <Link to="/console/contacts/new">
                            <PlusIcon /> <span>New Contact</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel>Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Go to Site">
                  <Link to="/">
                    <AppWindowIcon />
                    <span>Go to Site</span>
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
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export function ConsoleInset({ children, className, ...props }: React.ComponentProps<'section'>) {
  return (
    <SidebarInset>
      <section data-slot="console-inset" className={cn('flex grow flex-col', className)} {...props}>
        {children}
      </section>
    </SidebarInset>
  )
}

export function ConsoleInsetHeader({
  children,
  className,
  ...props
}: React.ComponentProps<'header'>) {
  return (
    <header
      data-slot="console-inset-header"
      className={cn(
        'flex h-12 items-center justify-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12',
        className,
      )}
      {...props}
    >
      <div className="flex grow items-start gap-1 px-2 lg:gap-2 lg:px-3">
        <div className="flex h-8 items-center">
          <SidebarTrigger />
        </div>

        <div className="flex grow">{children}</div>
      </div>
    </header>
  )
}

export function ConsoleInsetContent({
  children,
  className,
  ...props
}: React.ComponentProps<'main'>) {
  return (
    <main
      data-slot="console-inset-content"
      className={cn('flex grow overflow-auto p-2 lg:p-3', className)}
      {...props}
    >
      {children}
    </main>
  )
}
