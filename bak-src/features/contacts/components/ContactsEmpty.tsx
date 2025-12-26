import { ContactNewBtn } from '@/features/contacts/components/ContactNewBtn'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/integrations/shadcn/components/ui/empty'

export function ContactsEmpty() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle className="text-xl font-bold tracking-tight">No Contacts Yet</EmptyTitle>
        <EmptyDescription className="">
          You haven&apos;t created any contacts yet. Get started by creating your first contact.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <ContactNewBtn />
        </div>
      </EmptyContent>
    </Empty>
  )
}
