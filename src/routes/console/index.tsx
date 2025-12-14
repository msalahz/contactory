import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/console/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <section className="flex flex-1 flex-col">
      <header className="flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6"></div>
      </header>
      <main className="flex-1 overflow-auto">
        <div>Hello "/console/"!</div>
      </main>
    </section>
  )
}
