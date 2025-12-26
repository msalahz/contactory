import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/integrations/shadcn/components/ui/card'
import { Skeleton } from '@/integrations/shadcn/components/ui/skeleton'
import { cn } from '@/integrations/shadcn/lib/utils'

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
