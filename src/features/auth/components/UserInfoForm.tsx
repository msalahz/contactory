import { z } from 'zod'
import { useMemo, useRef } from 'react'
import { Trash2Icon, Undo2Icon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import type { ReactNode } from 'react'
import type { User } from '@/integrations/better-auth/authClient'

import { noop } from '@/core/utils/noop'
import { Button } from '@/integrations/shadcn/components/ui/button'
import { useAppForm } from '@/integrations/tanstack-form/hooks/form'
import { FieldGroup } from '@/integrations/shadcn/components/ui/field'
import { ProfileSection } from '@/features/auth/components/ProfileSection'
import { getUserNameInitials } from '@/features/auth/utils/getUserNameInitials'
import { Avatar, AvatarFallback, AvatarImage } from '@/integrations/shadcn/components/ui/avatar'
import {
  USER_AVATAR_ACCEPTED_IMAGE_FILE_TYPE,
  USER_AVATAR_MAX_IMAGE_FILE_SIZE,
} from '@/server/schemas/auth'

export interface UserInfoFormValues {
  name: string
  avatarFile?: File
  avatarUrl?: string
}

export interface UserInfoFormProps {
  children?: ReactNode
  user?: Partial<Pick<User, 'name' | 'image'>>
  onFormSubmit?: (data: UserInfoFormValues) => Promise<void>
  className?: string
}

export function UserInfoForm({
  children,
  user,
  onFormSubmit = noop,
  className,
}: UserInfoFormProps) {
  const { t } = useTranslation('auth')
  const { image, name } = user ?? {}
  const fileRef = useRef<HTMLInputElement>(null)

  const formSchema = useMemo(
    () =>
      z.object({
        name: z.string().nonempty(t('Name is required')),
        avatarUrl: z.string(),
        avatarFile: z.union([
          z
            .file()
            .refine((file) => file.size > 0, t('Media file is too small (min 1 byte)'))
            .refine(
              (file) => file.size < USER_AVATAR_MAX_IMAGE_FILE_SIZE,
              t('Image file is too large (max 5MB)'),
            )
            .refine(
              (file) => file.type.startsWith(USER_AVATAR_ACCEPTED_IMAGE_FILE_TYPE.replace('*', '')),
              t('Unsupported image file type'),
            ),
          z.literal(''),
        ]),
      }),
    [t],
  )

  const form = useAppForm({
    defaultValues: {
      name: name ?? '',
      avatarUrl: image ?? '',
      avatarFile: '' as z.infer<typeof formSchema>['avatarFile'],
    },
    validators: {
      onSubmit: formSchema,
    },
    async onSubmit({ value, formApi }) {
      await onFormSubmit?.({
        name: value.name,
        avatarUrl: value.avatarUrl,
        avatarFile: value.avatarFile || undefined,
      })
      formApi.reset()
    },
  })

  function handleUploadClick() {
    fileRef.current?.click()
  }

  function handleRemoveAvatar() {
    form.setFieldValue('avatarUrl', '')
    form.setFieldValue('avatarFile', '')
  }

  function onAvatarFileChange(data?: { value: File }) {
    const file = data?.value
    if (file) {
      form.setFieldValue('avatarUrl', URL.createObjectURL(file))
    }
  }

  return (
    <ProfileSection
      title={t('Profile Information')}
      description={t('Update your profile photo and display name')}
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
        <FieldGroup className="gap-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-3">
              <Avatar
                className="ring-border ring-offset-background size-24 cursor-pointer ring-2 ring-offset-2 transition-opacity hover:opacity-80"
                onClick={handleUploadClick}
              >
                <form.Subscribe
                  selector={(state) => state.values.avatarUrl}
                  children={(avatarUrl) => <AvatarImage src={avatarUrl || undefined} />}
                />

                <form.Subscribe
                  selector={(state) => state.values.name}
                  children={(userName) => (
                    <AvatarFallback className="text-xl font-medium">
                      {userName ? getUserNameInitials({ name: userName }) : t('UN')}
                    </AvatarFallback>
                  )}
                />
              </Avatar>
            </div>

            {/* Name Field Section */}
            <div>
              <form.AppField
                name="name"
                children={(field) => (
                  <field.Input
                    id="profile-name"
                    label={t('Display Name')}
                    type="text"
                    placeholder={t('Enter your name')}
                    description={t('This is your public display name visible to others')}
                  />
                )}
              />
              <div className="mt-2">
                <form.AppField
                  name="avatarFile"
                  listeners={{ onChange: onAvatarFileChange }}
                  children={(field) => (
                    <field.File
                      id="profile-avatar-file"
                      accept={USER_AVATAR_ACCEPTED_IMAGE_FILE_TYPE}
                      ref={fileRef}
                      type="file"
                      className="hidden"
                    />
                  )}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center justify-end gap-2 border-t pt-4 *:w-full md:flex-row md:*:w-auto">
            <form.AppForm>
              <form.Subscribe
                selector={(state) => ({
                  isDefaultValue: state.isDefaultValue,
                  isSubmitting: state.isSubmitting,
                })}
                children={({ isDefaultValue, isSubmitting }) => (
                  <>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="me-auto min-w-20"
                      onClick={handleRemoveAvatar}
                      disabled={isSubmitting}
                    >
                      <Trash2Icon />
                      {t('Remove Avatar')}
                    </Button>
                    <form.ResetButton
                      size="sm"
                      variant="outline"
                      className="min-w-20"
                      disabled={isSubmitting || isDefaultValue}
                    >
                      <Undo2Icon />
                      {t('Reset')}
                    </form.ResetButton>
                    <form.SubmitButton
                      size="sm"
                      className="min-w-35"
                      disabled={isSubmitting || isDefaultValue}
                    >
                      {t('Save Changes')}
                    </form.SubmitButton>
                  </>
                )}
              />
            </form.AppForm>
          </div>
        </FieldGroup>
      </form>
    </ProfileSection>
  )
}
