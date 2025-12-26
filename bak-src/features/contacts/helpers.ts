import type { Contact } from '@/features/contacts/schema'

export function formatDisplayName(contact: Contact) {
  if (contact.displayName) return contact.displayName

  const fullName = [contact.firstName, contact.lastName].filter(Boolean).join(' ')
  return fullName || 'Unnamed Contact'
}
