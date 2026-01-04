import { z } from 'zod'
import React, { useRef, useTransition } from 'react'

import type { User } from '@/integrations/better-auth/authClient'

import { noop } from '@/shared/utils/noop'
import { userSchema } from '@/server/schemas/auth'
import { cn } from '@/integrations/shadcn/lib/utils'
import { GoogleIcon } from '@/shared/components/GoogleIcon'
import { Input } from '@/integrations/shadcn/components/ui/input'
import { Button } from '@/integrations/shadcn/components/ui/button'
import { getUserNameInitials } from '@/features/users/utils/helpers'
import { useAppForm } from '@/integrations/tanstack-form/hooks/form'
import { Spinner } from '@/integrations/shadcn/components/ui/spinner'
import { convertFileToBase64 } from '@/shared/utils/convertFileToBase64'
import { Avatar, AvatarFallback, AvatarImage } from '@/integrations/shadcn/components/ui/avatar'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/integrations/shadcn/components/ui/field'

export function UserProfile({ children, className, ...props }: React.ComponentProps<'main'>) {
  return (
    <main
      className={cn('mx-auto flex w-full items-start gap-6 p-2 md:pt-10', className)}
      {...props}
    >
      {children}
    </main>
  )
}

export interface UserProfileProps extends React.ComponentProps<typeof FieldSet> {}

export function UserProfileContent({ children, className, ...props }: UserProfileProps) {
  return (
    <FieldSet className={cn('mx-auto max-w-4xl grow', className)} {...props}>
      <FieldLegend>
        <h1 className="text-4xl font-semibold">Profile Settings</h1>
      </FieldLegend>
      <FieldDescription>Manage your profile settings</FieldDescription>
      <FieldSeparator />
      <FieldGroup>{children}</FieldGroup>
    </FieldSet>
  )
}

export interface UserAvatarFieldProps extends React.ComponentProps<typeof Input> {
  user?: Partial<Pick<User, 'name' | 'image'>>
}

export function UserAvatarField({ user, children, className, ...props }: UserAvatarFieldProps) {
  const { image, name } = user ?? {}
  const [isPending, startTransition] = useTransition()
  const [avatarPreview, setAvatarPreview] = React.useState<string | null>(image ?? null)
  const fileRef = useRef<HTMLInputElement>(null)

  function handleAvatarClick() {
    fileRef.current?.click()
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      startTransition(async () => {
        const base64File = await convertFileToBase64(file)
        setAvatarPreview(base64File)
      })
    }
  }

  return (
    <FieldGroup id="avatar">
      <Field orientation="responsive" {...props}>
        <FieldContent>
          <FieldLabel>Avatar {isPending && <Spinner className="size-4" />}</FieldLabel>
          <FieldDescription>Change your avatar</FieldDescription>
        </FieldContent>
        <div className="flex items-center gap-2">
          <Avatar className={cn('size-20 cursor-pointer', className)} onClick={handleAvatarClick}>
            <AvatarImage src={avatarPreview || undefined} />
            <AvatarFallback>{name ? getUserNameInitials({ name: name }) : 'UN'}</AvatarFallback>
          </Avatar>
          <Input
            name="avatar"
            ref={fileRef}
            type="file"
            accept="image/*"
            className={cn('hidden', className)}
            onChange={handleFileChange}
            {...props}
          />
        </div>
      </Field>
    </FieldGroup>
  )
}

export interface UserNameFieldProps extends React.ComponentProps<typeof Input> {
  user?: Partial<Pick<User, 'name'>>
  onFormSubmit?: (data: Pick<User, 'name'>) => Promise<void>
}
export function UserNameField({
  user,
  children,
  onFormSubmit = noop,
  ...props
}: UserNameFieldProps) {
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
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        void form.handleSubmit()
      }}
    >
      <FieldGroup id="name">
        <Field orientation="responsive" {...props}>
          <FieldContent>
            <FieldLabel>Name</FieldLabel>
            <FieldDescription>Change your name</FieldDescription>
          </FieldContent>

          <form.AppField
            name="name"
            children={(field) => (
              <field.Input type="text" className="min-w-full sm:min-w-75 lg:min-w-99" />
            )}
          />

          <Field>
            <form.AppForm>
              <form.SubmitButton label="Save" className="ms-auto md:w-full" />
            </form.AppForm>
          </Field>
        </Field>
      </FieldGroup>
    </form>
  )
}

export interface UserPasswordFieldProps extends React.ComponentProps<typeof Input> {}

export function UserPasswordField({ children, ...props }: UserPasswordFieldProps) {
  return (
    <FieldGroup id="password">
      <Field orientation="responsive" {...props}>
        <FieldContent>
          <FieldLabel>Password</FieldLabel>
          <FieldDescription>Change your password</FieldDescription>
        </FieldContent>

        <Input {...props} />
        <Input {...props} />
        <Button className="ms-auto">Save</Button>
      </Field>
    </FieldGroup>
  )
}

export interface UserSocialLinkFieldProps extends React.ComponentProps<typeof Input> {}

export function UserSocialLinkField({ children, ...props }: UserSocialLinkFieldProps) {
  return (
    <FieldGroup id="sociallink">
      <Field orientation="responsive" {...props}>
        <FieldContent>
          <FieldLabel>Social Link</FieldLabel>
          <FieldDescription>Link your social accounts</FieldDescription>
        </FieldContent>
        <div className="flex flex-col gap-2">
          <Button variant="outline">
            <GoogleIcon /> Google
          </Button>
        </div>
      </Field>
    </FieldGroup>
  )
}
