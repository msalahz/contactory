import * as React from 'react'
import { Card } from '@/features/abstractions/components/primitives/card'
import { Spinner } from '@/features/abstractions/components/primitives/spinner'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/features/abstractions/components/primitives/empty'
import { cn } from '@/features/abstractions/lib/utils'

export function Pending({ className, ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card className={cn('m-auto', className)} {...props}>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Spinner />
          </EmptyMedia>
          <EmptyTitle>Processing your request</EmptyTitle>
          <EmptyDescription>
            Please wait while we process your request. Do not refresh the page.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </Card>
  )
}
