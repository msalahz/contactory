import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/console/contacts')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/console/contacts"!</div>
}
