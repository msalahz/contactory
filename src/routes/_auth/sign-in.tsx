import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { envClient } from '@/env.client'
import { noop } from '@/core/utils/noop'
import { AlertBox } from '@/core/components/AlertBox'
import { SignInForm } from '@/features/auth/components/SignInForm'
import { ItemTitle } from '@/integrations/shadcn/components/ui/item'
import { useSignInEmail } from '@/features/auth/hooks/useSignInEmail'
import { FieldError } from '@/integrations/shadcn/components/ui/field'
import { AnimatedPresence } from '@/core/components/AnimatedPresence'
import { useSignInSocial } from '@/features/auth/hooks/useSignInSocial'

export const Route = createFileRoute('/_auth/sign-in')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation('auth')
  const { mutateAsync: singInEmail, error } = useSignInEmail()
  const { mutate: signInSocial, isPending: isSigningInSocial } = useSignInSocial()

  const isGoogleEnabled = envClient.VITE_BETTER_AUTH_ENABLE_GOOGLE === 'true'

  function signInGoogle() {
    if (!isGoogleEnabled) {
      return
    }

    signInSocial({
      provider: 'google',
      callbackURL: envClient.VITE_BETTER_AUTH_CALLBACK_URL,
    })
  }

  return (
    <AnimatedPresence>
      <SignInForm
        signInGoogle={signInGoogle}
        isSigningInSocial={isSigningInSocial}
        isGoogleEnabled={isGoogleEnabled}
        isEmailEnabled={envClient.VITE_BETTER_AUTH_ENABLE_EMAIL === 'true'}
        onFormSubmit={async (data) => {
          await singInEmail({
            ...data,
            rememberMe: true,
            callbackURL: envClient.VITE_BETTER_AUTH_CALLBACK_URL,
          }).catch(noop)
        }}
      >
        {error ? (
          <AlertBox type="error">
            <ItemTitle>{t('Sign In Failed')}</ItemTitle>
            <FieldError errors={[error]} />
          </AlertBox>
        ) : null}
      </SignInForm>
    </AnimatedPresence>
  )
}
