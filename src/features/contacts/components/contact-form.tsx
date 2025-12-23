import type { Contact, NewContact } from '@/features/contacts/models'

import { cn, noop } from '@/features/abstractions/lib/utils'
import { newContactSchema } from '@/features/contacts/models'
import { useAppForm } from '@/integrations/tanstack-form/hooks/form'
import { Card, CardContent } from '@/features/abstractions/components/primitives/card'
import { Field, FieldGroup } from '@/features/abstractions/components/primitives/field'

export interface ContactFormProps extends React.ComponentProps<'div'> {
  contact?: Contact
  onFormSubmit?: (data: NewContact) => Promise<void>
}

export function ContactForm({
  className,
  children,
  contact,
  onFormSubmit = noop,
  ...props
}: ContactFormProps) {
  const form = useAppForm({
    defaultValues: {
      firstName: contact?.firstName ?? '',
      lastName: contact?.lastName ?? '',
      displayName: contact?.displayName ?? '',
      nickname: contact?.nickname ?? '',
      primaryEmail: contact?.primaryEmail ?? '',
      primaryPhone: contact?.primaryPhone ?? '',
      company: contact?.company ?? '',
      jobTitle: contact?.jobTitle ?? '',
      department: contact?.department ?? '',
      street: contact?.street ?? '',
      notes: contact?.notes ?? '',
      website: contact?.website ?? '',
      city: contact?.city ?? '',
      state: contact?.state ?? '',
      country: contact?.country ?? '',
      postalCode: contact?.postalCode ?? '',
      isFavorite: contact?.isFavorite ?? false,
    } as NewContact,
    validators: {
      onSubmit: newContactSchema,
    },
    async onSubmit({ value }) {
      await onFormSubmit(value)
    },
  })
  return (
    <div className={cn('w-full', className)} {...props}>
      <Card className="rounded-none">
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              void form.handleSubmit()
            }}
            className="space-y-4"
          >
            <FieldGroup>
              {children ? <Field>{children}</Field> : null}

              <form.AppField
                name="firstName"
                children={(field) => (
                  <field.Input type="text" label="First Name" placeholder="Jone" />
                )}
              />

              <form.AppField
                name="lastName"
                children={(field) => (
                  <field.Input type="text" label="Last Name" placeholder="Doe" />
                )}
              />

              <form.AppField
                name="displayName"
                children={(field) => (
                  <field.Input type="text" label="Display Name" placeholder="Jone Doe" />
                )}
              />

              <form.AppField
                name="nickname"
                children={(field) => (
                  <field.Input type="text" label="Nickname" placeholder="Jone Doe" />
                )}
              />

              <form.AppField
                name="primaryEmail"
                children={(field) => (
                  <field.Input type="email" label="Primary Email" placeholder="john@example.com" />
                )}
              />

              <form.AppField
                name="primaryPhone"
                children={(field) => (
                  <field.Input type="tel" label="Primary Phone" placeholder="+1 234 567 8900" />
                )}
              />

              <form.AppField
                name="company"
                children={(field) => (
                  <field.Input type="text" label="Company" placeholder="Acme Inc." />
                )}
              />

              <form.AppField
                name="jobTitle"
                children={(field) => (
                  <field.Input type="text" label="Job Title" placeholder="Software Engineer" />
                )}
              />

              <form.AppField
                name="department"
                children={(field) => (
                  <field.Input type="text" label="Department" placeholder="Engineering" />
                )}
              />

              <form.AppField
                name="street"
                children={(field) => (
                  <field.Input type="text" label="Street" placeholder="123 Main St" />
                )}
              />

              <form.AppField
                name="city"
                children={(field) => (
                  <field.Input type="text" label="City" placeholder="New York" />
                )}
              />

              <form.AppField
                name="state"
                children={(field) => <field.Input type="text" label="State" placeholder="NY" />}
              />

              <form.AppField
                name="postalCode"
                children={(field) => (
                  <field.Input type="text" label="Postal Code" placeholder="10001" />
                )}
              />

              <form.AppField
                name="country"
                children={(field) => (
                  <field.Input type="text" label="Country" placeholder="United States" />
                )}
              />

              <form.AppField
                name="website"
                children={(field) => (
                  <field.Input type="url" label="Website" placeholder="https://example.com" />
                )}
              />

              <form.AppField
                name="notes"
                children={(field) => (
                  <field.Input type="text" label="Notes" placeholder="Additional notes..." />
                )}
              />

              <form.AppField
                name="isFavorite"
                children={(field) => (
                  <field.Switch label="Is Favorite" fieldProps={{ orientation: 'horizontal' }} />
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <form.AppForm>
                  <form.ResetButton variant="secondary" label="Reset" />
                  <form.SubmitButton label="Submit" />
                </form.AppForm>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
