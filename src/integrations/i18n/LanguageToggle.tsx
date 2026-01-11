import type { Language } from '@/core/schemas'

import { noop } from '@/core/utils/noop'
import { Button } from '@/integrations/shadcn/components/ui/button'

export function LanguageToggleIcon({ language }: { language: Language }) {
  return <span className="text-xs">{language === 'ar' ? 'AR' : 'EN'}</span>
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
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onChange(language === 'ar' ? 'en' : 'ar')
      }}
      {...props}
    >
      <LanguageToggleIcon language={language} />
      {children}
    </Button>
  )
}
