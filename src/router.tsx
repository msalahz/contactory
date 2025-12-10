import { createRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'

import { routeTree } from '@/routeTree.gen'
import * as TanstackQuery from '@/integrations/tanstack-query/root-provider'

// Import the generated route tree

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
  })

  setupRouterSsrQueryIntegration({ router, queryClient: rqContext.queryClient })

  return router
}
