import {
  Briefcase,
  Building2,
  Calendar,
  FileText,
  Globe,
  Mail,
  MapPin,
  Phone,
  Star,
} from 'lucide-react'

import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

import type { Contact } from '@/features/contacts/schema'

import { formatDisplayName } from '@/features/contacts/helpers'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/integrations/shadcn/components/ui/card'

// ============================================================================
// Type Definitions
// ============================================================================

export interface ContactInfoProps {
  contact: Contact
}

interface InfoFieldProps {
  icon: LucideIcon
  label: string
  value: string | null | undefined
}

interface SectionProps {
  title: string
  children: ReactNode
}

// ============================================================================
// Helper Functions
// ============================================================================

const formatFullAddress = (contact: Contact): string | null => {
  const addressParts = [
    contact.street,
    contact.city,
    contact.state,
    contact.postalCode,
    contact.country,
  ].filter(Boolean)

  return addressParts.length > 0 ? addressParts.join(', ') : null
}

const formatDate = (date: Date | string | null | undefined): string => {
  if (!date) return 'N/A'

  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// ============================================================================
// Components
// ============================================================================

const InfoField = ({ icon: Icon, label, value }: InfoFieldProps) => {
  const displayValue = value?.trim() || 'N/A'
  const isNA = displayValue === 'N/A'

  return (
    <div className="flex items-start gap-3 py-2">
      <Icon
        className={`mt-0.5 h-5 w-5 shrink-0 ${isNA ? 'text-muted-foreground/50' : 'text-muted-foreground'}`}
      />
      <div className="min-w-0 flex-1">
        <p className="text-muted-foreground text-sm font-medium">{label}</p>
        <p
          className={`mt-0.5 text-sm wrap-break-word ${isNA ? 'text-muted-foreground/50 italic' : ''}`}
        >
          {displayValue}
        </p>
      </div>
    </div>
  )
}

const Section = ({ title, children }: SectionProps) => {
  return (
    <div className="space-y-1">
      <h3 className="text-foreground mb-3 text-sm font-semibold">{title}</h3>
      <div className="space-y-1">{children}</div>
    </div>
  )
}

const ContactHeader = ({ contact }: { contact: Contact }) => {
  const displayName = formatDisplayName(contact)

  return (
    <CardHeader>
      <div className="flex items-start justify-between">
        <div>
          <CardTitle className="flex items-center gap-2 text-2xl">
            {displayName}
            {contact.isFavorite && <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />}
          </CardTitle>
          {contact.nickname && (
            <CardDescription className="mt-1">"{contact.nickname}"</CardDescription>
          )}
        </div>
      </div>
    </CardHeader>
  )
}

const ContactDetailsGrid = ({ contact }: { contact: Contact }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Section title="Contact Information">
        <InfoField icon={Mail} label="Primary Email" value={contact.primaryEmail} />
        <InfoField icon={Phone} label="Primary Phone" value={contact.primaryPhone} />
        <InfoField icon={Globe} label="Website" value={contact.website} />
      </Section>

      <Section title="Organization">
        <InfoField icon={Building2} label="Company" value={contact.company} />
        <InfoField icon={Briefcase} label="Job Title" value={contact.jobTitle} />
        <InfoField icon={Building2} label="Department" value={contact.department} />
      </Section>
    </div>
  )
}

const ContactAddress = ({ contact }: { contact: Contact }) => {
  const fullAddress = formatFullAddress(contact)

  return (
    <Section title="Address">
      <InfoField icon={MapPin} label="Location" value={fullAddress} />
    </Section>
  )
}

const ContactNotes = ({ contact }: { contact: Contact }) => {
  if (!contact.notes) return null

  return (
    <Section title="Notes">
      <InfoField icon={FileText} label="Additional Notes" value={contact.notes} />
    </Section>
  )
}

const ContactTimestamps = ({ contact }: { contact: Contact }) => {
  const formattedCreatedAt = formatDate(contact.createdAt)
  const formattedUpdatedAt = formatDate(contact.updatedAt)

  return (
    <div className="flex items-center justify-start gap-4 border-t pt-4">
      <div className="text-muted-foreground flex items-center gap-2 text-xs">
        <Calendar className="h-4 w-4" />
        <span>Added on {formattedCreatedAt}</span>
      </div>
      <div className="text-muted-foreground flex items-center gap-2 text-xs">
        <Calendar className="h-4 w-4" />
        <span>Updated on {formattedUpdatedAt}</span>
      </div>
    </div>
  )
}

// ============================================================================
// Main Component
// ============================================================================

export function ContactInfo({ contact }: ContactInfoProps) {
  return (
    <Card className="h-fit w-full">
      <ContactHeader contact={contact} />
      <CardContent className="space-y-6">
        <ContactDetailsGrid contact={contact} />
        <ContactAddress contact={contact} />
        <ContactNotes contact={contact} />
        <ContactTimestamps contact={contact} />
      </CardContent>
    </Card>
  )
}
