import { queryOptions } from '@tanstack/react-query'

import { CONTACTS_QUERY_KEYS } from '@/features/contacts/contants'
import { listContactsFn } from '@/features/contacts/server/functions'

export function getContactsQueryOptions() {
  return queryOptions({
    queryKey: CONTACTS_QUERY_KEYS.all,
    queryFn: listContactsFn,
  })
}
