import { EditIcon } from 'lucide-react'
import { Link, Outlet, createFileRoute } from '@tanstack/react-router'
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query'

import { ContactInfo } from '@/features/contacts/components/ContactInfo'
import { Button } from '@/features/abstractions/components/primitives/button'
import { NotFound } from '@/features/abstractions/components/reused/NotFound'
import { CONTACTS_QUERY_KEYS, findContactQueryOptions } from '@/features/contacts/hooks/queries'
import {
  ConsoleInsetContent,
  ConsoleInsetHeader,
} from '@/features/abstractions/components/reused/Console'

export const Route = createFileRoute('/console/contacts/$contactId')({
  component: RouteComponent,
  loader({ context, params }) {
    return context.queryClient.ensureQueryData(findContactQueryOptions(params.contactId))
  },
})

function RouteComponent() {
  const queryClient = useQueryClient()
  const { contactId } = Route.useParams()
  const { data: contact } = useSuspenseQuery(findContactQueryOptions(contactId))

  if (!contact) return <NotFound />

  return (
    <>
      <ConsoleInsetHeader>
        <Button asChild className="ms-auto">
          <Link
            to="/console/contacts/$contactId/edit"
            params={{ contactId: contact.id }}
            onMouseDown={() =>
              queryClient.setQueryData(CONTACTS_QUERY_KEYS.find(contact.id), contact)
            }
          >
            <EditIcon /> Edit Contact
          </Link>
        </Button>
      </ConsoleInsetHeader>

      <ConsoleInsetContent>
        <ContactInfo contact={contact} />
      </ConsoleInsetContent>

      <Outlet />
    </>
  )
}
