import { Pending } from '@/features/abstractions/components/reused/Pending'
import { ContactNewBtn } from '@/features/contacts/components/ContactNewBtn'
import {
  ConsoleInsetContent,
  ConsoleInsetHeader,
} from '@/features/abstractions/components/reused/Console'

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
