import { createFileRoute } from '@tanstack/react-router'

import { AlertBox } from '@/shared/components/AlertBox'
import { ItemTitle } from '@/integrations/shadcn/components/ui/item'
import { FieldError } from '@/integrations/shadcn/components/ui/field'
import { AnimatedPresence } from '@/shared/components/AnimatedPresence'
import { RequestPasswordResetForm } from '@/features/users/components/RequestPasswordResetForm'
import { useRequestPasswordReset } from '@/integrations/better-auth/hooks/useRequestPasswordReset'

export const Route = createFileRoute('/_auth/forgot-password')({
  component: RouteComponent,
})

function RouteComponent() {
  const { mutateAsync, data, error, isSuccess } = useRequestPasswordReset()

  return (
    <AnimatedPresence>
      <RequestPasswordResetForm
        onFormSubmit={async ({ email }: { email: string }) => {
          return mutateAsync({
            email,
            redirectTo: '/reset-password',
          })
            .then((result) => Promise.resolve(result.status === true))
            .catch(() => Promise.reject(false))
        }}
      >
        {isSuccess ? (
          <AlertBox type="success">
            <ItemTitle>
              {data.message ||
                'If an account with that email exists, check your email for a password reset link.'}
            </ItemTitle>
          </AlertBox>
        ) : null}

        {error ? (
          <AlertBox type="error">
            <ItemTitle>Request Failed</ItemTitle>
            <FieldError errors={[error]} />
          </AlertBox>
        ) : null}
      </RequestPasswordResetForm>
    </AnimatedPresence>
  )
}
