import { z } from 'zod'

import type { User } from '@/integrations/better-auth/authClient'

import { cn } from '@/integrations/shadcn/lib/utils'
import { useAppForm } from '@/integrations/tanstack-form/hooks/form'
import { FieldGroup } from '@/integrations/shadcn/components/ui/field'

const formSchema = z.object({
  name: z.string().nonempty('Name is required'),
  image: z.union([z.url('Invalid URL'), z.literal('')]),
})

export type UserProfileFormData = z.infer<typeof formSchema>

export interface UserProfileFormProps extends React.ComponentProps<'form'> {
  user?: User
  onFormSubmit?: (data: UserProfileFormData) => Promise<void>
}

export function UserProfileForm({ user, className, onFormSubmit, ...props }: UserProfileFormProps) {
  const form = useAppForm({
    defaultValues: {
      name: user?.name ?? '',
      image: user?.image ?? '',
    },
    validators: {
      onSubmit: formSchema,
    },
    async onSubmit({ value }) {
      await onFormSubmit?.(value)
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        void form.handleSubmit()
      }}
      className={cn('space-y-6', className)}
      {...props}
    >
      <FieldGroup>
        <form.AppField
          name="name"
          children={(field) => <field.Input type="text" label="Name" placeholder="John Doe" />}
        />

        <form.AppField
          name="image"
          children={(field) => <field.Input type="file" label="Avatar" />}
        />

        <form.AppForm>
          <div className="grid w-full grid-cols-2 items-center justify-end gap-2">
            <form.ResetButton label="Reset" variant="secondary" />
            <form.SubmitButton label="Save Changes" />
          </div>
        </form.AppForm>
      </FieldGroup>
    </form>
  )
}
