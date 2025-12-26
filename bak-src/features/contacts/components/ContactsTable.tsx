import { Link } from '@tanstack/react-router'
import { useQueryClient } from '@tanstack/react-query'

import type { Contact } from '@/features/contacts/schema'

import { CONTACTS_QUERY_KEYS } from '@/features/contacts/queries'
import { Card, CardContent } from '@/integrations/shadcn/components/ui/card'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/integrations/shadcn/components/ui/table'

export interface ContactsTableProps {
  contacts: Array<Contact>
}

export function ContactsTable({ contacts }: ContactsTableProps) {
  const queryClient = useQueryClient()
  return (
    <Card className="size-full">
      <CardContent>
        <Table>
          <TableCaption>A list of Contacts.</TableCaption>

          <TableHeader className="text-xl font-medium">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="text-base font-light">
            {contacts.map((contact) => (
              <TableRow key={`table-row-${contact.id}`}>
                <TableCell>
                  <Link
                    to="/console/contacts/$contactId"
                    params={{ contactId: contact.id }}
                    className="text-primary hover:underline"
                    onMouseDown={() =>
                      queryClient.setQueryData(CONTACTS_QUERY_KEYS.find(contact.id), contact)
                    }
                  >
                    {`${contact.firstName} ${contact.lastName}`}
                  </Link>
                </TableCell>
                <TableCell>{contact.primaryEmail}</TableCell>
                <TableCell>{contact.primaryPhone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
