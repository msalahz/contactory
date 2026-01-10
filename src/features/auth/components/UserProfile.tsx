import { useTranslation } from 'react-i18next'

import { cn } from '@/integrations/shadcn/lib/utils'
import { FieldDescription, FieldLegend, FieldSet } from '@/integrations/shadcn/components/ui/field'

export function UserProfile({ children, className, ...props }: React.ComponentProps<'main'>) {
  return (
    <main
      className={cn('mx-auto flex w-full items-start gap-6 p-4 md:pt-10', className)}
      {...props}
    >
      {children}
    </main>
  )
}

export interface UserProfileProps extends React.ComponentProps<typeof FieldSet> {}

export function UserProfileContent({ children, className, ...props }: UserProfileProps) {
  const { t } = useTranslation('auth')

  return (
    <FieldSet className={cn('mx-auto max-w-2xl grow space-y-6', className)} {...props}>
      <FieldLegend>
        <h1 className="text-3xl font-semibold">{t('Profile Settings')}</h1>
      </FieldLegend>
      <FieldDescription>{t('Manage your account settings and preferences')}</FieldDescription>
      {children}
    </FieldSet>
  )
}
