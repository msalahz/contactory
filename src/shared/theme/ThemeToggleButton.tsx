import { MoonIcon, SunIcon } from 'lucide-react'

import type { Theme } from '@/server/schemas/theme'

import { noop } from '@/shared/utils/noop'
import { cn } from '@/integrations/shadcn/lib/utils'
import { Button } from '@/integrations/shadcn/components/ui/button'

export interface ThemeToggleButtonProps extends Omit<
  React.ComponentProps<typeof Button>,
  'onChange'
> {
  theme: Theme
  onChange?: (theme: Theme) => void
}

export function ThemeToggleButton({
  theme,
  className,
  onChange = noop,
  ...props
}: ThemeToggleButtonProps) {
  return (
    <Button
      size="icon-sm"
      variant="outline"
      className={cn('', className)}
      onClick={() => onChange(theme === 'light' ? 'dark' : 'light')}
      {...props}
    >
      <MoonIcon className={cn('hidden', theme === 'dark' ? 'block' : '')} />
      <SunIcon className={cn('hidden', theme === 'light' ? 'block' : '')} />
    </Button>
  )
}
