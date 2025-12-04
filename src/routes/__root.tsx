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

import { cn } from '@/features/abstractions/lib/utils'
import { Header } from '@/features/abstractions/components/reused/header'
import { Footer } from '@/features/abstractions/components/reused/footer'
import { useTheme } from '@/features/abstractions/components/reused/theme'
import { Toaster } from '@/features/abstractions/components/primitives/sonner'
import { NotFound } from '@/features/abstractions/components/reused/not-found'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Contacts App' },
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
          <Header.Logo />
          <Header.Actions />
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
