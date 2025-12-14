import { cn } from '@/features/abstractions/lib/utils'

export function LogoIcon({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        'bg-primary/10 hover:bg-primary/20 flex size-8 rotate-45 items-center justify-center rounded',
        className,
      )}
      {...props}
    >
      lili
    </span>
  )
}
