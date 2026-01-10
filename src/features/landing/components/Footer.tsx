import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import type { Language } from '@/core/schemas'
import { formatYear } from '@/core/utils/format'
import { cn } from '@/integrations/shadcn/lib/utils'

export function FooterSection({ className, ...props }: React.ComponentProps<'footer'>) {
  const { t, i18n } = useTranslation('landing')
  const links = [
    { title: t('Features'), href: '#features' },
    { title: t('About'), href: '#about' },
    { title: t('FAQ'), href: '#faq' },
  ]
  // TODO: translate year
  return (
    <footer className={cn('border-b bg-white py-12', className)} {...props}>
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-wrap justify-between gap-6">
          <span className="text-muted-foreground order-last block text-center text-sm md:order-first">
            © {formatYear(new Date(), i18n.language as Language)} Consult In,{' '}
            {t('All rights reserved')}
          </span>
          <div className="order-first flex flex-wrap justify-center gap-6 text-sm md:order-last">
            {links.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="text-muted-foreground hover:text-primary block duration-150"
              >
                <span>{link.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
