import { Outlet, createFileRoute } from '@tanstack/react-router'
import { requireAdminMiddleware } from '@/backend/middlewares/auth'

export const Route = createFileRoute('/_admin')({
  component: RouteComponent,
  server: {
    middleware: [requireAdminMiddleware],
  },
})

function RouteComponent() {
  return (
    <div>
      <Outlet />
    </div>
  )
}
