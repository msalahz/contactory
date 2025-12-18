import { useQuery } from '@tanstack/react-query'
import { getContactsQueryOptions } from '@/features/contacts/hooks/query-options'

export function useContactsQuery() {
  return useQuery(getContactsQueryOptions())
}
