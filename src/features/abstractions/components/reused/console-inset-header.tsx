import { cn } from '@/features/abstractions/lib/utils'
import { SidebarTrigger } from '@/features/abstractions/components/primitives/sidebar'

export function ConsoleInsetHeader({
  children,
  className,
  ...props
}: React.ComponentProps<'header'>) {
  return (
    <header
      className={cn(
        'flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12',
        className,
      )}
      {...props}
    >
      <div className="flex w-full items-start gap-1 px-3 lg:gap-2 lg:px-4">
        <div>
          <SidebarTrigger />
        </div>

        <div className="flex flex-1">{children}</div>
      </div>
    </header>
  )
}
