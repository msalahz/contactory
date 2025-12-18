import { TanStackDevtools } from '@tanstack/react-devtools'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { HeadContent, Scripts, createRootRouteWithContext } from '@tanstack/react-router'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'

import type { Session } from '@/integrations/better-auth/auth-client'
import type { Theme } from '@/features/abstractions/components/reused/theme'
import {
  ThemeProvider,
  getThemeCookieFn,
  useTheme,
} from '@/features/abstractions/components/reused/theme'

import { cn } from '@/features/abstractions/lib/utils'
import { findSessionFn } from '@/features/users/server/functions'
import { Toaster } from '@/features/abstractions/components/primitives/sonner'
import { NotFound } from '@/features/abstractions/components/reused/not-found'

interface MyRouterContext {
  queryClient: QueryClient
  session: Session | null
  theme?: Theme
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async () => {
    const theme = await getThemeCookieFn()
    const session = await findSessionFn()
    return {
      theme,
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
      { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      { rel: 'manifest', href: '/manifest.json' },
    ],
  }),
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const { theme: hydratedTheme = 'light' } = Route.useRouteContext()

  return (
    <ThemeProvider initialTheme={hydratedTheme}>
      <RootDocumentContent>{children}</RootDocumentContent>
      <Toaster closeButton richColors theme="light" />
      <TanStackDevtools
        config={{ position: 'bottom-right' }}
        plugins={[
          { name: 'Tanstack Router', render: <TanStackRouterDevtoolsPanel /> },
          TanStackQueryDevtools,
        ]}
      />
    </ThemeProvider>
  )
}

function RootDocumentContent({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()

  return (
    <html lang="en">
      <head>
        <meta rel="icon" />
        <HeadContent />
      </head>
      <body suppressHydrationWarning className={cn(theme === 'dark' ? 'dark' : '')}>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
