import { cn } from '@/features/abstractions/lib/utils'

export function LogoIcon({ className, ...props }: React.ComponentProps<'img'>) {
  return <img src="/logo.svg" alt="Logo" className={cn('size-8', className)} {...props} />
}
