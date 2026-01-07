import { useTranslation } from 'react-i18next'

import { cn } from '@/integrations/shadcn/lib/utils'

export function LogoIcon({ className, ...props }: React.ComponentProps<'img'>) {
  const { t } = useTranslation('common')
  return <img src="/logo.svg" alt={t('Logo')} className={cn('size-8', className)} {...props} />
}

export function LogoWord({ className, ...props }: React.ComponentProps<'span'>) {
  const { t } = useTranslation('common')

  return (
    <span className={cn('', className)} {...props}>
      {t('Contactory')}
    </span>
  )
}

export function Logo({
  className,
  iconClassName,
  wordClassName,
  ...props
}: React.ComponentProps<'h1'> & {
  iconClassName?: string
  wordClassName?: string
}) {
  return (
    <h1
      className={cn(
        'flex w-fit items-center gap-2 text-2xl transition-all duration-200 ease-in-out',
        className,
      )}
      {...props}
    >
      <LogoIcon className={iconClassName} />
      <LogoWord className={wordClassName} />
    </h1>
  )
}
