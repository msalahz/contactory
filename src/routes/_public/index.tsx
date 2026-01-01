import { createFileRoute } from '@tanstack/react-router'

import { useTheme } from '@/shared/theme/useTheme'
import { finsSessionFn } from '@/server/queries/auth'
import { FAQs } from '@/features/landing/components/Faqs'
import { useSignOut } from '@/features/auth/hooks/useSignOut'
import { Features } from '@/features/landing/components/Features'
import { HeroHeader } from '@/features/landing/components/Header'
import { StatsSection } from '@/features/landing/components/Stats'
import { AboutSection } from '@/features/landing/components/About'
import { FooterSection } from '@/features/landing/components/Footer'
import { HeroSection } from '@/features/landing/components/HeroSection'
import { TechnicalBackground } from '@/features/landing/components/TechnicalBackground'

export const Route = createFileRoute('/_public/')({
  component: LandingPage,
  async loader() {
    const session = await finsSessionFn()
    return { user: session?.user || null }
  },
})

function LandingPage() {
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
