import { cn } from '@/features/abstractions/lib/utils'

export function LogoIcon({ className, ...props }: React.ComponentProps<'img'>) {
  return <img src="/logo.svg" alt="Logo" className={cn('size-8', className)} {...props} />
}

export function LogoWord({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span className={cn('', className)} {...props}>
      Contactory
    </span>
  )
}

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
