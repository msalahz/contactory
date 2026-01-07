import { useTranslation } from 'react-i18next'

import { cn } from '@/integrations/shadcn/lib/utils'

export function StatsSection({ className, ...props }: React.ComponentProps<'section'>) {
  const { t } = useTranslation('landing')

  return (
    <section className={cn('py-12 md:py-20', className)} {...props}>
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center">
          <h2 className="text-4xl font-semibold lg:text-5xl">{t('Contactory in numbers')}</h2>
          <p>
            {t(
              'Contactory has been embraced by a growing community of users and businesses worldwide, achieving remarkable milestones along the way.',
            )}
          </p>
        </div>

        <div className="grid gap-0.5 *:text-center md:grid-cols-3">
          <div className="space-y-4 rounded-lg border py-12">
            <div className="text-5xl font-bold">+100</div>
            <p>{t('Individual user')}</p>
          </div>
          <div className="space-y-4 rounded-lg border py-12">
            <div className="text-5xl font-bold">78%</div>
            <p>{t('Conversion rate')}</p>
          </div>
          <div className="space-y-4 rounded-lg border py-12">
            <div className="text-5xl font-bold">+50</div>
            <p>{t('Organization')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
