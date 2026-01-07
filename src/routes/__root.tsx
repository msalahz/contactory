import { TanStackDevtools } from '@tanstack/react-devtools'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { HeadContent, Scripts, createRootRouteWithContext } from '@tanstack/react-router'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import appCss from '../styles.css?url'

import type { Theme } from '@/server/schemas/theme'
import type { QueryClient } from '@tanstack/react-query'
import type { User } from '@/integrations/better-auth/authClient'

import { useTheme } from '@/shared/theme/useTheme'
import { cn } from '@/integrations/shadcn/lib/utils'
import { NotFound } from '@/shared/components/NotFound'
import { ThemeProvider } from '@/shared/theme/ThemeContext'
import { getInitialPreferencesFn } from '@/server/queries/global'

interface MyRouterContext {
  authUser: User | null
  queryClient: QueryClient
  initialTheme: Theme | null
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
  async beforeLoad() {
    const { initialTheme } = await getInitialPreferencesFn()
    return { initialTheme }
  },
  preloadGcTime: 1000 * 60 * 60, // 60 minutes
  preloadStaleTime: 1000 * 60 * 60, // 60 minutes,
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
  const { initialTheme } = Route.useRouteContext()
  return (
    <ThemeProvider initialTheme={initialTheme}>
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
    <html lang="en" dir="ltr">
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
