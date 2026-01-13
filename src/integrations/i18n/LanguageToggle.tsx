import type { Language } from '@/core/schemas'

import { noop } from '@/core/utils/noop'
import { Button } from '@/integrations/shadcn/components/ui/button'

export function LanguageToggleIcon({ language }: { language: Language }) {
  return (
    <span className="size-4 text-center align-bottom text-xs">
      {language === 'ar' ? (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text
            x="50%"
            y="55%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="16"
            fontWeight="600"
            fill="currentColor"
          >
            AR
          </text>
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text
            x="50%"
            y="55%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="16"
            fontWeight="600"
            fill="currentColor"
          >
            EN
          </text>
        </svg>
      )}
    </span>
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
