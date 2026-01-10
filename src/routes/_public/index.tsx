import { createFileRoute } from '@tanstack/react-router'

import { useTheme } from '@/core/theme/useTheme'
import { findAuthUserFn } from '@/backend/queries/auth'
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
    const authUser = await findAuthUserFn()
    return { authUser }
  },
})

function LandingPage() {
  const { authUser } = Route.useLoaderData()
  const { theme, setTheme } = useTheme()
  const { signOut, isSigningOut } = useSignOut()
  return (
    <div className="relative min-h-screen">
      <TechnicalBackground />
      <div className="bg-background/5 relative z-10">
        <div>
          <HeroHeader
            user={authUser}
            theme={theme}
            onThemeChange={setTheme}
            isSigningOut={isSigningOut}
            onSignOutClick={() => signOut({ data: { redirectTo: '/' } })}
          />
          <HeroSection user={authUser} />
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
