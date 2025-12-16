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
  CollapsibleTrigger,
} from '@/features/abstractions/components/primitives/collapsible'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
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
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Contacts">
                      <ContactRoundIcon /> <span>Contacts</span>
                      <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

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

export function ConsoleInset({ children, className, ...props }: React.ComponentProps<'section'>) {
  return (
    <SidebarInset>
      <section data-slot="console-inset" className={cn('', className)} {...props}>
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
        'flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12',
        className,
      )}
      {...props}
    >
      <div className="flex w-full items-start gap-1 px-3 lg:gap-2 lg:px-4">
        <div>
          <SidebarTrigger />
        </div>

        <div className="flex flex-1">{children}</div>
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
      className={cn('flex-1 gap-1 overflow-auto p-2 lg:p-3', className)}
      {...props}
    >
      {children}
    </main>
  )
}
