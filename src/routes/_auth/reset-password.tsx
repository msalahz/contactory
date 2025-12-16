import { z } from 'zod'
import { createFileRoute } from '@tanstack/react-router'

import { AlertBox } from '@/features/abstractions/components/reused/alert-box'
import { ItemTitle } from '@/features/abstractions/components/primitives/item'
import { FieldError } from '@/features/abstractions/components/primitives/field'
import { ResetPasswordForm } from '@/features/users/components/reset-password-form'
import { useResetPassword } from '@/integrations/better-auth/hooks/use-reset-password'
import { AnimatedPresence } from '@/features/abstractions/components/reused/animated-presence'

export const Route = createFileRoute('/_auth/reset-password')({
  validateSearch: z.object({
    token: z.string().optional(),
    error: z.literal('INVALID_TOKEN').optional(),
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { token, error: invalidTokenError } = Route.useSearch()
  const { mutateAsync, error, isSuccess } = useResetPassword()

  return (
    <AnimatedPresence>
      <ResetPasswordForm
        onFormSubmit={async (data: { newPassword: string }) => {
          return mutateAsync({
            newPassword: data.newPassword,
            token,
          })
            .then((result) => Promise.resolve(result.status === true))
            .catch(() => Promise.reject(false))
        }}
      >
        {!token || invalidTokenError ? (
          <AlertBox type="error">
            <ItemTitle>Invalid token</ItemTitle>
          </AlertBox>
        ) : null}

        {isSuccess ? (
          <AlertBox type="success">
            <ItemTitle>Password reset successfully</ItemTitle>
          </AlertBox>
        ) : null}

        {error ? (
          <AlertBox type="error">
            <ItemTitle>Reset password failed</ItemTitle>
            <FieldError errors={[error]} />
          </AlertBox>
        ) : null}
      </ResetPasswordForm>
    </AnimatedPresence>
  )
}
