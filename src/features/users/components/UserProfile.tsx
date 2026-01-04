import { z } from 'zod'
import React, { useRef, useTransition } from 'react'

import type { User } from '@/integrations/better-auth/authClient'

import { noop } from '@/shared/utils/noop'
import { userSchema } from '@/server/schemas/auth'
import { cn } from '@/integrations/shadcn/lib/utils'
import { GoogleIcon } from '@/shared/components/GoogleIcon'
import { Input } from '@/integrations/shadcn/components/ui/input'
import { Button } from '@/integrations/shadcn/components/ui/button'
import { useAppForm } from '@/integrations/tanstack-form/hooks/form'
import { Spinner } from '@/integrations/shadcn/components/ui/spinner'
import { convertFileToBase64 } from '@/shared/utils/convertFileToBase64'
import { getUserNameInitials } from '@/features/users/lib/getUserNameInitials'
import { Avatar, AvatarFallback, AvatarImage } from '@/integrations/shadcn/components/ui/avatar'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/integrations/shadcn/components/ui/field'

export function UserProfile({ children, className, ...props }: React.ComponentProps<'main'>) {
  return (
    <main
      className={cn('mx-auto flex w-full items-start gap-6 p-4 md:pt-10', className)}
      {...props}
    >
      {children}
    </main>
  )
}

export interface UserProfileProps extends React.ComponentProps<typeof FieldSet> {}

export function UserProfileContent({ children, className, ...props }: UserProfileProps) {
  return (
    <FieldSet className={cn('mx-auto max-w-2xl grow space-y-6', className)} {...props}>
      <FieldLegend>
        <h1 className="text-3xl font-semibold">Profile Settings</h1>
      </FieldLegend>
      <FieldDescription>Manage your account settings and preferences</FieldDescription>
      {children}
    </FieldSet>
  )
}

export interface ProfileSectionProps extends React.ComponentProps<'div'> {
  title: string
  description?: string
  htmlFor?: string
}

export function ProfileSection({
  title,
  description,
  htmlFor,
  children,
  className,
  ...props
}: ProfileSectionProps) {
  return (
    <FieldGroup className={cn('bg-card rounded-lg border p-6 shadow-sm', className)} {...props}>
      <FieldContent className="mb-4 gap-0.5">
        <FieldLabel htmlFor={htmlFor} className="text-lg font-medium">
          {title}
        </FieldLabel>
        {description && <FieldDescription>{description}</FieldDescription>}
      </FieldContent>
      {children}
    </FieldGroup>
  )
}

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

export interface UserSocialFormProps {
  connectedAccounts?: Array<{ provider: string; email?: string }>
  onConnect?: (provider: string) => Promise<void>
  onDisconnect?: (provider: string) => Promise<void>
  className?: string
}

export function UserSocialForm({
  connectedAccounts = [],
  onConnect = noop,
  onDisconnect = noop,
  className,
}: UserSocialFormProps) {
  const isGoogleConnected = connectedAccounts.some((acc) => acc.provider === 'google')
  const googleAccount = connectedAccounts.find((acc) => acc.provider === 'google')

  return (
    <ProfileSection
      title="Connected Accounts"
      description="Connect your social accounts for easier sign-in"
      className={className}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <div className="bg-muted flex size-10 items-center justify-center rounded-full">
              <GoogleIcon className="size-5" />
            </div>
            <div>
              <p className="font-medium">Google</p>
              {isGoogleConnected && googleAccount?.email ? (
                <p className="text-muted-foreground text-sm">{googleAccount.email}</p>
              ) : (
                <p className="text-muted-foreground text-sm">Not connected</p>
              )}
            </div>
          </div>
          {isGoogleConnected ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDisconnect('google')}
              className="text-destructive hover:text-destructive"
            >
              Disconnect
            </Button>
          ) : (
            <Button variant="outline" size="sm" onClick={() => onConnect('google')}>
              Connect
            </Button>
          )}
        </div>
      </div>
    </ProfileSection>
  )
}
