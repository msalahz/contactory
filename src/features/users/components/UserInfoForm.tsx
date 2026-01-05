import { z } from 'zod'
import { useRef, useState, useTransition } from 'react'

import type { ReactNode } from 'react'
import type { User } from '@/integrations/better-auth/authClient'

import { noop } from '@/shared/utils/noop'
import { Input } from '@/integrations/shadcn/components/ui/input'
import { Button } from '@/integrations/shadcn/components/ui/button'
import { Spinner } from '@/integrations/shadcn/components/ui/spinner'
import { useAppForm } from '@/integrations/tanstack-form/hooks/form'
import { FieldGroup } from '@/integrations/shadcn/components/ui/field'
import { convertFileToBase64 } from '@/shared/utils/convertFileToBase64'
import { ProfileSection } from '@/features/users/components/ProfileSection'
import { getUserNameInitials } from '@/features/users/lib/getUserNameInitials'
import { Avatar, AvatarFallback, AvatarImage } from '@/integrations/shadcn/components/ui/avatar'

export interface UserInfoFormValues {
  name: string
  image: string | null
}

export interface UserInfoFormProps {
  children?: ReactNode
  user?: Partial<Pick<User, 'name' | 'image'>>
  onFormSubmit?: (data: UserInfoFormValues) => Promise<void>
  className?: string
}

const formSchema = z.object({
  name: z.string().nonempty('Name is required'),
  image: z.string(),
})

export function UserInfoForm({
  children,
  user,
  onFormSubmit = noop,
  className,
}: UserInfoFormProps) {
  const { image, name } = user ?? {}
  const [isPending, startTransition] = useTransition()
  const [avatarPreview, setAvatarPreview] = useState<string | null>(image ?? null)
  const [hasAvatarChanges, setHasAvatarChanges] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const form = useAppForm({
    defaultValues: {
      name: name ?? '',
      image: image ?? '',
    },
    validators: {
      onSubmit: formSchema,
    },
    async onSubmit({ value }) {
      await onFormSubmit?.({
        name: value.name,
        image: avatarPreview,
      })
      setHasAvatarChanges(false)
    },
  })

  function handleUploadClick() {
    fileRef.current?.click()
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      startTransition(async () => {
        const base64File = await convertFileToBase64(file)
        setAvatarPreview(base64File)
        setHasAvatarChanges(true)
      })
    }
  }

  function handleRemoveAvatar() {
    setAvatarPreview(null)
    setHasAvatarChanges(true)
    if (fileRef.current) {
      fileRef.current.value = ''
    }
  }

  function handleFullReset() {
    setAvatarPreview(image ?? null)
    setHasAvatarChanges(false)
    if (fileRef.current) {
      fileRef.current.value = ''
    }
    form.reset()
  }

  const displayName = form.state.values.name || name

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
                  {displayName ? getUserNameInitials({ name: displayName }) : 'UN'}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1.5">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleUploadClick}
                  disabled={isPending}
                  className="min-w-[100px]"
                >
                  {isPending ? <Spinner className="mr-2 size-4" /> : null}
                  {avatarPreview ? 'Change' : 'Upload'}
                </Button>
                {avatarPreview && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveAvatar}
                    className="text-destructive hover:text-destructive min-w-[100px]"
                  >
                    Remove
                  </Button>
                )}
              </div>
              <Input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
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
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleFullReset}
              disabled={!form.state.isDirty && !hasAvatarChanges}
              className="min-w-20"
            >
              Reset
            </Button>
            <form.AppForm>
              <form.SubmitButton
                size="sm"
                label="Save Changes"
                className="min-w-20"
                disabled={!form.state.isDirty && !hasAvatarChanges}
              />
            </form.AppForm>
          </div>
        </FieldGroup>
      </form>
    </ProfileSection>
  )
}
