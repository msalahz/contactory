import { Pending } from '@/features/abstractions/components/reused/pending'
import { ContactNewBtn } from '@/features/contacts/components/contact-new-btn'
import {
  ConsoleInsetContent,
  ConsoleInsetHeader,
} from '@/features/abstractions/components/reused/console'

export function ContactsPending() {
  return (
    <>
      <ConsoleInsetHeader>
        <ContactNewBtn />
      </ConsoleInsetHeader>

      <ConsoleInsetContent>
        <Pending className="size-full" />
      </ConsoleInsetContent>
    </>
  )
}
