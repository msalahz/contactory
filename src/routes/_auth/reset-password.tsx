import { z } from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { envClient } from '@/env.client'
import { AlertBox } from '@/shared/components/AlertBox'
import { ItemTitle } from '@/integrations/shadcn/components/ui/item'
import { FieldError } from '@/integrations/shadcn/components/ui/field'
import { AnimatedPresence } from '@/shared/components/AnimatedPresence'
import { useResetPassword } from '@/features/auth/hooks/useResetPassword'
import { ResetPasswordForm } from '@/features/auth/components/ResetPasswordForm'

export const Route = createFileRoute('/_auth/reset-password')({
  validateSearch: z.object({
    token: z.string().optional(),
    error: z.literal('INVALID_TOKEN').optional(),
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation('auth')
  const { token, error: invalidTokenError } = Route.useSearch()
  const { mutateAsync, error, isSuccess } = useResetPassword()

  if (envClient.VITE_BETTER_AUTH_ENABLE_EMAIL !== 'true') {
    return null
  }

  return (
    <AnimatedPresence>
      <ResetPasswordForm
        onFormSubmit={async (data: { newPassword: string }) => {
          try {
            const result = await mutateAsync({
              newPassword: data.newPassword,
              token,
            })
            return result.status === true
          } catch {
            return false
          }
        }}
      >
        {!token || invalidTokenError ? (
          <AlertBox type="error">
            <ItemTitle>{t('Invalid token')}</ItemTitle>
          </AlertBox>
        ) : null}

        {isSuccess ? (
          <AlertBox type="success">
            <ItemTitle>{t('Password reset successfully')}</ItemTitle>
          </AlertBox>
        ) : null}

        {error ? (
          <AlertBox type="error">
            <ItemTitle>{t('Reset password failed')}</ItemTitle>
            <FieldError errors={[error]} />
          </AlertBox>
        ) : null}
      </ResetPasswordForm>
    </AnimatedPresence>
  )
}
