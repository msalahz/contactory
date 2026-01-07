import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/_admin/admin')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation('common')
  return <div>{t('Hello "/_admin/admin"!')}</div>
}
