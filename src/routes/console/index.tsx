import { createFileRoute } from '@tanstack/react-router'

import { ConsoleInsetHeader } from '@/features/abstractions/components/reused/console'

export const Route = createFileRoute('/console/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <ConsoleInsetHeader />
      Hello "/console/"!
    </>
  )
}
