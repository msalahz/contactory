import { queryOptions, useQuery } from '@tanstack/react-query'

import { listContactsFn } from '@/features/contacts/server/functions'

export const CONTACTS_QUERY_KEYS = {
  all: ['contacts'],
}

export function getListContactsQueryOptions() {
  return queryOptions({
    queryKey: CONTACTS_QUERY_KEYS.all,
    queryFn: listContactsFn,
  })
}

export function useListContactsQuery() {
  return useQuery(getListContactsQueryOptions())
}
