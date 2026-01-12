import { useTranslation } from 'react-i18next'
import { createFileRoute } from '@tanstack/react-router'

import { envClient } from '@/env.client'
import { AlertBox } from '@/core/components/AlertBox'
import { ItemTitle } from '@/integrations/shadcn/components/ui/item'
import { FieldError } from '@/integrations/shadcn/components/ui/field'
import { AnimatedPresence } from '@/core/components/AnimatedPresence'
import { useRequestPasswordReset } from '@/features/auth/hooks/useRequestPasswordReset'
import { RequestPasswordResetForm } from '@/features/auth/components/RequestPasswordResetForm'

export const Route = createFileRoute('/_auth/forgot-password')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation('auth')
  const { mutateAsync, error, isSuccess } = useRequestPasswordReset()

  if (envClient.VITE_BETTER_AUTH_ENABLE_EMAIL !== 'true') {
    return null
  }

  return (
    <AnimatedPresence>
      <RequestPasswordResetForm
        onFormSubmit={async ({ email }: { email: string }) => {
          try {
            const result = await mutateAsync({
              email,
              redirectTo: '/reset-password',
            })
            return result.status === true
          } catch {
            return false
          }
        }}
      >
        {isSuccess ? (
          <AlertBox type="success">
            <ItemTitle>
              {t(
                'If an account with that email exists, check your email for a password reset link.',
              )}
            </ItemTitle>
          </AlertBox>
        ) : null}

        {error ? (
          <AlertBox type="error">
            <ItemTitle>{t('Request Failed')}</ItemTitle>
            <FieldError errors={[error]} />
          </AlertBox>
        ) : null}
      </RequestPasswordResetForm>
    </AnimatedPresence>
  )
}
