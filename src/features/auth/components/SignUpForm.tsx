import { z } from 'zod'
import { Link } from '@tanstack/react-router'

import { noop } from '@/shared/utils/noop'
import { LogoIcon } from '@/shared/components/Logo'
import { cn } from '@/integrations/shadcn/lib/utils'
import { GoogleIcon } from '@/shared/components/GoogleIcon'
import { Button } from '@/integrations/shadcn/components/ui/button'
import { useAppForm } from '@/integrations/tanstack-form/hooks/form'
import { Spinner } from '@/integrations/shadcn/components/ui/spinner'
import { Field, FieldGroup } from '@/integrations/shadcn/components/ui/field'

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
            <Link to="/" aria-label="go home">
              <LogoIcon />
            </Link>
            <h1 className="mt-4 mb-1 text-xl font-semibold">Create a Contactory Account</h1>
            <p>Welcome! Create an account to get started</p>
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

              <span>Google</span>
            </Button>
          </div>

          <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <hr className="border-dashed" />
            <span className="text-muted-foreground text-xs">Or continue With</span>
            <hr className="border-dashed" />
          </div>

          <FieldGroup>
            {children ? <Field>{children}</Field> : null}

            <form.AppField
              name="name"
              children={(field) => <field.Input type="name" label="Name" placeholder="Jone Doe" />}
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
              <form.SubmitButton label="Sign Up" />
            </form.AppForm>
          </FieldGroup>
        </div>

        <p className="text-accent-foreground text-center text-sm">
          Have an account ?
          <Button asChild variant="link" className="px-2">
            <Link to="/sign-in">Sign In</Link>
          </Button>
        </p>
      </form>
    </section>
  )
}
