import type { Language } from '@/server/schemas/shared'

import { noop } from '@/shared/utils/noop'
import { cn } from '@/integrations/shadcn/lib/utils'
import { Button } from '@/integrations/shadcn/components/ui/button'

export function LanguageToggleIcon({ language }: { language: Language }) {
  return (
    <>
      <span className={cn('m-auto hidden text-xs', language === 'ar' ? 'block' : '')}>AR</span>
      <span className={cn('m-auto hidden text-xs', language === 'en' ? 'block' : '')}>EN</span>
    </>
  )
}

export interface LanguageToggleButtonProps extends Omit<
  React.ComponentProps<typeof Button>,
  'onChange'
> {
  language: Language
  onChange?: (language: Language) => void
}

export function LanguageToggleButton({
  children,
  language,
  onChange = noop,
  ...props
}: LanguageToggleButtonProps) {
  return (
    <Button
      size="icon-sm"
      variant="outline"
      onClick={() => onChange(language === 'ar' ? 'en' : 'ar')}
      {...props}
    >
      <LanguageToggleIcon language={language} />
      {children}
    </Button>
  )
}
