import { Link } from '@tanstack/react-router'

import type { Contact } from '@/features/contacts/models'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/features/abstractions/components/primitives/table'
import { Card, CardContent } from '@/features/abstractions/components/primitives/card'

export interface ContactsTableProps {
  contacts: Array<Contact>
}

export function ContactsTable({ contacts }: ContactsTableProps) {
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
