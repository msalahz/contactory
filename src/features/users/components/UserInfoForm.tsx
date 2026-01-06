import { z } from 'zod'
import { useRef, useState, useTransition } from 'react'

import type { ReactNode } from 'react'
import type { User } from '@/integrations/better-auth/authClient'

import { noop } from '@/shared/utils/noop'
import { cn } from '@/integrations/shadcn/lib/utils'
import { Button } from '@/integrations/shadcn/components/ui/button'
import { Spinner } from '@/integrations/shadcn/components/ui/spinner'
import { useAppForm } from '@/integrations/tanstack-form/hooks/form'
import { FieldGroup } from '@/integrations/shadcn/components/ui/field'
import { convertFileToBase64 } from '@/shared/utils/convertFileToBase64'
import { ProfileSection } from '@/features/users/components/ProfileSection'
import { getUserNameInitials } from '@/features/users/lib/getUserNameInitials'
import { Avatar, AvatarFallback, AvatarImage } from '@/integrations/shadcn/components/ui/avatar'

export const MAX_IMAGE_FILE_SIZE = 1000 * 1000 * 5 // 5 MB
export const ACCEPTED_IMAGE_FILE_TYPE = 'image/*'

export interface UserInfoFormValues {
  name: string
  imageFile: File | ''
}

export interface UserInfoFormProps {
  children?: ReactNode
  user?: Partial<Pick<User, 'name' | 'image'>>
  onFormSubmit?: (data: UserInfoFormValues) => Promise<void>
  className?: string
}

const formSchema = z.object({
  name: z.string().nonempty('Name is required'),
  imageFile: z.union([
    z
      .file()
      .refine((file) => file.size > 0, 'Media file is too small (min 1 byte)')
      .refine((file) => file.size < MAX_IMAGE_FILE_SIZE, 'Image file is too large (max 200MB)')
      .refine(
        (file) => file.type.startsWith(ACCEPTED_IMAGE_FILE_TYPE.replace('*', '')),
        'Unsupported image file type',
      ),
    z.literal(''),
  ]),
})

export function UserInfoForm({
  children,
  user,
  onFormSubmit = noop,
  className,
}: UserInfoFormProps) {
  const { image, name } = user ?? {}
  const fileRef = useRef<HTMLInputElement>(null)
  const [isPending, startTransition] = useTransition()
  const [avatarPreview, setAvatarPreview] = useState<string | null>(image ?? null)

  const form = useAppForm({
    defaultValues: {
      name: name ?? '',
      imageFile: '' as z.infer<typeof formSchema>['imageFile'],
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit({ value }) {
      return onFormSubmit?.({
        name: value.name,
        imageFile: value.imageFile,
      })
    },
  })

  function handleUploadClick() {
    fileRef.current?.click()
  }

  function handleRemoveAvatar() {
    setAvatarPreview(null)
    form.setFieldValue('imageFile', '')
  }

  return (
    <ProfileSection
      title="Profile Information"
      description="Update your profile photo and display name"
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
                <AvatarImage src={avatarPreview || undefined} />
                <AvatarFallback className="text-xl font-medium">
                  {name ? getUserNameInitials({ name }) : 'UN'}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col gap-1.5">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleUploadClick}
                  disabled={isPending}
                  className="min-w-25"
                >
                  {isPending ? (
                    <Spinner className="mr-2 size-4" />
                  ) : avatarPreview ? (
                    'Change'
                  ) : (
                    'Upload'
                  )}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveAvatar}
                  className={cn(
                    'text-destructive hover:text-destructive min-w-25',
                    avatarPreview ? 'visible' : 'invisible',
                  )}
                >
                  Remove
                </Button>
              </div>

              <form.Subscribe
                selector={(state) => state.isDefaultValue}
                children={(isDefaultValue) => {
                  if (isDefaultValue) {
                    setAvatarPreview(image || null)
                  }

                  return null
                }}
              />
              <form.AppField
                name="imageFile"
                listeners={{
                  onChange: ({ value }) => {
                    const file = value
                    if (file) {
                      startTransition(async () => {
                        const base64File = await convertFileToBase64(file)
                        setAvatarPreview(base64File)
                      })
                    }
                  },
                }}
                children={(field) => (
                  <field.File
                    id="profile-avatar-file"
                    accept={ACCEPTED_IMAGE_FILE_TYPE}
                    ref={fileRef}
                    type="file"
                    className="hidden"
                  />
                )}
              />
            </div>

            {/* Name Field Section */}
            <div className="flex-1">
              <form.AppField
                name="name"
                children={(field) => (
                  <field.Input
                    id="profile-name"
                    label="Display Name"
                    type="text"
                    placeholder="Enter your name"
                    description="This is your public display name visible to others"
                  />
                )}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 border-t pt-4">
            <form.AppForm>
              <form.ResetButton size="sm" variant="outline" label="Reset" className="min-w-20" />
              <form.SubmitButton size="sm" label="Save Changes" className="min-w-35" />
            </form.AppForm>
          </div>
        </FieldGroup>
      </form>
    </ProfileSection>
  )
}
