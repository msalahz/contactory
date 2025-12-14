import { ArrowLeftIcon } from 'lucide-react'
import { Link, Outlet, createFileRoute } from '@tanstack/react-router'

import { Button } from '@/features/abstractions/components/primitives/button'

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <section className="flex h-dvh flex-col gap-4 overflow-y-auto p-2 md:p-8">
      <div>
        <Button asChild variant="outline">
          <Link to="/" className="text-primary text-sm">
            <ArrowLeftIcon /> Go Home
          </Link>
        </Button>
      </div>

      <div className="mx-auto flex w-full max-w-sm flex-1 flex-col items-center justify-center text-start">
        <Outlet />
      </div>
    </section>
  )
}
