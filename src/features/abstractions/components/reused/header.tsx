import { Link } from '@tanstack/react-router'
import { Logo } from '@/features/abstractions/components/reused/logo'
import { Button } from '@/features/abstractions/components/primitives/button'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full flex items-center justify-between px-4 py-3 shadow shadow-black/10 dark:shadow-white/10">
      <div className="flex justify-start items-center gap-0">
        <Link to="/">
          <Logo />
        </Link>
      </div>

      <div className="flex justify-end items-center gap-2">
        <Button asChild variant="outline">
          <Link to="/signin">Signin</Link>
        </Button>

        <Button asChild>
          <Link to="/signup">Signup</Link>
        </Button>
      </div>
    </header>
  )
}
