import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_private')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Outlet />
    </div>
  )
}
