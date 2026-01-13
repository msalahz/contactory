import { Outlet, createFileRoute } from '@tanstack/react-router'
import { AuthActions } from '@/features/auth/components/AuthActions'

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <AuthActions />
      <Outlet />
    </>
  )
}
