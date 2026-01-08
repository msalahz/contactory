import { MoonIcon, SunIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import type { Theme } from '@/server/schemas/shared'

import { noop } from '@/shared/utils/noop'
import { cn } from '@/integrations/shadcn/lib/utils'
import { Button } from '@/integrations/shadcn/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/integrations/shadcn/components/ui/dropdown-menu'

export interface ThemeDropdownMenuProps extends Omit<
  React.ComponentProps<typeof Button>,
  'onChange'
> {
  theme: Theme
  onChange?: (theme: Theme) => void
}

export function ThemeDropdownMenu({
  theme,
  className,
  onChange = noop,
  ...props
}: ThemeDropdownMenuProps) {
  const { t } = useTranslation('shared')

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon-sm"
          variant="outline"
          className={cn('focus-visible:ring-0 focus-visible:outline-0', className)}
          {...props}
        >
          <MoonIcon
            className={cn('hidden transition-all ease-in-out', theme === 'dark' ? 'block' : '')}
          />
          <SunIcon
            className={cn('hidden transition-all ease-in-out', theme === 'light' ? 'block' : '')}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-fit">
        <DropdownMenuItem onClick={() => onChange('light')}>
          <SunIcon />
          {t('Light')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange('dark')}>
          <MoonIcon />
          {t('Dark')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
