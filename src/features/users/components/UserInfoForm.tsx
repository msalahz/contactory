import { z } from 'zod'
import { Trash2Icon } from 'lucide-react'
import { useRef, useTransition } from 'react'

import type { ReactNode } from 'react'
import type { User } from '@/integrations/better-auth/authClient'

import { noop } from '@/shared/utils/noop'
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
  imageFile?: File
  imageUrl?: string
}

export interface UserInfoFormProps {
  children?: ReactNode
  user?: Partial<Pick<User, 'name' | 'image'>>
  onFormSubmit?: (data: UserInfoFormValues) => Promise<void>
  className?: string
}

const formSchema = z.object({
  name: z.string().nonempty('Name is required'),
  imageUrl: z.string(),
  imageFile: z.union([
    z
      .file()
      .refine((file) => file.size > 0, 'Media file is too small (min 1 byte)')
      .refine((file) => file.size < MAX_IMAGE_FILE_SIZE, 'Image file is too large (max 5MB)')
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
  const [isEncoding, startEncodingTransition] = useTransition()

  const form = useAppForm({
    defaultValues: {
      name: name ?? '',
      imageUrl: image ?? '',
      imageFile: '' as z.infer<typeof formSchema>['imageFile'],
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit({ value }) {
      return onFormSubmit?.({
        name: value.name,
        imageUrl: value.imageUrl,
        imageFile: value.imageFile || undefined,
      })
    },
  })

  function handleUploadClick() {
    fileRef.current?.click()
  }

  function handleRemoveAvatar() {
    form.setFieldValue('imageUrl', '')
    form.setFieldValue('imageFile', '')
  }

  function onImageFileChange(data?: { value: File }) {
    const file = data?.value
    if (file) {
      startEncodingTransition(async () => {
        const base64File = await convertFileToBase64(file)
        form.setFieldValue('imageUrl', base64File)
      })
    }
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
                <form.Subscribe
                  selector={(state) => state.values.imageUrl}
                  children={(imageUrl) => <AvatarImage src={imageUrl || undefined} />}
                />

                <form.Subscribe
                  selector={(state) => state.values.name}
                  children={(userName) => (
                    <AvatarFallback className="text-xl font-medium">
                      {userName ? getUserNameInitials({ name: userName }) : 'UN'}
                    </AvatarFallback>
                  )}
                />
              </Avatar>

              <form.AppField
                name="imageFile"
                listeners={{ onChange: onImageFileChange }}
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
          <div className="flex items-center justify-end gap-2 border-t pt-4">
            <form.AppForm>
              {isEncoding ? <Spinner className="mr-2 size-4" /> : null}
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="min-w-20"
                onClick={handleRemoveAvatar}
              >
                <Trash2Icon />
                Remove Avatar
              </Button>
              <form.ResetButton
                size="sm"
                variant="outline"
                label="Reset"
                className="min-w-20"
                disabled={isEncoding}
              />
              <form.SubmitButton
                size="sm"
                label="Save Changes"
                className="min-w-35"
                disabled={isEncoding}
              />
            </form.AppForm>
          </div>
        </FieldGroup>
      </form>
    </ProfileSection>
  )
}
