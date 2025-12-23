import { queryOptions, useQuery } from '@tanstack/react-query'

import {
  findContactFn,
  getContactsCountFn,
  listContactsFn,
} from '@/features/contacts/serverFunctions'

export const CONTACTS_QUERY_KEYS = {
  all: ['contacts'],
  count: () => [...CONTACTS_QUERY_KEYS.all, 'count'],
  list: () => [...CONTACTS_QUERY_KEYS.all, 'list'],
  find: (id: string) => [...CONTACTS_QUERY_KEYS.all, 'find', id],
}

export function getContactsCountQueryOptions() {
  return queryOptions({
    queryKey: CONTACTS_QUERY_KEYS.count(),
    queryFn: getContactsCountFn,
  })
}
export function useContactsCountQuery() {
  return useQuery(getContactsCountQueryOptions())
}

export function getListContactsQueryOptions() {
  return queryOptions({
    queryKey: CONTACTS_QUERY_KEYS.list(),
    queryFn: listContactsFn,
  })
}
export function useListContactsQuery() {
  return useQuery(getListContactsQueryOptions())
}

export function findContactQueryOptions(contactId: string) {
  return queryOptions({
    queryKey: CONTACTS_QUERY_KEYS.find(contactId),
    queryFn: () => findContactFn({ data: { contactId } }),
  })
}
export function useFindContactQuery(contactId: string) {
  return useQuery(findContactQueryOptions(contactId))
}
