import { useTranslation } from 'react-i18next'

import { noop } from '@/shared/utils/noop'
import { GoogleIcon } from '@/shared/components/GoogleIcon'
import { Button } from '@/integrations/shadcn/components/ui/button'
import { ProfileSection } from '@/features/auth/components/ProfileSection'

export interface UserSocialFormProps {
  connectedAccounts?: Array<{ provider: string; email?: string }>
  onConnect?: (provider: string) => Promise<void>
  onDisconnect?: (provider: string) => Promise<void>
  className?: string
}

export function UserSocialForm({
  connectedAccounts = [],
  onConnect = noop,
  onDisconnect = noop,
  className,
}: UserSocialFormProps) {
  const { t } = useTranslation('auth')
  const isGoogleConnected = connectedAccounts.some((acc) => acc.provider === 'google')
  const googleAccount = connectedAccounts.find((acc) => acc.provider === 'google')

  return (
    <ProfileSection
      title={t('Connected Accounts')}
      description={t('Connect your social accounts for easier sign-in')}
      className={className}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <div className="bg-muted flex size-10 items-center justify-center rounded-full">
              <GoogleIcon className="size-5" />
            </div>
            <div>
              <p className="font-medium">{t('Google')}</p>
              {isGoogleConnected && googleAccount?.email ? (
                <p className="text-muted-foreground text-sm">{googleAccount.email}</p>
              ) : (
                <p className="text-muted-foreground text-sm">{t('Not connected')}</p>
              )}
            </div>
          </div>
          {isGoogleConnected ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDisconnect('google')}
              className="text-destructive hover:text-destructive"
            >
              {t('Disconnect')}
            </Button>
          ) : (
            <Button variant="outline" size="sm" onClick={() => onConnect('google')}>
              {t('Connect')}
            </Button>
          )}
        </div>
      </div>
    </ProfileSection>
  )
}
