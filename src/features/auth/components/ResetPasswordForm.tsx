import { z } from 'zod'
import { Link } from '@tanstack/react-router'

import { noop } from '@/shared/utils/noop'
import { LogoIcon } from '@/shared/components/Logo'
import { cn } from '@/integrations/shadcn/lib/utils'
import { Button } from '@/integrations/shadcn/components/ui/button'
import { useAppForm } from '@/integrations/tanstack-form/hooks/form'
import { Field, FieldGroup } from '@/integrations/shadcn/components/ui/field'

const formSchema = z
  .object({
    password: z
      .string()
      .nonempty('Password is required')
      .min(10, 'Password must be at least 10 characters long'),
    passwordConfirm: z.string().nonempty('Please confirm your password'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Passwords do not match',
    path: ['passwordConfirm'],
  })

export interface ResetPasswordFormProps extends React.ComponentProps<'div'> {
  onFormSubmit?: (data: { newPassword: string }) => Promise<boolean>
}

export function ResetPasswordForm({
  onFormSubmit = noop,
  className,
  children,
  ...props
}: ResetPasswordFormProps) {
  const form = useAppForm({
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
    validators: {
      onSubmit: formSchema,
    },
    async onSubmit({ value, formApi }) {
      const success = await onFormSubmit({ newPassword: value.password })
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
            <Link to="/" aria-label="go home">
              <LogoIcon />
            </Link>
            <h1 className="mt-4 mb-1 text-xl font-semibold">Update Contactory password</h1>
            <p>You need to change your password.</p>
          </div>

          <div className="space-y-6">
            <FieldGroup>
              {children ? <Field>{children}</Field> : null}
              <form.AppField
                name="password"
                children={(field) => <field.Input type="password" label="Password" />}
              />

              <form.AppField
                name="passwordConfirm"
                children={(field) => <field.Input type="password" label="Confirm Password" />}
              />

              <form.AppForm>
                <form.SubmitButton label="Submit" />
              </form.AppForm>
            </FieldGroup>
          </div>
        </div>

        <p className="text-accent-foreground text-center text-sm">
          <Button asChild variant="link" className="px-2">
            <Link to="/sign-in">Sign In</Link>
          </Button>
        </p>
      </form>
    </section>
  )
}
