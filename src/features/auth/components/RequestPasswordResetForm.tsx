import { z } from 'zod'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'

import { noop } from '@/shared/utils/noop'
import { LogoIcon } from '@/shared/components/Logo'
import { cn } from '@/integrations/shadcn/lib/utils'
import { Button } from '@/integrations/shadcn/components/ui/button'
import { useAppForm } from '@/integrations/tanstack-form/hooks/form'
import { Field, FieldGroup } from '@/integrations/shadcn/components/ui/field'

export interface RequestPasswordResetFormProps extends React.ComponentProps<'div'> {
  onFormSubmit?: (data: { email: string }) => Promise<boolean>
}

export function RequestPasswordResetForm({
  onFormSubmit = noop,
  className,
  children,
  ...props
}: RequestPasswordResetFormProps) {
  const { t } = useTranslation('auth')

  const formSchema = useMemo(
    () =>
      z.object({
        email: z.email(t('Invalid email address')).nonempty(t('Email is required')),
      }),
    [t],
  )

  const form = useAppForm({
    defaultValues: {
      email: '',
    },
    validators: {
      onSubmit: formSchema,
    },
    async onSubmit({ value, formApi }) {
      const success = await onFormSubmit({ email: value.email })
      if (success) formApi.reset()
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
        <div className="space-y-4 p-6">
          <div>
            <Link to="/" aria-label={t('Go home')}>
              <LogoIcon />
            </Link>
            <h1 className="mt-4 mb-1 text-xl font-semibold">
              {t('Reset your Contactory password')}
            </h1>
            <p>{t('Enter your email address and we will send you a password reset link.')}</p>
          </div>

          <div className="space-y-6">
            <FieldGroup>
              {children ? <Field>{children}</Field> : null}
              <form.AppField
                name="email"
                children={(field) => (
                  <field.Input type="email" label={t('Email')} placeholder={t('me@example.com')} />
                )}
              />
              <form.AppForm>
                <form.SubmitButton>{t('Send password reset email')}</form.SubmitButton>
              </form.AppForm>
            </FieldGroup>
          </div>
        </div>

        <p className="text-accent-foreground text-center text-sm">
          <Button asChild variant="link" className="px-2">
            <Link to="/sign-in">{t('Sign In')}</Link>
          </Button>
        </p>
      </form>
    </section>
  )
}
