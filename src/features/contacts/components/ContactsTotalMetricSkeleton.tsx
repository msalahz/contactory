import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/features/abstractions/components/primitives/card'
import { Skeleton } from '@/features/abstractions/components/primitives/skeleton'
import { cn } from '@/features/abstractions/lib/utils'

export function ContactsTotalMetricSkeleton({
  className,
  ...props
}: React.ComponentProps<typeof Card>) {
  return (
    <Card className={cn('gradient-bg', className)} {...props}>
      <CardHeader>
        <CardDescription>Your Network</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          <Skeleton className="h-8 w-20 rounded-xl" />
        </CardTitle>
        <CardAction>
          <Skeleton className="h-6 w-16 rounded-xl" />
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <Skeleton className="h-4 w-48 rounded-xl" />
      </CardFooter>
    </Card>
  )
}
