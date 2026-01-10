# Tasks: Contacts CRUD

**Feature Branch**: `001-contacts-crud`
**Status**: Planned

## Phase 1: Setup

- [ ] T001 Install `@tanstack/react-virtual` and `@tanstack/react-table` dependencies
- [ ] T002 Verify R2 bucket bindings in `wrangler.jsonc` and `src/server/modules/r2.ts` readiness

## Phase 2: Foundation (Blocking)

- [ ] T003 [P] Update Drizzle schema in `src/server/schemas/contacts.ts` with new fields (avatarUrl, deletedAt, isFavorite, etc.)
- [ ] T004 Generate and apply database migrations for contacts table
- [ ] T005 [P] Implement core CRUD logic in `src/server/modules/contacts.ts` (list, get, create, update, soft-delete)
- [ ] T006 [P] Create Zod validation schemas in `src/server/schemas/contacts.ts` (create, update, search)
- [ ] T007 Implement server Query RPCs in `src/server/queries/contacts.ts`
- [ ] T008 Implement server Mutation RPCs in `src/server/mutations/contacts.ts`
- [ ] T009 [P] Create Query Keys factory in `src/features/contacts/keys.ts`
- [ ] T010 [P] Create Query Options factory in `src/features/contacts/options.ts`
- [ ] T039 [P] Create integration tests for contacts RPCs in `src/server/mutations/contacts.test.ts`

## Phase 3: View Contact List [US1]

- [ ] T040 [P] [US1] Create `ContactAvatar` component in `src/features/contacts/components/ContactAvatar.tsx` (initials fallback, colorful backgrounds)
- [ ] T011 [P] [US1] Create `ContactRow` component in `src/features/contacts/components/ContactRow.tsx` (modern styling, hover actions)
- [ ] T012 [US1] Create `ContactList` component using `useReactTable` + `useVirtualizer` in `src/features/contacts/components/ContactList.tsx`
- [ ] T041 [US1] Implement sticky table headers and skeleton loading states for infinite scroll
- [ ] T013 [US1] Create `ContactsLayout` component in `src/features/contacts/components/ContactsLayout.tsx` (Sidebar navigation: Contacts, Favorites, Trash)
- [ ] T014 [US1] Implement layout route in `src/routes/_user/contacts/route.tsx`
- [ ] T015 [US1] Implement index route (empty/placeholder) in `src/routes/_user/contacts/index.tsx`

## Phase 4: Create New Contact [US2]

- [ ] T016 [US2] Implement avatar upload RPC in `src/server/mutations/contacts.ts` using R2
- [ ] T042 [US2] Implement client-side image compression/resizing (max 512x512) before upload
- [ ] T017 [P] [US2] Create `ContactForm` component in `src/features/contacts/components/ContactForm.tsx` with Zod validation
- [ ] T018 [US2] Create `useCreateContact` hook in `src/features/contacts/hooks/useCreateContact.ts` (with optimistic updates)
- [ ] T019 [US2] Implement create sheet route in `src/routes/_user/contacts/new.tsx`

## Phase 5: View & Edit Details [US3] [US4]

- [ ] T020 [P] [US3] Create `ContactDetail` component in `src/features/contacts/components/ContactDetail.tsx`
- [ ] T021 [US3] Implement detail sheet route in `src/routes/_user/contacts/$contactId.tsx`
- [ ] T022 [US4] Create `useUpdateContact` hook in `src/features/contacts/hooks/useUpdateContact.ts` (with optimistic updates)
- [ ] T023 [US4] Implement edit sheet route in `src/routes/_user/contacts/$contactId.edit.tsx`

## Phase 6: Delete Contact [US5]

- [ ] T024 [P] [US5] Create `useDeleteContact` hook in `src/features/contacts/hooks/useDeleteContact.ts` (with optimistic updates)
- [ ] T025 [US5] Add delete action to `ContactRow` and `ContactDetail` dropdown menus
- [ ] T026 [US5] Implement Undo Toast notification logic in `src/features/contacts/hooks/useDeleteContact.ts`

## Phase 7: Search, Favorites & Sort [US6] [US7] [US8]

- [ ] T027 [US6] Update `listContacts` in `src/server/modules/contacts.ts` to handle search/sort/filter
- [ ] T028 [P] [US6] Create `ContactSearch` input component in `src/features/contacts/components/ContactSearch.tsx`
- [ ] T029 [US7] Create `FavoriteButton` component in `src/features/contacts/components/FavoriteButton.tsx`
- [ ] T030 [US7] Implement `toggleFavorite` mutation in `src/server/mutations/contacts.ts`
- [ ] T031 [US8] Add sorting controls to `ContactsLayout` headers (integrated with TanStack Table sorting state)

## Phase 8: Manage Trash [US9]

- [ ] T032 [US9] Implement `restoreContact` and `permanentDeleteContact` in `src/server/mutations/contacts.ts`
- [ ] T033 [P] [US9] Create `TrashList` component in `src/features/contacts/components/TrashList.tsx`
- [ ] T034 [US9] Implement trash view route in `src/routes/_user/contacts/trash.tsx`
- [ ] T035 [US9] Add navigation link to Trash in `ContactsLayout`

## Phase 9: Polish

- [ ] T036 Check accessibility (ARIA labels, keyboard nav) for all new components
- [ ] T037 Verify i18n keys for all new strings in `src/locales/`
- [ ] T038 Verify mobile responsiveness for Sheet interactions

## Dependencies

- Phase 2 blocks all subsequent phases
- Phase 3 blocks Phase 4, 5, 8
- Phase 4, 5, 6, 7 can be partially parallelized after Phase 3

## Implementation Strategy

- **MVP (Day 1-2)**: Setup, Foundation, List (Virtual), Create, Detail.
- **Enhanced (Day 3)**: Edit, Delete, Search, Favorites.
- **Complete (Day 4)**: Trash, Polish.
