import { Link, createFileRoute } from '@tanstack/react-router'

import { LogoIcon, LogoWord } from '@/shared/components/Logo'
import { UnderConstruction } from '@/shared/components/UnderConstruction'
import { AnimatedPresence } from '@/shared/components/AnimatedPresence'

export const Route = createFileRoute('/_dashboard/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AnimatedPresence>
      <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
        <div className="m-auto h-fit w-full max-w-92">
          <div className="p-6">
            <Link to="/" aria-label="go home" className="mb-6 flex flex-col items-center gap-2">
              <LogoIcon className="m-auto size-40" />
              <LogoWord className="text-3xl" />
            </Link>
            <hr />
            <UnderConstruction className="**:text-lg" />
          </div>
        </div>
      </section>
    </AnimatedPresence>
  )
}
