import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'

import { ContactsTable } from '@/features/contacts/components/contacts-table'
import { ContactsEmpty } from '@/features/contacts/components/contacts-empty'
import { ContactNewBtn } from '@/features/contacts/components/contact-new-btn'
import { getListContactsQueryOptions } from '@/features/contacts/hooks/queries'
import { ContactsPending } from '@/features/contacts/components/contacts-pending'
import {
  ConsoleInsetContent,
  ConsoleInsetHeader,
} from '@/features/abstractions/components/reused/console'

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
