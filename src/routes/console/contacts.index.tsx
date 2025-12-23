import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'

import { ContactsTable } from '@/features/contacts/components/ContactsTable'
import { ContactsEmpty } from '@/features/contacts/components/ContactsEmpty'
import { ContactNewBtn } from '@/features/contacts/components/ContactNewBtn'
import { getListContactsQueryOptions } from '@/features/contacts/queries'
import { ContactsPending } from '@/features/contacts/components/ContactsPending'
import { ConsoleInsetContent, ConsoleInsetHeader } from '@/features/abstractions/console/Console'

export const Route = createFileRoute('/console/contacts/')({
  component: RouteComponent,
  pendingComponent: ContactsPending,
  async loader({ context }) {
    return await context.queryClient.ensureQueryData(getListContactsQueryOptions())
  },
})

function RouteComponent() {
  const { data = [] } = useSuspenseQuery(getListContactsQueryOptions())

  return (
    <>
      <ConsoleInsetHeader>
        <ContactNewBtn />
      </ConsoleInsetHeader>

      <ConsoleInsetContent>
        {data.length === 0 ? <ContactsEmpty /> : <ContactsTable contacts={data} />}
      </ConsoleInsetContent>
    </>
  )
}
