import { Link, Outlet, createFileRoute } from '@tanstack/react-router'

import { Button } from '@/features/abstractions/components/primitives/button'
import {
  SiteFooter,
  SiteFooterCopyrights,
} from '@/features/abstractions/components/site/site-footer'
import { ThemeToggle, useTheme } from '@/features/abstractions/components/reused/theme'
import {
  SiteHeader,
  SiteHeaderActions,
  SiteHeaderLogo,
  SiteHeaderSignOutButton,
} from '@/features/abstractions/components/site/site-header'

export const Route = createFileRoute('/_site')({
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
                <Link to="/console">My Contacts</Link>
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
