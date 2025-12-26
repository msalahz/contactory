import { z } from 'zod'
import { createFileRoute } from '@tanstack/react-router'

import { AlertBox } from '@/shared/components/AlertBox'
import { ItemTitle } from '@/integrations/shadcn/components/ui/item'
import { FieldError } from '@/integrations/shadcn/components/ui/field'
import { ResetPasswordForm } from '@/features/users/components/ResetPasswordForm'
import { useResetPassword } from '@/integrations/better-auth/hooks/useResetPassword'
import { AnimatedPresence } from '@/shared/components/AnimatedPresence'

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
