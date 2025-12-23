import { Link } from '@tanstack/react-router'

import type { Theme } from '@/features/abstractions/theme/models'
import type { Session } from '@/integrations/better-auth/authClient'

import { useSignOut } from '@/features/users/hooks'
import { cn } from '@/features/abstractions/lib/utils'
import { Logo } from '@/features/abstractions/components/reused/Logo'
import { Button } from '@/features/abstractions/components/primitives/button'
import { Spinner } from '@/features/abstractions/components/primitives/spinner'

export function SiteHeader(props: React.ComponentProps<'header'>) {
  return (
    <header
      {...props}
      data-slot="header"
      className={cn(
        'mx-auto mt-2 flex h-15 max-w-6xl items-center justify-between px-6 transition-all duration-300 lg:px-12',
        // 'bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5',
        props.className,
      )}
    />
  )
}

export function SiteHeaderLogo(props: React.ComponentProps<'div'>) {
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

export function SiteHeaderSignOutButton() {
  const { signOut, isSigningOut } = useSignOut()
  return (
    <Button variant="outline" className="min-w-25" onClick={() => signOut()}>
      {isSigningOut ? <Spinner /> : 'Sign Out'}
    </Button>
  )
}

export function SiteHeaderActions({
  children,
  ...props
}: React.ComponentProps<'div'> & { session: Session | null; theme?: Theme }) {
  return (
    <div data-slot="header-actions" className="flex items-center justify-end gap-2" {...props}>
      {children}
    </div>
  )
}

export function SiteFooter(props: React.ComponentProps<'footer'>) {
  return (
    <footer
      {...props}
      data-slot="footer"
      className={cn(
        'text-muted-foreground bg-primary/5 border-top-black/10 dark:border-top-white/10 border-t p-4 text-center text-sm',
        props.className,
      )}
    />
  )
}

export function SiteFooterCopyrights({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div {...props} data-slot="footer-copyrights" className={cn('text-sm', className)}>
      &copy; {new Date().getFullYear()}{' '}
      <a target="_blank" href="https://www.linkedin.com/in/msalahz/">
        Mohammed Zaghloul
      </a>
      . All rights reserved.
    </div>
  )
}
