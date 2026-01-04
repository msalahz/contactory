import { z } from 'zod'

import type { User } from '@/integrations/better-auth/authClient'

import { noop } from '@/shared/utils/noop'
import { userSchema } from '@/server/schemas/auth'
import { useAppForm } from '@/integrations/tanstack-form/hooks/form'
import { ProfileSection } from '@/features/users/components/ProfileSection'
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
} from '@/integrations/shadcn/components/ui/field'

export interface UserNameFormProps {
  user?: Partial<Pick<User, 'name'>>
  onFormSubmit?: (data: Pick<User, 'name'>) => Promise<void>
  className?: string
}

export function UserNameForm({ user, onFormSubmit = noop, className }: UserNameFormProps) {
  const form = useAppForm({
    defaultValues: {
      name: user?.name ?? '',
    },
    validators: {
      onSubmit: userSchema.pick({ name: true }).extend({
        name: z.string().nonempty('Name is required'),
      }),
    },
    async onSubmit({ value }) {
      await onFormSubmit?.({ name: value.name })
    },
  })

  return (
    <ProfileSection
      title="Display Name"
      description="This is your public display name"
      className={className}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          void form.handleSubmit()
        }}
      >
        <FieldGroup>
          <Field>
            <FieldContent>
              <FieldLabel>Name</FieldLabel>
              <form.AppField
                name="name"
                children={(field) => (
                  <field.Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    className="max-w-sm"
                  />
                )}
              />
            </FieldContent>
          </Field>
          <div className="flex justify-end gap-2 border-t pt-4 *:min-w-20">
            <form.AppForm>
              <form.ResetButton variant="outline" size="sm" label="Reset" />
              <form.SubmitButton size="sm" label="Save" />
            </form.AppForm>
          </div>
        </FieldGroup>
      </form>
    </ProfileSection>
  )
}
