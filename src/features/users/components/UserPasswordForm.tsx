import { z } from 'zod'
import type { ReactNode } from 'react'

import { noop } from '@/shared/utils/noop'
import { useAppForm } from '@/integrations/tanstack-form/hooks/form'
import { FieldGroup } from '@/integrations/shadcn/components/ui/field'
import { ProfileSection } from '@/features/users/components/ProfileSection'

export interface UserPasswordFormValues {
  currentPassword: string
  newPassword: string
  revokeOtherSessions: boolean
}

const formSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    revokeOtherSessions: z.boolean(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export interface UserPasswordFormProps {
  children?: ReactNode
  onFormSubmit?: (data: UserPasswordFormValues) => Promise<boolean>
  className?: string
}

export function UserPasswordForm({
  children,
  onFormSubmit = noop,
  className,
}: UserPasswordFormProps) {
  const form = useAppForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      revokeOtherSessions: false,
    },
    validators: {
      onSubmit: formSchema,
    },
    async onSubmit({ value, formApi }) {
      const success = await onFormSubmit?.({
        currentPassword: value.currentPassword,
        newPassword: value.newPassword,
        revokeOtherSessions: value.revokeOtherSessions,
      })
      if (success) formApi.reset()
    },
  })

  return (
    <ProfileSection
      title="Password"
      description="Change your password to keep your account secure"
      className={className}
    >
      {children}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          void form.handleSubmit()
        }}
      >
        <FieldGroup className="space-y-4">
          <form.AppField
            name="currentPassword"
            children={(field) => (
              <field.Input
                id="currentPassword"
                type="password"
                label="Current Password"
                placeholder="Enter current password"
                className="max-w-sm"
              />
            )}
          />

          <form.AppField
            name="newPassword"
            children={(field) => (
              <field.Input
                id="newPassword"
                type="password"
                label="New Password"
                placeholder="Enter new password"
                className="max-w-sm"
              />
            )}
          />

          <form.AppField
            name="confirmPassword"
            children={(field) => (
              <field.Input
                id="confirmPassword"
                type="password"
                label="Confirm New Password"
                placeholder="Confirm new password"
                className="max-w-sm"
              />
            )}
          />

          <form.AppField
            name="revokeOtherSessions"
            children={(field) => (
              <field.Checkbox
                id="revokeOtherSessions"
                label="Revoke other sessions"
                description="Revoke all other sessions"
              />
            )}
          />

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
