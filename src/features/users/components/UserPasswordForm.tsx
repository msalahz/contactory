import { z } from 'zod'

import { noop } from '@/shared/utils/noop'
import { useAppForm } from '@/integrations/tanstack-form/hooks/form'
import { ProfileSection } from '@/features/users/components/ProfileSection'
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
} from '@/integrations/shadcn/components/ui/field'

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export interface UserPasswordFormProps {
  onFormSubmit?: (data: { currentPassword: string; newPassword: string }) => Promise<void>
  className?: string
}

export function UserPasswordForm({ onFormSubmit = noop, className }: UserPasswordFormProps) {
  const form = useAppForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validators: {
      onSubmit: passwordSchema,
    },
    async onSubmit({ value }) {
      await onFormSubmit?.({
        currentPassword: value.currentPassword,
        newPassword: value.newPassword,
      })
    },
  })

  return (
    <ProfileSection
      title="Password"
      description="Change your password to keep your account secure"
      className={className}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          void form.handleSubmit()
        }}
      >
        <FieldGroup className="space-y-4">
          <Field>
            <FieldContent>
              <FieldLabel htmlFor="currentPassword">Current Password</FieldLabel>
              <form.AppField
                name="currentPassword"
                children={(field) => (
                  <field.Input
                    id="currentPassword"
                    type="password"
                    placeholder="Enter current password"
                    className="max-w-sm"
                  />
                )}
              />
            </FieldContent>
          </Field>
          <Field>
            <FieldContent>
              <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
              <form.AppField
                name="newPassword"
                children={(field) => (
                  <field.Input
                    id="newPassword"
                    type="password"
                    placeholder="Enter new password"
                    className="max-w-sm"
                  />
                )}
              />
            </FieldContent>
          </Field>
          <Field>
            <FieldContent>
              <FieldLabel htmlFor="confirmPassword">Confirm New Password</FieldLabel>
              <form.AppField
                name="confirmPassword"
                children={(field) => (
                  <field.Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                    className="max-w-sm"
                  />
                )}
              />
            </FieldContent>
          </Field>
          <div className="flex justify-end gap-2 border-t pt-4">
            <form.AppForm>
              <form.ResetButton variant="outline" size="sm" label="Reset" className="min-w-20" />
              <form.SubmitButton size="sm" label="Update Password" className="min-w-40" />
            </form.AppForm>
          </div>
        </FieldGroup>
      </form>
    </ProfileSection>
  )
}
