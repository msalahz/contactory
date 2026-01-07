import { z } from 'zod'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { noop } from '@/shared/utils/noop'
import { LogoIcon } from '@/shared/components/Logo'
import { cn } from '@/integrations/shadcn/lib/utils'
import { GoogleIcon } from '@/shared/components/GoogleIcon'
import { Button } from '@/integrations/shadcn/components/ui/button'
import { useAppForm } from '@/integrations/tanstack-form/hooks/form'
import { Spinner } from '@/integrations/shadcn/components/ui/spinner'
import { Field, FieldGroup } from '@/integrations/shadcn/components/ui/field'

const formSchema = z.object({
  email: z.email('Invalid email address').nonempty('Email is required'),
  password: z
    .string()
    .nonempty('Password is required')
    .min(10, 'Password must be at least 10 characters long'),
})

export interface SignInFormProps extends React.ComponentProps<'div'> {
  signInGoogle: () => void
  isSigningInSocial: boolean
  onFormSubmit?: (data: { email: string; password: string }) => Promise<void>
}

export function SignInForm({
  children,
  className,
  signInGoogle,
  isSigningInSocial = false,
  onFormSubmit = noop,
  ...props
}: SignInFormProps) {
  const form = useAppForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onSubmit: formSchema,
    },
    async onSubmit({ value }) {
      await onFormSubmit({
        email: value.email,
        password: value.password,
      })
    },
  })
  const { t } = useTranslation('auth')

  return (
    <section
      className={cn(
        'flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent',
        className,
      )}
      {...props}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          void form.handleSubmit()
        }}
        className="m-auto h-fit w-full max-w-92"
      >
        <div className="p-6">
          <div>
            <Link to="/" aria-label="go home">
              <LogoIcon />
            </Link>
            <h1 className="mt-4 mb-1 text-xl font-semibold">{t('Sign In to Contactory')}</h1>
            <p>{t('Welcome back! Sign in to continue')}</p>
          </div>

          <div className="mt-6">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              disabled={isSigningInSocial}
              onClick={signInGoogle}
            >
              {isSigningInSocial ? <Spinner className="size-4" /> : <GoogleIcon />}

              <span>{t('Google')}</span>
            </Button>
          </div>

          <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <hr className="border-dashed" />
            <span className="text-muted-foreground text-xs">{t('Or continue With')}</span>
            <hr className="border-dashed" />
          </div>

          <div className="space-y-6">
            <FieldGroup>
              {children ? <Field>{children}</Field> : null}
              <form.AppField
                name="email"
                children={(field) => (
                  <field.Input type="email" label={t('Email')} placeholder="me@example.com" />
                )}
              />
              <form.AppField
                name="password"
                children={(field) => (
                  <field.Input
                    type="password"
                    label={t('Password')}
                    labelChildren={
                      <Link
                        to="/forgot-password"
                        className="text-foreground ms-auto text-sm underline-offset-4 hover:underline"
                      >
                        {t('Forgot your password?')}
                      </Link>
                    }
                  />
                )}
              />
              <form.AppForm>
                <form.SubmitButton className="w-full">{t('Sign in')}</form.SubmitButton>
              </form.AppForm>
            </FieldGroup>
          </div>
        </div>

        <p className="text-accent-foreground text-center text-sm">
          {t("Don't have an account?")}
          <Button asChild variant="link" className="px-2">
            <Link to="/sign-up">{t('Create account')}</Link>
          </Button>
        </p>
      </form>
    </section>
  )
}
