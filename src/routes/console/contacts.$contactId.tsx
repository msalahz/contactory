import { createFileRoute } from '@tanstack/react-router'

import { useSuspenseQuery } from '@tanstack/react-query'
import {
  ConsoleInsetContent,
  ConsoleInsetHeader,
} from '@/features/abstractions/components/reused/console'
import { findContactQueryOptions } from '@/features/contacts/hooks/queries'
import { NotFound } from '@/features/abstractions/components/reused/not-found'

export const Route = createFileRoute('/console/contacts/$contactId')({
  component: RouteComponent,
  loader({ context, params }) {
    return context.queryClient.ensureQueryData(findContactQueryOptions(params.contactId))
  },
})

function RouteComponent() {
  const { contactId } = Route.useParams()
  const { data: contact } = useSuspenseQuery(findContactQueryOptions(contactId))

  if (!contact) return <NotFound />

  return (
    <>
      <ConsoleInsetHeader></ConsoleInsetHeader>

      <ConsoleInsetContent>
        <h1>{`${contact.firstName} ${contact.lastName}`}</h1>
      </ConsoleInsetContent>
    </>
  )
}
