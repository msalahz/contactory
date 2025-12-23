import { MoonIcon, SunIcon } from 'lucide-react'

import type { Theme } from '@/features/abstractions/theme/models'

import { cn, noop } from '@/features/abstractions/lib/utils'
import { Button } from '@/features/abstractions/components/primitives/button'

export interface ThemeToggleProps extends Omit<React.ComponentProps<typeof Button>, 'onChange'> {
  theme: Theme
  onChange?: (theme: Theme) => void
}

/**
 * @description Theme toggle button component
 * @param theme - Current theme
 * @param onChange - Theme change handler
 * @param props - Button props
 */
export function ThemeToggle({ theme, onChange = noop, ...props }: ThemeToggleProps) {
  return (
    <Button
      size="icon"
      variant="outline"
      onClick={() => onChange(theme === 'light' ? 'dark' : 'light')}
      {...props}
    >
      <MoonIcon
        className={cn('transition-all ease-in-out', theme === 'light' ? 'hidden' : 'block')}
      />
      <SunIcon
        className={cn('transition-all ease-in-out', theme === 'dark' ? 'hidden' : 'block')}
      />
    </Button>
  )
}
