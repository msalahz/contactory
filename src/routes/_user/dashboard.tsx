import { Link, createFileRoute } from '@tanstack/react-router'

import { LogoIcon, LogoWord } from '@/shared/components/Logo'
import { AnimatedPresence } from '@/shared/components/AnimatedPresence'
import { UnderConstruction } from '@/shared/components/UnderConstruction'

export const Route = createFileRoute('/_user/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AnimatedPresence>
      <section className="flex bg-zinc-50 dark:bg-transparent">
        <div className="m-auto w-full max-w-92">
          <div>
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
