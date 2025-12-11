import { Link } from '@tanstack/react-router'

import type { Session } from '@/integrations/better-auth/auth-client'
import type { Theme } from '@/features/abstractions/components/reused/theme'

import { cn } from '@/features/abstractions/lib/utils'
import { useSignOut } from '@/features/users/hooks/use-sign-out'
import { Button } from '@/features/abstractions/components/primitives/button'
import { Spinner } from '@/features/abstractions/components/primitives/spinner'
import { LiliLogo } from '@/features/abstractions/components/reused/lili-logo'

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
        <LiliLogo />
      </Link>
    </div>
  )
}

export function HeaderSignOutButton() {
  const { signOut, isSigningOut } = useSignOut()
  return (
    <Button variant="outline" className="min-w-25" onClick={() => signOut()}>
      {isSigningOut ? <Spinner /> : 'Sign Out'}
    </Button>
  )
}

export function HeaderActions({
  children,
  ...props
}: React.ComponentProps<'div'> & { session: Session | null; theme?: Theme }) {
  return (
    <div data-slot="header-actions" className="flex items-center justify-end gap-2" {...props}>
      {children}
    </div>
  )
}
