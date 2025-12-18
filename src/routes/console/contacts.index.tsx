import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'

import { Pending } from '@/features/abstractions/components/reused/pending'
import { ContactsTable } from '@/features/contacts/components/contacts-table'
import { ContactsEmpty } from '@/features/contacts/components/contacts-empty'
import { ContactNewBtn } from '@/features/contacts/components/contact-new-btn'
import { getContactsQueryOptions } from '@/features/contacts/hooks/query-options'
import {
  ConsoleInsetContent,
  ConsoleInsetHeader,
} from '@/features/abstractions/components/reused/console'

export const Route = createFileRoute('/console/contacts/')({
  component: RouteComponent,
  pendingComponent: Pending,
  async loader({ context }) {
    return await context.queryClient.ensureQueryData(getContactsQueryOptions())
  },
})

function RouteComponent() {
  const { data = [] } = useSuspenseQuery(getContactsQueryOptions())

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
