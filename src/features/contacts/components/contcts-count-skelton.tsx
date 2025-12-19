import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/features/abstractions/components/primitives/card'
import { Skeleton } from '@/features/abstractions/components/primitives/skeleton'
import { cn } from '@/features/abstractions/lib/utils'

export function ContactsCountSkeleton({ className, ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card className={cn('', className)} {...props}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-medium">
          <Skeleton className="h-7 w-36 rounded-xl" />
        </CardTitle>
        <Skeleton className="size-10 rounded-full" />
      </CardHeader>
      <CardContent className="mt-auto">
        <div className="text-2xl font-bold">
          <Skeleton className="h-8 w-32 rounded-xl" />
        </div>
        <Skeleton className="mt-1 h-4 w-40 rounded-xl" />
      </CardContent>
    </Card>
  )
}
