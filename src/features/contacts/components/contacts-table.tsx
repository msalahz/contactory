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
import { Card } from '@/features/abstractions/components/primitives/card'

export interface ContactsTableProps {
  contacts: Array<Contact>
}

export function ContactsTable({ contacts }: ContactsTableProps) {
  return (
    <Card className="w-full">
      <Table>
        <TableCaption>A list of Contacts.</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            {contacts.map((contact) => (
              <TableCell key={`table-row-${contact.id}`} className="font-medium">
                {`${contact.firstName} ${contact.lastName}`}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  )
}
