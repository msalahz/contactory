import { createRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'

import { routeTree } from '@/routeTree.gen'
import * as TanstackQuery from '@/integrations/tanstack-query/root-provider'

// Import the generated route tree

import { Pending } from '@/features/abstractions/components/reused/pending'
import { NotFound } from '@/features/abstractions/components/reused/not-found'
import { DefaultCatchBoundary } from '@/features/abstractions/components/reused/default-catch-boundary'

// Create a new router instance
export const getRouter = () => {
  const rqContext = TanstackQuery.getContext()

  const router = createRouter({
    routeTree,
    context: { ...rqContext, session: null },
    defaultPreload: 'intent',
    Wrap: (props: { children: React.ReactNode }) => {
      return <TanstackQuery.Provider {...rqContext}>{props.children}</TanstackQuery.Provider>
    },
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => <NotFound />,
    defaultPendingComponent: () => <Pending />,
    /** Time in milliseconds before showing pending UI (default: 300ms) */
    // defaultPendingMs: 300,
    /** Minimum time in milliseconds to show the pending UI once it appears (default: 300ms) */
    // defaultPendingMinMs: 300,
    /** Time in milliseconds before cached route data is garbage collected (default: 5 minutes) */
    defaultGcTime: 1000 * 60 * 5,
    /** Time in milliseconds before cached route data is considered stale (default: 1 minute) */
    defaultStaleTime: 1000 * 60,
    /** Time in milliseconds before preloaded route data is garbage collected (default: 30 seconds) */
    defaultPreloadGcTime: 1000 * 30,
    /** Time in milliseconds before preloaded route data is considered stale (default: 1 minute) */
    defaultPreloadStaleTime: 1000 * 60,
  })

  setupRouterSsrQueryIntegration({ router, queryClient: rqContext.queryClient })

  return router
}
