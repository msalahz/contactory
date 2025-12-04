import { Link } from '@tanstack/react-router'
import { cn } from '@/features/abstractions/lib/utils'
import { Logo } from '@/features/abstractions/components/reused/logo'
import { Button } from '@/features/abstractions/components/primitives/button'

export function Header(props: React.ComponentProps<'header'>) {
  return (
    <header
      {...props}
      data-slot="header"
      className={cn(
        'sticky top-0 z-50 w-full flex items-center justify-between px-4 py-3 shadow shadow-black/10 dark:shadow-white/10 bg-primary/10',
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
      className={cn('flex justify-start items-center gap-0', props.className)}
    >
      <Link to="/">
        <Logo />
      </Link>
    </div>
  )
}

export function HeaderActions(props: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="header-actions"
      className="flex justify-end items-center gap-2"
      {...props}
    >
      <Button asChild variant="outline">
        <Link to="/signin">Signin</Link>
      </Button>

      <Button asChild>
        <Link to="/signup">Signup</Link>
      </Button>
    </div>
  )
}

Header.Logo = HeaderLogo
Header.Actions = HeaderActions
