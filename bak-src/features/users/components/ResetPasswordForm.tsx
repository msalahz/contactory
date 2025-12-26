import { z } from 'zod'
import { Link } from '@tanstack/react-router'

import { cn } from '@/integrations/shadcn/lib/utils'
import { noop } from '@/shared/utils/noop'
import { useAppForm } from '@/integrations/tanstack-form/hooks/form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/integrations/shadcn/components/ui/card'
import { Field, FieldDescription, FieldGroup } from '@/integrations/shadcn/components/ui/field'

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
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Update password</CardTitle>
          <CardDescription>You need to change your password.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              void form.handleSubmit()
            }}
            className="space-y-4"
          >
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

                <FieldDescription className="text-center">
                  Got to <Link to="/signin">Signin</Link>
                </FieldDescription>
              </form.AppForm>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and{' '}
        <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
