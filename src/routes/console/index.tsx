import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/console/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/console/"!</div>
}
