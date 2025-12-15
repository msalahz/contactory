import { cn } from '@/features/abstractions/lib/utils'
import { LogoIcon } from '@/features/abstractions/components/reused/logo-icon'
import { LogoWord } from '@/features/abstractions/components/reused/logo-word'

export function Logo({
  className,
  iconClassName,
  wordClassName,
  ...props
}: React.ComponentProps<'h1'> & {
  iconClassName?: string
  wordClassName?: string
}) {
  return (
    <h1
      className={cn(
        'flex w-fit items-center gap-2 text-2xl transition-all duration-200 ease-in-out',
        className,
      )}
      {...props}
    >
      <LogoIcon className={iconClassName} />
      <LogoWord className={wordClassName} />
    </h1>
  )
}
