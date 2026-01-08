import { LoaderIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { cn } from '@/integrations/shadcn/lib/utils'

function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
  const { t } = useTranslation('common')

  return (
    <LoaderIcon
      role="status"
      aria-label={t('Loading')}
      className={cn('size-4 animate-spin', className)}
      {...props}
    />
  )
}

export { Spinner }
