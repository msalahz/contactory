import { ConstructionIcon, HammerIcon } from 'lucide-react'

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/features/abstractions/components/primitives/empty'

export function UnderConstruction() {
  return (
    <Empty className="size-full border-none">
      <EmptyHeader>
        <div className="relative mb-4">
          <EmptyMedia
            variant="icon"
            className="bg-background text-primary size-16 rounded-full border shadow-md"
          >
            <ConstructionIcon className="size-8" />
          </EmptyMedia>
          <div className="bg-primary text-primary-foreground absolute -top-1 -right-1 rounded-full p-1.5 shadow-sm">
            <HammerIcon className="size-3" />
          </div>
        </div>
        <EmptyTitle className="text-2xl font-bold tracking-tight">
          Feature in Development
        </EmptyTitle>
        <EmptyDescription className="max-w-[320px] text-sm leading-relaxed">
          We're busy building something new to improve your experience.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
