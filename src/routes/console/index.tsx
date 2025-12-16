import { createFileRoute } from '@tanstack/react-router'

import { ConstructionIcon } from 'lucide-react'
import { Card } from '@/features/abstractions/components/primitives/card'
import {
  ConsoleInsetContent,
  ConsoleInsetHeader,
} from '@/features/abstractions/components/reused/console'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/features/abstractions/components/primitives/empty'

export const Route = createFileRoute('/console/')({
  component: RouteComponent,
})

function UnderConstruction() {
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

function RouteComponent() {
  return (
    <>
      <ConsoleInsetHeader />
      <ConsoleInsetContent>
        <div className="flex h-full grow flex-col gap-4">
          <div className="grid auto-rows-min grid-cols-1 flex-wrap gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="aspect-video">
              <UnderConstruction />
            </Card>
            <Card className="aspect-video">
              <UnderConstruction />
            </Card>
            <Card className="aspect-video">
              <UnderConstruction />
            </Card>
            <Card className="aspect-video">
              <UnderConstruction />
            </Card>
          </div>
          <div className="bg-muted/50 grow rounded-xl md:min-h-min">
            <Card className="aspect-video">
              <UnderConstruction />
            </Card>
          </div>
        </div>
      </ConsoleInsetContent>
    </>
  )
}
