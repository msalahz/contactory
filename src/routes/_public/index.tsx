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
      <HeroHeader
        user={user}
        theme={theme}
        onThemeChange={setTheme}
        onSignOutClick={signOut}
        isSigningOut={isSigningOut}
      />
      <HeroSection user={user} />
      <Features />
      <AboutSection />
      <StatsSection />
      <FAQs />
      <FooterSection />
    </div>
  )
}
