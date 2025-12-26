import { TrendingUpIcon } from 'lucide-react'
import { useSuspenseQuery } from '@tanstack/react-query'

import { cn } from '@/integrations/shadcn/lib/utils'
import { getContactsCountQueryOptions } from '@/features/contacts/queries'
import { Badge } from '@/integrations/shadcn/components/ui/badge'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/integrations/shadcn/components/ui/card'

export interface ContactsCountProps extends React.ComponentProps<typeof Card> {}

export function ContactsTotalMetric({ className, ...props }: ContactsCountProps) {
  const { data: count = 0 } = useSuspenseQuery(getContactsCountQueryOptions())

  return (
    <Card className={cn('gradient-bg', className)} {...props}>
      <CardHeader>
        <CardDescription>Your Network</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {count.toLocaleString()}
        </CardTitle>
        <CardAction>
          <Badge variant="outline" hidden>
            <TrendingUpIcon className="size-4" />
            +12.5%
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex hidden gap-2 font-medium">
          Trending up this month <TrendingUpIcon className="size-4" />
        </div>
        <div className="text-muted-foreground">
          {count > 0 ? 'Total connections in your network' : 'No contacts yet'}
        </div>
      </CardFooter>
    </Card>
  )
}
