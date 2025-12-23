import { Suspense } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import { Card } from '@/features/abstractions/components/primitives/card'
import { getContactsCountQueryOptions } from '@/features/contacts/queries'
import { ContactsCount } from '@/features/contacts/components/ContactsCount'
import { UnderConstruction } from '@/features/abstractions/console/UnderConstruction'
import { ContactsCountSkeleton } from '@/features/contacts/components/ContactsCountSkeleton'
import { ConsoleInsetContent, ConsoleInsetHeader } from '@/features/abstractions/console/Console'

export const Route = createFileRoute('/console/')({
  component: RouteComponent,
  loader({ context }) {
    context.queryClient.ensureQueryData(getContactsCountQueryOptions())
  },
})

function RouteComponent() {
  return (
    <>
      <ConsoleInsetHeader />
      <ConsoleInsetContent>
        <div className="flex h-full grow flex-col gap-4">
          <div className="grid auto-rows-min grid-cols-1 flex-wrap gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Suspense fallback={<ContactsCountSkeleton />}>
              <ContactsCount />
            </Suspense>

            <Card>
              <UnderConstruction />
            </Card>
            <Card>
              <UnderConstruction />
            </Card>
            <Card>
              <UnderConstruction />
            </Card>
          </div>
          <div className="bg-muted/50 grow rounded-xl md:min-h-min">
            <Card className="size-full">
              <UnderConstruction />
            </Card>
          </div>
        </div>
      </ConsoleInsetContent>
    </>
  )
}
