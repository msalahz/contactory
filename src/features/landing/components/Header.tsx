import * as React from 'react'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { LogOutIcon, Menu, X } from 'lucide-react'

import type { Language, Theme } from '@/server/schemas/shared'
import type { User } from '@/integrations/better-auth/authClient'

import { noop } from '@/shared/utils/noop'
import { Logo } from '@/shared/components/Logo'
import { cn } from '@/integrations/shadcn/lib/utils'
import { ThemeToggleIcon } from '@/shared/theme/ThemeToggle'
import { Button } from '@/integrations/shadcn/components/ui/button'
import { Spinner } from '@/integrations/shadcn/components/ui/spinner'
import { LanguageToggleButton } from '@/integrations/i18n/LanguageToggle'

export interface HeroHeaderProps {
  user: User | null
  theme: Theme
  onThemeChange: (theme: Theme) => void
  isSigningOut: boolean
  onSignOutClick: () => void
}

export const HeroHeader = ({
  user,
  theme,
  onThemeChange = noop,
  isSigningOut = false,
  onSignOutClick = noop,
}: HeroHeaderProps) => {
  const [menuState, setMenuState] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const { t, i18n } = useTranslation('landing')

  const menuItems = React.useMemo(
    () => [
      { name: t('Features'), href: '#features' },
      { name: t('About'), href: '#about' },
      { name: t('FAQ'), href: '#faq' },
    ],
    [t],
  )

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <header>
      <nav data-state={menuState && 'active'} className="fixed z-20 w-full px-2">
        <div
          className={cn(
            'mx-auto mt-2 flex max-w-6xl items-center justify-center gap-2 px-6 transition-all duration-300 lg:px-12',
            isScrolled && 'bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5',
          )}
        >
          <div className="relative flex flex-1 flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <Link to="/" aria-label={t('Home')} className="flex items-center space-x-2">
                <Logo />
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? t('Close menu') : t('Open menu')}
                className="relative z-20 -m-2.5 -me-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="m-auto size-6 duration-200 in-data-[state=active]:scale-0 in-data-[state=active]:rotate-180 in-data-[state=active]:opacity-0" />
                <X className="absolute inset-0 m-auto size-6 scale-0 -rotate-180 opacity-0 duration-200 in-data-[state=active]:scale-100 in-data-[state=active]:rotate-0 in-data-[state=active]:opacity-100" />
              </button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className="text-muted-foreground hover:text-accent-foreground block duration-150"
                    >
                      <span>{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-background mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 in-data-[state=active]:block md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none lg:in-data-[state=active]:flex dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        to={item.href}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                {user?.id ? (
                  <Button asChild size="sm" className={cn('lg:inline-flex')}>
                    <Link to="/dashboard">
                      <span>{t('My Account')}</span>
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className={cn(isScrolled && 'lg:hidden')}
                    >
                      <Link to="/sign-in">
                        <span>{t('Sign In')}</span>
                      </Link>
                    </Button>
                    <Button asChild size="sm" className={cn(isScrolled && 'lg:hidden')}>
                      <Link to="/sign-up">
                        <span>{t('Sign Up')}</span>
                      </Link>
                    </Button>
                    <Button
                      asChild
                      size="sm"
                      className={cn(isScrolled ? 'lg:inline-flex' : 'hidden')}
                    >
                      <Link to="/sign-up">
                        <span>{t('Get Started')}</span>
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-initial gap-2">
            <Button
              variant="outline"
              size="icon-sm"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onThemeChange(theme === 'light' ? 'dark' : 'light')
              }}
            >
              <ThemeToggleIcon theme={theme} />
            </Button>

            <LanguageToggleButton
              language={i18n.language as Language}
              onChange={(language) => i18n.changeLanguage(language)}
            />

            {user?.id ? (
              <Button
                variant="outline"
                size="icon-sm"
                disabled={isSigningOut}
                onClick={onSignOutClick}
              >
                {isSigningOut ? <Spinner /> : <LogOutIcon />}
              </Button>
            ) : null}
          </div>
        </div>
      </nav>
    </header>
  )
}
