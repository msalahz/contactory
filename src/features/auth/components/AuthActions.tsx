import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { ChevronLeftIcon } from 'lucide-react'

import { useTheme } from '@/core/theme/useTheme'
import { ThemeToggleButton } from '@/core/theme/ThemeToggle'
import { Button } from '@/integrations/shadcn/components/ui/button'
import { LanguageToggleButton } from '@/integrations/i18n/LanguageToggle'

export function AuthActions() {
  const { t, i18n } = useTranslation('auth')
  const { theme, setTheme } = useTheme()
  return (
    <div className="dark:text-secondary-foreground/75 absolute start-0 end-0 top-6 h-fit">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-2 px-8">
        <Button asChild variant="link" className="text-secondary-foreground/75 no-underline!">
          <Link to="/">
            <ChevronLeftIcon className="rtl:rotate-180" />
            <span className="hover:text-secondary-foreground">{t('Home')}</span>
          </Link>
        </Button>
        <div className="flex items-center gap-2 p-1.5" data-testid="theme-toggle">
          <ThemeToggleButton theme={theme} onChange={setTheme} />
          <LanguageToggleButton language={i18n.language as any} onChange={i18n.changeLanguage} />
        </div>{' '}
      </div>
    </div>
  )
}
