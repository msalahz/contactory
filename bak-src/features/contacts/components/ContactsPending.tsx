import { Pending } from '@/shared/components/Pending'
import { ContactNewBtn } from '@/features/contacts/components/ContactNewBtn'
import { ConsoleInsetContent, ConsoleInsetHeader } from '@/shared/console/Console'

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
