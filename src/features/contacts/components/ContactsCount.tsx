import { useSuspenseQuery } from '@tanstack/react-query'

import { cn } from '@/features/abstractions/lib/utils'
import { ContactsIcon } from '@/features/contacts/components/ContactsIcon'
import { getContactsCountQueryOptions } from '@/features/contacts/hooks/queries'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/features/abstractions/components/primitives/card'

export interface ContactsCountProps extends React.ComponentProps<typeof Card> {}

export function ContactsCount({ className, ...props }: ContactsCountProps) {
  const { data: count = 0 } = useSuspenseQuery(getContactsCountQueryOptions())

  return (
    <Card className={cn('', className)} {...props}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-medium">Your Network</CardTitle>
        <ContactsIcon className="text-primary size-8" />
      </CardHeader>
      <CardContent className="mt-auto">
        <div className="text-3xl font-bold">
          {count.toLocaleString()}{' '}
          <small className="text-muted-foreground text-xs font-normal">
            contact{count === 1 ? '' : 's'}
          </small>
        </div>
        <p className="text-muted-foreground mt-1 text-xs">Across all your groups</p>
      </CardContent>
    </Card>
  )
}
