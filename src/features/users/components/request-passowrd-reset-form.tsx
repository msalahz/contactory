import { z } from 'zod'
import { Link } from '@tanstack/react-router'

import { cn, noop } from '@/features/abstractions/lib/utils'
import { useAppForm } from '@/integrations/tanstack-form/hooks/form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/features/abstractions/components/primitives/card'
import {
  Field,
  FieldDescription,
  FieldGroup,
} from '@/features/abstractions/components/primitives/field'

const formSchema = z.object({
  email: z.email('Invalid email address').nonempty('Email is required'),
})

export interface RequestPasswordResetFormProps extends React.ComponentProps<'div'> {
  onFormSubmit?: (data: { email: string }) => Promise<boolean>
}

export function RequestPasswordResetForm({
  onFormSubmit = noop,
  className,
  children,
  ...props
}: RequestPasswordResetFormProps) {
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
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Reset your password</CardTitle>
          <CardDescription>
            Enter your email address and we will send you a password reset link.
          </CardDescription>
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
                name="email"
                children={(field) => (
                  <field.Input type="email" label="Email" placeholder="me@example.com" />
                )}
              />
              <form.AppForm>
                <form.SubscribeButton label="Send password reset email" />

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
