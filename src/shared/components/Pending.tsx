import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { Card } from '@/integrations/shadcn/components/ui/card'
import { Spinner } from '@/integrations/shadcn/components/ui/spinner'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/integrations/shadcn/components/ui/empty'
import { cn } from '@/integrations/shadcn/lib/utils'

export function Pending({ className, ...props }: React.ComponentProps<typeof Card>) {
  const { t } = useTranslation('common')

  return (
    <Card className={cn('m-auto', className)} {...props}>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Spinner />
          </EmptyMedia>
          <EmptyTitle>{t('Processing your request')}</EmptyTitle>
          <EmptyDescription>
            {t('Please wait while we process your request. Do not refresh the page.')}
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </Card>
  )
}
