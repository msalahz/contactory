import { Link } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { useMutation } from '@tanstack/react-query'

import { cn } from '@/features/abstractions/lib/utils'
import { Session } from '@/integrations/better-auth/auth-client'
import { signOutFn } from '@/features/users/functions/sign-out-fn'
import { Logo } from '@/features/abstractions/components/reused/logo'
import { Theme } from '@/features/abstractions/components/reused/theme'
import { Button } from '@/features/abstractions/components/primitives/button'
import { Spinner } from '@/features/abstractions/components/primitives/spinner'

export function Header(props: React.ComponentProps<'header'>) {
  return (
    <header
      {...props}
      data-slot="header"
      className={cn(
        'bg-primary/5 sticky top-0 z-50 flex w-full items-center justify-between px-4 py-3 shadow shadow-black/10 dark:shadow-white/10',
        props.className,
      )}
    />
  )
}

export function HeaderLogo(props: React.ComponentProps<'div'>) {
  return (
    <div
      {...props}
      data-slot="header-logo"
      className={cn('flex items-center justify-start gap-0', props.className)}
    >
      <Link to="/">
        <Logo />
      </Link>
    </div>
  )
}

export function HeaderSignOutButton() {
  const signOut = useServerFn(signOutFn)
  const { mutate: signOutMutation, isPending } = useMutation({
    mutationKey: ['signing-out'],
    mutationFn: () => signOut(),
  })
  return (
    <Button
      variant="outline"
      className="min-w-25"
      onClick={() => signOutMutation()}
    >
      {isPending ? <Spinner /> : 'Sign Out'}
    </Button>
  )
}

export function HeaderActions({
  children,
  session,
  ...props
}: React.ComponentProps<'div'> & { session: Session | null }) {
  return (
    <div
      data-slot="header-actions"
      className="flex items-center justify-end gap-2"
      {...props}
    >
      {session?.user ? (
        <>
          <span className="italic">Welcome back, {session.user.name}</span>
          {children}
        </>
      ) : (
        <>
          <Button asChild variant="outline" className="min-w-25">
            <Link to="/signin">Signin</Link>
          </Button>

          <Button asChild className="min-w-25">
            <Link to="/signup">Signup</Link>
          </Button>
        </>
      )}

      <Theme />
    </div>
  )
}
