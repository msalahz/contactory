import { MoonIcon, SunIcon } from 'lucide-react'

import type { Theme } from '@/core/schemas'

import { noop } from '@/core/utils/noop'
import { Button } from '@/integrations/shadcn/components/ui/button'

export function ThemeToggleIcon({ theme }: { theme: Theme }) {
  return theme === 'dark' ? <MoonIcon /> : <SunIcon />
}

export interface ThemeToggleButtonProps extends Omit<
  React.ComponentProps<typeof Button>,
  'onChange'
> {
  theme: Theme
  onChange?: (theme: Theme) => void
}

export function ThemeToggleButton({
  children,
  theme,
  onChange = noop,
  ...props
}: ThemeToggleButtonProps) {
  return (
    <Button
      size="icon-sm"
      variant="outline"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onChange(theme === 'light' ? 'dark' : 'light')
      }}
      {...props}
    >
      <ThemeToggleIcon theme={theme} />
      {children}
    </Button>
  )
}
