import { cn } from '@/integrations/shadcn/lib/utils'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('bg-muted animate-pulse rounded-none', className)}
      {...props}
    />
  )
}

export { Skeleton }
