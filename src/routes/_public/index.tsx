import { createFileRoute } from '@tanstack/react-router'

import { FAQs } from '@/features/landing/components/faqs'
import { finsSessionFn } from '@/server/queries/auth'
import { Features } from '@/features/landing/components/features'
import { HeroHeader } from '@/features/landing/components/header'
import { StatsSection } from '@/features/landing/components/stats'
import { AboutSection } from '@/features/landing/components/about'
import { FooterSection } from '@/features/landing/components/footer'
import { HeroSection } from '@/features/landing/components/heroSection'
import { useTheme } from '@/shared/theme/useTheme'
import { useSignOut } from '@/features/users/hooks/useSignOut'

export const Route = createFileRoute('/_public/')({
  component: App,
  async loader() {
    const session = await finsSessionFn()
    return { user: session?.user || null }
  },
})

function App() {
  const { user } = Route.useLoaderData()
  const { theme, setTheme } = useTheme()
  const { signOut, isSigningOut } = useSignOut()
  return (
    <div className="min-h-screen">
      <div>
        <HeroHeader
          user={user}
          theme={theme}
          onThemeChange={setTheme}
          isSigningOut={isSigningOut}
          onSignOutClick={() => signOut({ data: { redirectTo: '/' } })}
        />
        <HeroSection user={user} />
      </div>
      <Features className="bg-secondary/20" />
      <AboutSection />
      <StatsSection className="bg-secondary/20" />
      <FAQs />
      <FooterSection className="bg-secondary/20" />
    </div>
  )
}
