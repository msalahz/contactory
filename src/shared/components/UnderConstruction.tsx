import { ConstructionIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import React from 'react'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/integrations/shadcn/components/ui/empty'

export function UnderConstruction(props: React.ComponentProps<typeof Empty>) {
  const { t } = useTranslation('common')

  return (
    <Empty {...props}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ConstructionIcon className="text-primary" />
        </EmptyMedia>
        <EmptyTitle>{t('Coming Soon')}</EmptyTitle>
        <EmptyDescription>
          {t("It's under construction.")} <br />
          {t('Please check back later.')}
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
