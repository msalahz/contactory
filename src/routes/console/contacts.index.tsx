import { PlusIcon } from 'lucide-react'

import { Link, createFileRoute } from '@tanstack/react-router'
import { Button } from '@/features/abstractions/components/primitives/button'
import {
  ConsoleInsetContent,
  ConsoleInsetHeader,
} from '@/features/abstractions/components/reused/console'

export const Route = createFileRoute('/console/contacts/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <ConsoleInsetHeader>
        <Button asChild size="sm" className="ms-auto">
          <Link to="/console/contacts/new">
            <PlusIcon /> New Contact
          </Link>
        </Button>
      </ConsoleInsetHeader>

      <ConsoleInsetContent></ConsoleInsetContent>
    </>
  )
}
