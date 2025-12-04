import { Link } from '@tanstack/react-router'
import { cn } from '@/features/abstractions/lib/utils'
import { useSession } from '@/integrations/better-auth/auth-client'
import { Logo } from '@/features/abstractions/components/reused/logo'
import { Theme } from '@/features/abstractions/components/reused/theme'
import { Skeleton } from '@/features/abstractions/components/primitives/skeleton'
import {
  Button,
  buttonVariants,
} from '@/features/abstractions/components/primitives/button'

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

export function HeaderActions(props: React.ComponentProps<'div'>) {
  const { data, isPending } = useSession()
  return (
    <div
      data-slot="header-actions"
      className="flex items-center justify-end gap-2"
      {...props}
    >
      {isPending ? (
        <Skeleton className={cn(buttonVariants({ variant: 'outline' }))}>
          <p className="invisible">Sign Out</p>
        </Skeleton>
      ) : data?.user ? (
        <Button asChild variant="outline">
          <Link to="/sign-out">Sign Out</Link>
        </Button>
      ) : (
        <>
          <Button asChild variant="outline">
            <Link to="/signin">Signin</Link>
          </Button>

          <Button asChild>
            <Link to="/signup">Signup</Link>
          </Button>
        </>
      )}

      <Theme />
    </div>
  )
}

Header.Logo = HeaderLogo
Header.Actions = HeaderActions
