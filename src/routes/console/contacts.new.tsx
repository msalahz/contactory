import { createFileRoute } from '@tanstack/react-router'

import { ConsoleInsetContent, ConsoleInsetHeader } from '@/features/abstractions/console/Console'

export const Route = createFileRoute('/console/contacts/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <ConsoleInsetHeader></ConsoleInsetHeader>

      <ConsoleInsetContent>
        <div>Hello "/console/contacts/new"!</div>
      </ConsoleInsetContent>
    </>
  )
}
