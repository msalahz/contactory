import { createFileRoute } from '@tanstack/react-router'

import { Card } from '@/features/abstractions/components/primitives/card'
import { UnderConstruction } from '@/features/abstractions/components/reused/under-construction'
import {
  ConsoleInsetContent,
  ConsoleInsetHeader,
} from '@/features/abstractions/components/reused/console'

export const Route = createFileRoute('/console/')({
  component: RouteComponent,
})

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
