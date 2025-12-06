import { createFileRoute } from '@tanstack/react-router'

import { AlertBox } from '@/features/abstractions/components/reused/alert-box'
import { ItemTitle } from '@/features/abstractions/components/primitives/item'
import { FieldError } from '@/features/abstractions/components/primitives/field'
import { RequestPasswordResetForm } from '@/features/users/components/request-passowrd-reset-form'
import { useRequestPasswordReset } from '@/integrations/better-auth/hooks/use-request-password-reset'

export const Route = createFileRoute('/_auth/forgot-password')({
  component: RouteComponent,
})

function RouteComponent() {
  const { mutateAsync, data, error, isSuccess } = useRequestPasswordReset()

  return (
    <section className="flex min-h-full flex-col items-center justify-center p-6">
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
    </section>
  )
}
