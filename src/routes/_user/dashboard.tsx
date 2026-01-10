import { Link, createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { LogoIcon, LogoWord } from '@/core/components/Logo'
import { AnimatedPresence } from '@/core/components/AnimatedPresence'
import { UnderConstruction } from '@/core/components/UnderConstruction'

export const Route = createFileRoute('/_user/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation('core')

  return (
    <AnimatedPresence className="flex h-full items-center justify-center">
      <section className="flex bg-zinc-50 dark:bg-transparent">
        <div className="m-auto w-full max-w-92">
          <div>
            <Link
              to="/"
              aria-label={t('Go home')}
              className="mb-6 flex flex-col items-center gap-2"
            >
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
