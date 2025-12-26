import { createRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'

import { routeTree } from '@/routeTree.gen'
import * as TanstackQuery from '@/integrations/tanstack-query/rootProvider'

// Import the generated route tree

import { DefaultCatchBoundary } from '@/shared/components/DefaultCatchBoundary'

// Create a new router instance
export const getRouter = () => {
  const rqContext = TanstackQuery.getContext()

  const router = createRouter({
    routeTree,
    context: {
      ...rqContext,
      user: null,
      theme: null,
      session: null,
    },
    defaultPreload: 'intent',
    Wrap: (props: { children: React.ReactNode }) => {
      return <TanstackQuery.Provider {...rqContext}>{props.children}</TanstackQuery.Provider>
    },
    defaultErrorComponent: DefaultCatchBoundary,
    // defaultNotFoundComponent: () => <NotFound />,
    // defaultPendingComponent: () => <Pending />,
    /** Time in milliseconds before showing pending UI (default: 1000ms) */
    // defaultPendingMs: 500,
    /** Minimum time in milliseconds to show the pending UI once it appears (default: 500ms) */
    // defaultPendingMinMs: 500,
    /** Time in milliseconds before cached route data is garbage collected (default: 30 minutes) */
    // defaultGcTime: 1000 * 60 * 30,
    /** Time in milliseconds before cached route data is considered stale (default: 0) */
    // defaultStaleTime: 1000 * 60, // 1 minute
    /** Time in milliseconds before preloaded route data is garbage collected (default: 30 minutes) */
    // defaultPreloadGcTime: 1000 * 60 * 30,
    /** Time in milliseconds before preloaded route data is considered stale (default: 30 seconds) */
    // defaultPreloadStaleTime: 1000 * 30,
  })

  setupRouterSsrQueryIntegration({ router, queryClient: rqContext.queryClient })

  return router
}
