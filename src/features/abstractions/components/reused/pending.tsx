import { Card } from '@/features/abstractions/components/primitives/card'
import { Spinner } from '@/features/abstractions/components/primitives/spinner'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/features/abstractions/components/primitives/empty'

export function Pending() {
  return (
    <Card className="m-auto aspect-square size-75">
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
