import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

import { ContactForm } from '@/features/contacts/components/ContactForm'
import { findContactQueryOptions } from '@/features/contacts/hooks/queries'
import { NotFound } from '@/features/abstractions/components/reused/NotFound'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/features/abstractions/components/primitives/sheet'
import { Pending } from '@/features/abstractions/components/reused/Pending'

export const Route = createFileRoute('/console/contacts/$contactId/edit')({
  component: RouteComponent,
  loader({ context, params }) {
    context.queryClient.ensureQueryData(findContactQueryOptions(params.contactId))
  },
})

function RouteComponent() {
  const navigate = Route.useNavigate()
  const { contactId } = Route.useParams()
  const { data: contact, isPending } = useQuery(findContactQueryOptions(contactId))

  if (isPending) return <Pending />

  if (!contact) return <NotFound />

  return (
    <Sheet
      defaultOpen
      onOpenChange={(o) => {
        if (!o) navigate({ to: '/console/contacts/$contactId', params: { contactId: contact.id } })
      }}
    >
      <SheetContent className="overflow-y-auto sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>
            Edit Contact: {contact.firstName} {contact.lastName}
          </SheetTitle>
          <SheetDescription>Edit contact details</SheetDescription>
        </SheetHeader>
        <ContactForm contact={contact} />
      </SheetContent>
    </Sheet>
  )
}
