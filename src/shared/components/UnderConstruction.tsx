import { ConstructionIcon } from 'lucide-react'

import React from 'react'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/integrations/shadcn/components/ui/empty'

export function UnderConstruction(props: React.ComponentProps<typeof Empty>) {
  return (
    <Empty {...props}>
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
