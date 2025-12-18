import { ConstructionIcon } from 'lucide-react'

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/features/abstractions/components/primitives/empty'

export function UnderConstruction() {
  return (
    <Empty className="">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ConstructionIcon className="text-primary" />
        </EmptyMedia>
        <EmptyTitle>Coming Soon</EmptyTitle>
        <EmptyDescription>
          It's under construction. <br />
          Please check back later.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
