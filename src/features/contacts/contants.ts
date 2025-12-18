export const CONTACTS_QUERY_KEYS = {
  all: ['contacts'],
  byId: (id: string) => [...CONTACTS_QUERY_KEYS.all, id],
}
