import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { envClient } from '@/env.client'
import { noop } from '@/shared/utils/noop'
import { AlertBox } from '@/shared/components/AlertBox'
import { SignUpForm } from '@/features/auth/components/SignUpForm'
import { ItemDescription, ItemTitle } from '@/integrations/shadcn/components/ui/item'
import { useSignUpEmail } from '@/features/auth/hooks/useSignUpEmail'
import { FieldError } from '@/integrations/shadcn/components/ui/field'
import { AnimatedPresence } from '@/shared/components/AnimatedPresence'
import { useSignInSocial } from '@/features/auth/hooks/useSignInSocial'

export const Route = createFileRoute('/_auth/sign-up')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation('auth')
  const { mutateAsync: signUpEmail, error, isSuccess } = useSignUpEmail()
  const { mutate: signInSocial, isPending: isSigningInSocial } = useSignInSocial()

  const isGoogleEnabled = envClient.VITE_BETTER_AUTH_ENABLE_GOOGLE === 'true'

  function signUpGoogle() {
    if (!isGoogleEnabled) {
      return
    }

    signInSocial({
      provider: 'google',
      requestSignUp: true,
      callbackURL: envClient.VITE_BETTER_AUTH_CALLBACK_URL,
    })
  }
  return (
    <AnimatedPresence>
      <SignUpForm
        signUpGoogle={signUpGoogle}
        isSigningUpSocial={isSigningInSocial}
        isGoogleEnabled={isGoogleEnabled}
        onFormSubmit={async (data: { name: string; email: string; password: string }) => {
          await signUpEmail({
            name: data.name,
            email: data.email,
            password: data.password,
            callbackURL: '/dashboard',
          }).catch(noop)
        }}
      >
        {error ? (
          <AlertBox type="error">
            <ItemTitle>{t('Sign Up Failed')}</ItemTitle>
            <FieldError errors={[error]} />
          </AlertBox>
        ) : null}

        {isSuccess ? (
          <AlertBox type="success">
            <ItemTitle>{t('Account created successfully')}</ItemTitle>
            <ItemDescription>{t('Check your email for a verification link.')}</ItemDescription>
          </AlertBox>
        ) : null}
      </SignUpForm>
    </AnimatedPresence>
  )
}
