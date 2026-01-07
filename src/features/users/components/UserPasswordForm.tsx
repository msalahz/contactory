import { z } from 'zod'
import { Undo2Icon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'
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
  const { t } = useTranslation('users')

  const formSchema = useMemo(
    () =>
      z
        .object({
          currentPassword: z.string().min(1, t('Current password is required')),
          newPassword: z.string().min(8, t('Password must be at least 8 characters')),
          confirmPassword: z.string().min(1, t('Please confirm your password')),
          revokeOtherSessions: z.boolean(),
        })
        .refine((data) => data.newPassword === data.confirmPassword, {
          message: t('Passwords do not match'),
          path: ['confirmPassword'],
        }),
    [t],
  )

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
      title={t('Password')}
      description={t('Change your password to keep your account secure')}
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
                label={t('Current Password')}
                placeholder={t('Enter current password')}
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
                label={t('New Password')}
                placeholder={t('Enter new password')}
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
                label={t('Confirm New Password')}
                placeholder={t('Confirm new password')}
                className="max-w-sm"
              />
            )}
          />

          <form.AppField
            name="revokeOtherSessions"
            children={(field) => (
              <field.Checkbox
                id="revokeOtherSessions"
                label={t('Revoke other sessions')}
                description={t('Revoke all other sessions')}
              />
            )}
          />

          <div className="flex justify-end gap-2 border-t pt-4">
            <form.AppForm>
              <form.ResetButton variant="outline" size="sm" className="min-w-20">
                <Undo2Icon />
                {t('Reset')}
              </form.ResetButton>
              <form.SubmitButton size="sm" className="min-w-40">
                {t('Update Password')}
              </form.SubmitButton>
            </form.AppForm>
          </div>
        </FieldGroup>
      </form>
    </ProfileSection>
  )
}
