import { CircleAlertIcon, CircleCheckIcon, InfoIcon, TriangleAlert } from 'lucide-react'

import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import { cn } from '@/integrations/shadcn/lib/utils'
import { Item, ItemContent, ItemMedia } from '@/integrations/shadcn/components/ui/item'

const alertBoxVariants = cva('', {
  variants: {
    type: {
      default: 'text-foreground border-foreground bg-foreground/10',
      info: 'text-blue-600 border-blue-600 bg-blue-600/10',
      success: 'text-green-600 border-green-600 bg-green-600/10',
      warning: 'text-orange-600 border-orange-600 bg-orange-600/10',
      error: 'text-destructive border-destructive bg-destructive/10',
    },
  },
  defaultVariants: {
    type: 'default',
  },
})

export interface AlertBoxProps
  extends React.ComponentProps<typeof Item>, VariantProps<typeof alertBoxVariants> {}

const Icons = {
  default: null,
  info: <InfoIcon />,
  success: <CircleCheckIcon />,
  warning: <TriangleAlert />,
  error: <CircleAlertIcon />,
}

export function AlertBox({ children, type, ...props }: AlertBoxProps) {
  return (
    <Item
      {...props}
      size="sm"
      variant="muted"
      className={cn('', alertBoxVariants({ type }), props.className)}
    >
      <ItemMedia>{Icons[type || 'default']}</ItemMedia>
      <ItemContent>{children}</ItemContent>
    </Item>
  )
}
