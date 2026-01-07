import { z } from 'zod'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'

import { noop } from '@/shared/utils/noop'
import { LogoIcon } from '@/shared/components/Logo'
import { cn } from '@/integrations/shadcn/lib/utils'
import { GoogleIcon } from '@/shared/components/GoogleIcon'
import { Button } from '@/integrations/shadcn/components/ui/button'
import { useAppForm } from '@/integrations/tanstack-form/hooks/form'
import { Spinner } from '@/integrations/shadcn/components/ui/spinner'
import { Field, FieldGroup } from '@/integrations/shadcn/components/ui/field'

export interface SignUpFormProps extends React.ComponentProps<'div'> {
  signUpGoogle: () => void
  isSigningUpSocial: boolean
  onFormSubmit?: (data: { name: string; email: string; password: string }) => Promise<void>
}

export function SignUpForm({
  children,
  className,
  isSigningUpSocial,
  signUpGoogle = noop,
  onFormSubmit = noop,
  ...props
}: SignUpFormProps) {
  const { t } = useTranslation('auth')

  const formSchema = useMemo(
    () =>
      z
        .object({
          name: z.string().nonempty(t('Name is required')),
          email: z.email(t('Invalid email address')).nonempty(t('Email is required')),
          password: z
            .string()
            .nonempty(t('Password is required'))
            .min(10, t('Password must be at least 10 characters long')),
          passwordConfirm: z.string().nonempty(t('Please confirm your password')),
        })
        .refine((data) => data.password === data.passwordConfirm, {
          message: t('Passwords do not match'),
          path: ['passwordConfirm'],
        }),
    [t],
  )

  const form = useAppForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validators: {
      onSubmit: formSchema,
    },
    async onSubmit({ value }) {
      await onFormSubmit({
        name: value.name,
        email: value.email,
        password: value.password,
      })
    },
  })

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
            <Link to="/" aria-label={t('Go home')}>
              <LogoIcon />
            </Link>
            <h1 className="mt-4 mb-1 text-xl font-semibold">{t('Create a Contactory Account')}</h1>
            <p>{t('Welcome! Create an account to get started')}</p>
          </div>

          <div className="mt-6">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              disabled={isSigningUpSocial}
              onClick={signUpGoogle}
            >
              {isSigningUpSocial ? <Spinner className="size-4" /> : <GoogleIcon />}

              <span>{t('Google')}</span>
            </Button>
          </div>

          <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <hr className="border-dashed" />
            <span className="text-muted-foreground text-xs">{t('Or continue With')}</span>
            <hr className="border-dashed" />
          </div>

          <FieldGroup>
            {children ? <Field>{children}</Field> : null}

            <form.AppField
              name="name"
              children={(field) => (
                <field.Input type="text" label={t('Name')} placeholder={t('John Doe')} />
              )}
            />

            <form.AppField
              name="email"
              children={(field) => (
                <field.Input type="email" label={t('Email')} placeholder={t('me@example.com')} />
              )}
            />

            <form.AppField
              name="password"
              children={(field) => <field.Input type="password" label={t('Password')} />}
            />

            <form.AppField
              name="passwordConfirm"
              children={(field) => <field.Input type="password" label={t('Confirm Password')} />}
            />

            <form.AppForm>
              <form.SubmitButton>{t('Sign Up')}</form.SubmitButton>
            </form.AppForm>
          </FieldGroup>
        </div>

        <p className="text-accent-foreground text-center text-sm">
          {t('Have an account ?')}
          <Button asChild variant="link" className="px-2">
            <Link to="/sign-in">{t('Sign In')}</Link>
          </Button>
        </p>
      </form>
    </section>
  )
}
