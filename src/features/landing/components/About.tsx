import { useTranslation } from 'react-i18next'

import { cn } from '@/integrations/shadcn/lib/utils'

export function AboutSection({ className, ...props }: React.ComponentProps<'section'>) {
  const { t } = useTranslation('landing')

  return (
    <section id="about" className={cn('py-16 md:py-32', className)} {...props}>
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-6 md:grid-cols-2 md:gap-12">
          <h2 className="text-4xl font-medium">
            {t('The Contactory ecosystem brings together our connections.')}
          </h2>
          <div className="space-y-6">
            <p>
              {t(
                'Contactory is evolving to be more than just CRUD solution. It supports an entire ecosystem — from users and businesses innovate.',
              )}
            </p>
            <p>
              {t(
                'Contactory. It supports an entire ecosystem — from users to businesses getting in control of their contacts, linking them together, sharing them seamlessly, syncing them across devices, and innovating with them using AI.',
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
