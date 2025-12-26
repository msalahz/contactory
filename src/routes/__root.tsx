import { TanStackDevtools } from '@tanstack/react-devtools'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { HeadContent, Scripts, createRootRouteWithContext } from '@tanstack/react-router'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import appCss from '../styles.css?url'

import type { Theme } from '@/shared/theme/schemas'
import type { QueryClient } from '@tanstack/react-query'
import type { Session, User } from '@/integrations/better-auth/authClient'

import { cn } from '@/integrations/shadcn/lib/utils'
import { useTheme } from '@/shared/theme/useTheme'
import { ThemeProvider } from '@/shared/theme/providers'
import { NotFound } from '@/shared/components/NotFound'

interface MyRouterContext {
  user: User | null
  theme: Theme | null
  session: Session | null
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
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
  return (
    <ThemeProvider initialTheme={'dark'}>
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
    <html lang="en" className="scroll-smooth">
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
