import { Link, Outlet, createFileRoute } from '@tanstack/react-router'

import { Footer } from '@/features/abstractions/components/reused/footer'
import { Layout } from '@/features/abstractions/components/reused/layout'
import { Button } from '@/features/abstractions/components/primitives/button'
import { ThemeToggle, useTheme } from '@/features/abstractions/components/reused/theme'
import {
  Header,
  HeaderActions,
  HeaderLogo,
  HeaderSignOutButton,
} from '@/features/abstractions/components/reused/header'

export const Route = createFileRoute('/_Layout')({
  component: RouteComponent,
})

function RouteComponent() {
  const { session } = Route.useRouteContext()
  const { theme, setTheme } = useTheme()

  return (
    <Layout>
      <Header className="h-15">
        <HeaderLogo />
        <HeaderActions session={session}>
          {session?.user ? (
            <>
              <span className="hidden italic lg:block">Welcome, {session.user.name}</span>
              <HeaderSignOutButton />
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
        </HeaderActions>
      </Header>

      <section className="flex min-h-0 flex-col overflow-auto">
        <div className="flex-1">
          <Outlet />
        </div>
      </section>

      <Footer className="mt-auto w-full">
        <Footer.Copyrights />
      </Footer>
    </Layout>
  )
}
