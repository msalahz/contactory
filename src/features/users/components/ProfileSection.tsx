import { cn } from '@/integrations/shadcn/lib/utils'
import {
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/integrations/shadcn/components/ui/field'

export interface ProfileSectionProps extends React.ComponentProps<'div'> {
  title: string
  description?: string
  htmlFor?: string
}

export function ProfileSection({
  title,
  description,
  htmlFor,
  children,
  className,
  ...props
}: ProfileSectionProps) {
  return (
    <FieldGroup className={cn('bg-card rounded-lg border p-6 shadow-sm', className)} {...props}>
      <FieldContent className="mb-4 gap-0.5">
        <FieldLabel htmlFor={htmlFor} className="text-lg font-medium">
          {title}
        </FieldLabel>
        {description && <FieldDescription>{description}</FieldDescription>}
      </FieldContent>
      {children}
    </FieldGroup>
  )
}
