import { z } from 'zod'
import { Link } from '@tanstack/react-router'

import { cn, noop } from '@/features/abstractions/lib/utils'
import { useAppForm } from '@/integrations/tanstack-form/hooks/form'
import { Button } from '@/features/abstractions/components/primitives/button'
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
  FieldSeparator,
} from '@/features/abstractions/components/primitives/field'

const formSchema = z
  .object({
    name: z.string().nonempty('Name is required'),
    email: z.email('Invalid email address').nonempty('Email is required'),
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

export interface SignupFormProps extends React.ComponentProps<'div'> {
  onFormSubmit?: (data: { name: string; email: string; password: string }) => Promise<void>
}

export function SignupForm({
  onFormSubmit = noop,
  className,
  children,
  ...props
}: SignupFormProps) {
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
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your free account</CardTitle>
          <CardDescription>Sign up with your Google account</CardDescription>
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
              <Field>
                <Button variant="outline" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Sign up with Google
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card uppercase">
                Or continue with email
              </FieldSeparator>

              <form.AppField
                name="name"
                children={(field) => (
                  <field.Input type="name" label="Name" placeholder="Jone Doe" />
                )}
              />

              <form.AppField
                name="email"
                children={(field) => (
                  <field.Input type="email" label="Email" placeholder="me@example.com" />
                )}
              />

              <form.AppField
                name="password"
                children={(field) => <field.Input type="password" label="Password" />}
              />

              <form.AppField
                name="passwordConfirm"
                children={(field) => <field.Input type="password" label="Confirm Password" />}
              />

              <form.AppForm>
                <form.SubscribeButton label="Sign Up" />

                <FieldDescription className="text-center">
                  Already have an account? <Link to="/signin">Sign in</Link>
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
