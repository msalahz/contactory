import { TanStackDevtools } from '@tanstack/react-devtools'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { HeadContent, Scripts, createRootRouteWithContext } from '@tanstack/react-router'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import appCss from '../styles.css?url'

import type { i18n } from 'i18next'
import type { QueryClient } from '@tanstack/react-query'
import type { Language, Theme } from '@/server/schemas/shared'
import type { User } from '@/integrations/better-auth/authClient'

import { useTheme } from '@/shared/theme/useTheme'
import { cn } from '@/integrations/shadcn/lib/utils'
import { NotFound } from '@/shared/components/NotFound'
import { defaultNS } from '@/integrations/i18n/resources'
import { ThemeProvider } from '@/shared/theme/ThemeContext'
import { I18nProvider } from '@/integrations/i18n/rootProvider'
import { getInitialPreferencesFn } from '@/server/queries/shared'

interface MyRouterContext {
  i18n: i18n
  queryClient: QueryClient
  authUser: User | null
  initialTheme: Theme | null
  initialLanguage: Language | null
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
  async beforeLoad() {
    const { initialTheme, initialLanguage } = await getInitialPreferencesFn()
    return { initialTheme, initialLanguage }
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
  const { initialTheme, initialLanguage, i18n } = Route.useRouteContext()

  return (
    <I18nProvider i18n={i18n} initialLanguage={initialLanguage} defaultNS={defaultNS}>
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
    </I18nProvider>
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
