import { createFileRoute } from '@tanstack/react-router'

import { authServer } from '@/integrations/better-auth/authServer'

export const Route = createFileRoute('/api/auth/$')({
  server: {
    handlers: {
      GET: async ({ request }: { request: Request }) => {
        return await authServer.handler(request)
      },
      POST: async ({ request }: { request: Request }) => {
        return await authServer.handler(request)
      },
    },
  },
})
