import { MoonIcon, SunIcon } from 'lucide-react'

import type { Theme } from '@/shared/theme/schemas'

import { cn } from '@/integrations/shadcn/lib/utils'
import { noop } from '@/shared/utils/noop'
import { Button } from '@/integrations/shadcn/components/ui/button'

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
