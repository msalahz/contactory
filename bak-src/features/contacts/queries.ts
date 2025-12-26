import { mutationOptions, queryOptions, useMutation, useQuery } from '@tanstack/react-query'

import {
  createContactFn,
  findContactFn,
  getContactsCountFn,
  listContactsFn,
} from '@/features/contacts/serverFunctions'

export const CONTACTS_QUERY_KEYS = {
  all: ['contacts'],
  count: () => [...CONTACTS_QUERY_KEYS.all, 'count'],
  list: () => [...CONTACTS_QUERY_KEYS.all, 'list'],
  find: (id: string) => [...CONTACTS_QUERY_KEYS.all, 'find', id],
  create: () => [...CONTACTS_QUERY_KEYS.all, 'create'],
  update: (id: string) => [...CONTACTS_QUERY_KEYS.all, 'update', id],
  delete: (id: string) => [...CONTACTS_QUERY_KEYS.all, 'delete', id],
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

export function createContactMutationOptions() {
  return mutationOptions({
    mutationKey: CONTACTS_QUERY_KEYS.create(),
    mutationFn: createContactFn,
  })
}
export function useCreateContactMutation() {
  return useMutation(createContactMutationOptions())
}
