import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_user/contacts')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_user/contacts"!</div>
}
