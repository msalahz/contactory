import { Suspense } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import { Card } from '@/features/abstractions/components/primitives/card'
import { getContactsCountQueryOptions } from '@/features/contacts/queries'
import { UnderConstruction } from '@/features/abstractions/console/UnderConstruction'
import { ContactsTotalMetric } from '@/features/contacts/components/ContactsTotalMetric'
import { ConsoleInsetContent, ConsoleInsetHeader } from '@/features/abstractions/console/Console'
import { ContactsTotalMetricSkeleton } from '@/features/contacts/components/ContactsTotalMetricSkeleton'

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
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-4">
            <Suspense fallback={<ContactsTotalMetricSkeleton />}>
              <ContactsTotalMetric />
            </Suspense>
          </div>

          <div className="bg-muted/50 grow rounded-xl md:min-h-min">
            <Card className="gradient-bg size-full">
              <UnderConstruction />
            </Card>
          </div>
        </div>
      </ConsoleInsetContent>
    </>
  )
}
