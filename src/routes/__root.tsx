import { TanStackDevtools } from '@tanstack/react-devtools'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { HeadContent, Scripts, createRootRouteWithContext } from '@tanstack/react-router'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import appCss from '../styles.css?url'

import type { Theme } from '@/server/schemas/theme'
import type { QueryClient } from '@tanstack/react-query'
import type { Session, User } from '@/integrations/better-auth/authClient'

import { useTheme } from '@/shared/theme/useTheme'
import { cn } from '@/integrations/shadcn/lib/utils'
import { NotFound } from '@/shared/components/NotFound'
import { ThemeProvider } from '@/shared/theme/themeContext'
import { findThemeCookieFn } from '@/server/queries/findThemeCookieFn'

interface MyRouterContext {
  user: User | null
  session: Session | null
  serverTheme: Theme | null
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
  async beforeLoad() {
    const serverTheme = await findThemeCookieFn()
    return { serverTheme }
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
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const { serverTheme } = Route.useRouteContext()

  return (
    <ThemeProvider initialTheme={serverTheme || 'light'}>
      <RootDocumentContent>{children}</RootDocumentContent>
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
      <body suppressHydrationWarning className={cn(theme)}>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
