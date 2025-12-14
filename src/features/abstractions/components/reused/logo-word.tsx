import { cn } from '@/features/abstractions/lib/utils'

export function LogoWord({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span className={cn('', className)} {...props}>
      Contactory
    </span>
  )
}
