import { createFileRoute } from '@tanstack/react-router'

import { FAQs } from '@/features/landing/components/faqs'
import { Features } from '@/features/landing/components/features'
import { StatsSection } from '@/features/landing/components/stats'
import { FooterSection } from '@/features/landing/components/footer'
import { HeroSection } from '@/features/landing/components/heroSection'
import { AboutSection } from '@/features/landing/components/about'

export const Route = createFileRoute('/_public/')({
  component: App,
})

function App() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <Features />
      <AboutSection />
      <StatsSection />
      <FAQs />
      <FooterSection />
    </div>
  )
}
