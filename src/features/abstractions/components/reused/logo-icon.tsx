import { cn } from '@/features/abstractions/lib/utils'

export function LogoIcon({ className, ...props }: React.ComponentProps<'img'>) {
  return <img src="/logo.svg" alt="Logo" className={cn('h-8 w-8', className)} {...props} />
}
