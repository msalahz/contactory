import { TanStackDevtools } from '@tanstack/react-devtools'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'

import type { Session } from '@/integrations/better-auth/auth-client'
import { cn } from '@/features/abstractions/lib/utils'
import { findSessionFn } from '@/features/users/functions/find-session-fn'
import { Footer } from '@/features/abstractions/components/reused/footer'
import { useTheme } from '@/features/abstractions/components/reused/theme'
import { Toaster } from '@/features/abstractions/components/primitives/sonner'
import { NotFound } from '@/features/abstractions/components/reused/not-found'
import {
  Header,
  HeaderActions,
  HeaderLogo,
  HeaderSignOutButton,
} from '@/features/abstractions/components/reused/header'

interface MyRouterContext {
  queryClient: QueryClient
  session: Session | null
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async () => {
    const session = await findSessionFn()
    return {
      session,
    }
  },
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { title: 'Contacts App' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
    ],
  }),
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const theme = useTheme()
  const context = Route.useRouteContext()

  return (
    <html lang="en">
      <head>
        <meta rel="icon" />
        <HeadContent />
      </head>
      <body
        suppressHydrationWarning
        className={cn(
          'bg-background text-foreground grid h-screen grid-rows-[auto_1fr_auto] overflow-hidden',
          theme === 'dark' ? 'dark' : '',
        )}
      >
        <Header className="h-15">
          <HeaderLogo />
          <HeaderActions session={context.session}>
            <HeaderSignOutButton />
          </HeaderActions>
        </Header>

        <main className="overflow-auto">{children}</main>

        <Footer>
          <Footer.Copyrights />
        </Footer>

        <Toaster closeButton richColors theme="light" />

        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
