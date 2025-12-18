import { Card } from '@/features/abstractions/components/primitives/card'
import { ContactsIcon } from '@/features/contacts/components/contacts-icon'
import { ContactNewBtn } from '@/features/contacts/components/contact-new-btn'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/features/abstractions/components/primitives/empty'

export function ContactsEmpty() {
  return (
    <Card className="m-auto aspect-square size-75">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon" className="size-10">
            <ContactsIcon />
          </EmptyMedia>
          <EmptyTitle>No Contacts Yet</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t created any contacts yet. Get started by creating your first contact.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-2">
            <ContactNewBtn />
          </div>
        </EmptyContent>
      </Empty>
    </Card>
  )
}
