import { createFileRoute } from '@tanstack/react-router'
import { ConsoleInsetHeader } from '@/features/abstractions/components/reused/console-inset-header'

export const Route = createFileRoute('/console/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <section className="flex flex-1 flex-col">
      <ConsoleInsetHeader></ConsoleInsetHeader>

      <main className="flex-1 gap-1 overflow-auto px-3 lg:px-4">
        <div>Hello "/console/"!</div>
      </main>
    </section>
  )
}
