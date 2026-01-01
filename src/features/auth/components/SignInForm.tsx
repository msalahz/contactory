import { z } from 'zod'
import { Link } from '@tanstack/react-router'

import { noop } from '@/shared/utils/noop'
import { LogoIcon } from '@/shared/components/Logo'
import { cn } from '@/integrations/shadcn/lib/utils'
import { Button } from '@/integrations/shadcn/components/ui/button'
import { useAppForm } from '@/integrations/tanstack-form/hooks/form'
import { Spinner } from '@/integrations/shadcn/components/ui/spinner'
import { Field, FieldGroup, FieldSeparator } from '@/integrations/shadcn/components/ui/field'

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
            <h1 className="mt-4 mb-1 text-xl font-semibold">Sign In to Contactory</h1>
            <p>Welcome back! Sign in to continue</p>
          </div>

          <div className="mt-6">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              disabled={isSigningInSocial}
              onClick={signInGoogle}
            >
              {isSigningInSocial ? (
                <Spinner className="size-4" />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="0.98em"
                  height="1em"
                  viewBox="0 0 256 262"
                >
                  <path
                    fill="#4285f4"
                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                  ></path>
                  <path
                    fill="#34a853"
                    d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                  ></path>
                  <path
                    fill="#fbbc05"
                    d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                  ></path>
                  <path
                    fill="#eb4335"
                    d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                  ></path>
                </svg>
              )}

              <span>Google</span>
            </Button>
          </div>

          <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <hr className="border-dashed" />
            <span className="text-muted-foreground text-xs">Or continue With</span>
            <hr className="border-dashed" />
          </div>

          <div className="space-y-6">
            <FieldGroup>
              {children ? <Field>{children}</Field> : null}
              <Field hidden>
                <Button variant="outline" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Google
                </Button>
              </Field>
              <FieldSeparator
                hidden
                className="*:data-[slot=field-separator-content]:bg-card uppercase"
              >
                Or continue with email
              </FieldSeparator>
              <form.AppField
                name="email"
                children={(field) => (
                  <field.Input type="email" label="Email" placeholder="me@example.com" />
                )}
              />
              <form.AppField
                name="password"
                children={(field) => (
                  <field.Input
                    type="password"
                    label="Password"
                    labelChildren={
                      <Link
                        to="/forgot-password"
                        className="text-foreground ml-auto text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    }
                  />
                )}
              />
              <form.AppForm>
                <form.SubmitButton label="Sign in" className="w-full" />
              </form.AppForm>
            </FieldGroup>
          </div>
        </div>

        <p className="text-accent-foreground text-center text-sm">
          Don't have an account ?
          <Button asChild variant="link" className="px-2">
            <Link to="/sign-up">Create account</Link>
          </Button>
        </p>
      </form>
    </section>
  )
}
