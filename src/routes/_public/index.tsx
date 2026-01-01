import { createFileRoute } from '@tanstack/react-router'

import { useTheme } from '@/shared/theme/useTheme'
import { finsSessionFn } from '@/server/queries/auth'
import { FAQs } from '@/features/landing/components/faqs'
import { useSignOut } from '@/features/users/hooks/useSignOut'
import { Features } from '@/features/landing/components/features'
import { HeroHeader } from '@/features/landing/components/header'
import { StatsSection } from '@/features/landing/components/stats'
import { AboutSection } from '@/features/landing/components/about'
import { FooterSection } from '@/features/landing/components/footer'
import { HeroSection } from '@/features/landing/components/heroSection'
import { TechnicalBackground } from '@/features/landing/components/TechnicalBackground'

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
    <div className="relative min-h-screen">
      <TechnicalBackground />
      <div className="bg-background/5 relative z-10">
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
        <AboutSection className="bg-background/20" />
        <StatsSection className="bg-secondary/20" />
        <FAQs className="bg-background/20" />
        <FooterSection className="bg-secondary/20" />
      </div>
    </div>
  )
}
