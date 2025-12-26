import { Link, Outlet, createFileRoute } from '@tanstack/react-router'

import { useTheme } from '@/shared/theme/useTheme'
import { ThemeToggle } from '@/shared/theme/ThemeToggle'
import { Button } from '@/integrations/shadcn/components/ui/button'
import {
  SiteFooter,
  SiteFooterCopyrights,
  SiteHeader,
  SiteHeaderActions,
  SiteHeaderLogo,
  SiteHeaderSignOutButton,
} from '@/shared/components/Site'

export const Route = createFileRoute('/_public')({
  component: RouteComponent,
})

function RouteComponent() {
  const { session } = Route.useRouteContext()
  const { theme, setTheme } = useTheme()

  return (
    <section className="h-dvh overflow-y-auto">
      <SiteHeader className="h-15">
        <SiteHeaderLogo />
        <SiteHeaderActions session={session}>
          {session?.user ? (
            <>
              <SiteHeaderSignOutButton />
              <Button asChild className="min-w-25">
                <Link to="/dashboard">My Contacts</Link>
              </Button>
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

          <ThemeToggle theme={theme} onChange={setTheme} />
        </SiteHeaderActions>
      </SiteHeader>

      <section className="flex min-h-0 flex-col overflow-auto">
        <div className="flex-1">
          <Outlet />
        </div>
      </section>

      <SiteFooter className="mt-auto w-full">
        <SiteFooterCopyrights />
      </SiteFooter>
    </section>
  )
}
