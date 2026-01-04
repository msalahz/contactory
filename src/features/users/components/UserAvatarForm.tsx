import React, { useRef, useTransition } from 'react'

import type { User } from '@/integrations/better-auth/authClient'

import { noop } from '@/shared/utils/noop'
import { Input } from '@/integrations/shadcn/components/ui/input'
import { Button } from '@/integrations/shadcn/components/ui/button'
import { Spinner } from '@/integrations/shadcn/components/ui/spinner'
import { convertFileToBase64 } from '@/shared/utils/convertFileToBase64'
import { ProfileSection } from '@/features/users/components/ProfileSection'
import { getUserNameInitials } from '@/features/users/lib/getUserNameInitials'
import { Avatar, AvatarFallback, AvatarImage } from '@/integrations/shadcn/components/ui/avatar'

export interface UserAvatarFormProps {
  user?: Partial<Pick<User, 'name' | 'image'>>
  onFormSubmit?: (data: { image: string }) => Promise<void>
  className?: string
}

export function UserAvatarForm({ user, onFormSubmit = noop, className }: UserAvatarFormProps) {
  const { image, name } = user ?? {}
  const [isPending, startTransition] = useTransition()
  const [avatarPreview, setAvatarPreview] = React.useState<string | null>(image ?? null)
  const [hasChanges, setHasChanges] = React.useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  function handleUploadClick() {
    fileRef.current?.click()
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      startTransition(async () => {
        const base64File = await convertFileToBase64(file)
        setAvatarPreview(base64File)
        setHasChanges(true)
      })
    }
  }

  function handleRemove() {
    setAvatarPreview(null)
    setHasChanges(true)
    if (fileRef.current) {
      fileRef.current.value = ''
    }
  }

  function handleReset() {
    setAvatarPreview(image ?? null)
    setHasChanges(false)
    if (fileRef.current) {
      fileRef.current.value = ''
    }
  }

  async function handleSave() {
    if (avatarPreview !== null) {
      await onFormSubmit({ image: avatarPreview })
      setHasChanges(false)
    }
  }

  return (
    <ProfileSection title="Avatar" description="Update your profile picture" className={className}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar
            className="ring-border ring-offset-background size-20 cursor-pointer ring-2 ring-offset-2"
            onClick={handleUploadClick}
          >
            <AvatarImage src={avatarPreview || undefined} />
            <AvatarFallback className="text-lg">
              {name ? getUserNameInitials({ name }) : 'UN'}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleUploadClick}
              disabled={isPending}
            >
              {isPending ? <Spinner className="mr-2 size-4" /> : null}
              Upload new
            </Button>
            {avatarPreview && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleRemove}
                className="text-destructive hover:text-destructive"
              >
                Remove
              </Button>
            )}
          </div>
        </div>
        <Input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      {hasChanges && (
        <div className="mt-4 flex justify-end gap-2 border-t pt-4">
          <Button type="button" variant="outline" size="sm" onClick={handleReset}>
            Reset
          </Button>
          <Button type="button" size="sm" onClick={handleSave}>
            Save
          </Button>
        </div>
      )}
    </ProfileSection>
  )
}
