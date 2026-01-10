# Feature Specification: Contacts CRUD

**Feature Branch**: `001-contacts-crud`  
**Created**: 2026-01-08  
**Updated**: 2026-01-10  
**Status**: Clarified  
**Input**: User description: "contacts crud"

## Clarifications

### Session 2026-01-08

- Q: How should large lists be handled? → A: **Virtual Scrolling / Infinite Load** (Continuously load items as user scrolls. Best for scanning.)
- Q: Is bulk import/export required for MVP? → A: **No, Out of Scope** (Manual entry only. Keep MVP focused on CRUD.)
- Q: Should soft-deleted contacts be viewable in a Trash folder? → A: **Trash View Required** (Dedicated page to view and restore deleted contacts.)
- Q: How should contact avatars be handled? → A: **File Upload Required** (Must implement image upload/storage (R2) immediately.)

### Session 2026-01-10 (Detailed UX/Technical Interview)

#### Virtual Scrolling & Performance

- Q: Pagination strategy for infinite scroll? → A: **Cursor-based pagination** (`WHERE id > :lastId LIMIT 50`). Provides consistent results during inserts/deletes without offset drift.
- Q: Scroll behavior when search results update? → A: **Reset to top of list**. Search is a "new query"; users expect to browse from the beginning.
- Q: Virtualizer overscan amount? → A: **10-15 rows** outside viewport. Provides buffer for fast scrolling without negating virtualization benefits.

#### Soft Delete & Trash Management

- Q: Multiple sequential deletes within undo window? → A: **Stacked toasts** with individual 5-second timers. Each deletion deserves its own undo opportunity.
- Q: Trash auto-purge policy? → A: **No auto-purge** (keep forever until manually deleted). Maximum data safety; users explicitly manage trash cleanup.
- Q: Undo toast persistence across navigation? → A: **Global toast persistence** until timer expires. Undo remains available even if user navigates to another page.

#### Avatar Upload

- Q: Avatar upload timing? → A: **Upload as part of form submission**. Atomic operation; no orphaned uploads if user cancels.
- Q: Replacing existing avatar? → A: **Upload new image first, then delete old**. Safe pattern; old URL remains valid until replacement confirmed.

#### Search & Filtering

- Q: Search debounce timing? → A: **300ms**. Balanced responsiveness and API efficiency.
- Q: Search scope with active filter? → A: **Search within current filter** (e.g., only favorites matching query). Filters and search compose; user clears filter for broader results.
- Q: Empty search results CTA? → A: **"No contacts found" + "Clear search" button + spelling suggestion**. Actionable recovery path.

#### Navigation & Sheet Behavior

- Q: Browser back from edit sheet? → A: **Back to contact list** (`/contacts`). Direct return; detail sheet can be re-opened separately.
- Q: Deep link to edit URL? → A: **Show edit sheet directly** (respect the URL). URL intent is honored; user sees edit form immediately.

#### Mobile Experience

- Q: Contact list layout on mobile (<768px)? → A: **Card/list view** with stacked information. Touch-friendly, no horizontal scroll.
- Q: Form presentation on mobile? → A: **Bottom sheet** (slides up). Native mobile feel, thumb-friendly, can expand to full-screen.
- Q: Swipe actions on mobile cards? → A: **Yes** - swipe right for favorite, swipe left for delete. Include haptic feedback.

#### Error Handling & Resilience

- Q: Failed optimistic delete? → A: **Restore contact to list + show error toast**. Clear feedback; user understands system state.
- Q: Network timeout during avatar upload? → A: **Auto-retry once silently, then show error with "Retry" button**. Handles transient failures gracefully.
- Q: Stale data after background tab? → A: **Refetch on window focus** (TanStack Query default). Standard pattern; always show fresh data.

#### Favorites & Sorting

- Q: Favorites display location? → A: **Pinned at top of list**, visually separated from regular contacts. Quick access to important contacts.
- Q: Sort preference persistence? → A: **Persist in URL** (shareable, bookmarkable). Matches URL-driven architecture.
- Q: Favorite toggle feedback? → A: **Instant visual toggle + subtle toast** "Added to favorites". Confirms action without blocking.

#### Internationalization (i18n)

- Q: Language switcher placement? → A: **User profile/settings dropdown**. Language is a preference; users change it once.
- Q: Number display in Arabic locale? → A: **Western numerals (0-9)** regardless of locale. Universally readable; common in modern Arabic apps.
- Q: Phone number formatting? → A: **Smart formatting based on detected country code**, fallback to raw input. Improves readability.

#### Data Privacy & Cleanup

- Q: Permanent delete confirmation? → A: **Single confirmation dialog**: "Permanently delete? This cannot be undone." Standard safety check.
- Q: Avatar cleanup on permanent delete? → A: **Delete avatar from R2** as part of permanent delete. Complete cleanup; no orphaned files.
- Q: "Empty Trash" bulk action? → A: **Yes, with confirmation dialog showing count**. Convenient cleanup with clear warning.

#### Form UX & Validation

- Q: Required fields for contact creation? → A: **Only first name**. Minimum viable contact; users can add more info later.
- Q: Form field organization? → A: **Grouped sections** (Basic Info, Contact, Work, Address) in single scroll. Visual organization, all fields visible.
- Q: Unsaved changes warning? → A: **Confirmation dialog**: "Discard changes?" Standard browser-like behavior.

#### Performance & Metrics

- Q: Initial page load target? → A: **Under 2 seconds** to interactive. Achievable with code splitting; below perception threshold.
- Q: Image optimization strategy? → A: **Client-side resize/compress before upload**, cap at 512x512. Reduces upload time and storage; no server CPU cost.
- Q: List rendering performance target? → A: **60 FPS during scroll**. Standard for smooth UX; achievable with virtualization.

## User Scenarios & Testing _(mandatory)_

### User Story 1 - View Contact List (Priority: P1)

As an authenticated user, I want to see all my contacts in a list view so I can quickly browse and find the people I need to reach.

**Why this priority**: The contact list is the foundation of the application. Without viewing contacts, no other functionality provides value. This is the entry point for all contact management activities.

**Independent Test**: Can be fully tested by logging in, navigating to contacts page, and verifying contacts are displayed in a list format with key information visible. Scrolling down should load more contacts automatically.

**Acceptance Scenarios**:

1. **Given** I am logged in and have existing contacts, **When** I navigate to the contacts page, **Then** I see my contacts displayed in a list with name, email, phone, and company visible
2. **Given** I am logged in and have no contacts, **When** I navigate to the contacts page, **Then** I see an empty state prompting me to add my first contact
3. **Given** I am logged in, **When** I view the contacts list, **Then** I only see contacts I own (not other users' contacts)
4. **Given** I have many contacts (e.g., >50), **When** I scroll to the bottom of the list, **Then** more contacts load automatically without page reload (virtual scrolling)

---

### User Story 2 - Create New Contact (Priority: P1)

As a user, I want to add new contacts to my address book so I can store and organize information about people I interact with.

**Why this priority**: Creating contacts is essential for the application to have any data to work with. Without creation, the list remains empty and the product provides no value.

**Independent Test**: Can be fully tested by opening the create contact form, uploading an avatar, filling in required fields, and submitting. The new contact should appear in the list with the uploaded image.

**Acceptance Scenarios**:

1. **Given** I am on the contacts page, **When** I click "Add Contact", **Then** a form opens allowing me to enter contact details and upload a photo
2. **Given** I have the create form open, **When** I enter a first name and submit, **Then** the contact is created and appears in my list
3. **Given** I have the create form open, **When** I fill all fields and upload a valid image file, **Then** all information including the avatar is saved correctly
4. **Given** I have the create form open with valid data, **When** I submit, **Then** the form closes and I see confirmation of successful creation

---

### User Story 3 - View Contact Details (Priority: P2)

As a user, I want to view complete details of a specific contact so I can see all stored information about that person.

**Why this priority**: Viewing details enables users to access all information they've stored. While the list shows summary info, the detail view provides the complete picture.

**Independent Test**: Can be fully tested by clicking on a contact in the list and verifying all stored fields are displayed (name, email, phone, company, job title, address, notes, website, favorite status).

**Acceptance Scenarios**:

1. **Given** I am viewing my contacts list, **When** I click on a contact, **Then** I see a detail view with all contact information
2. **Given** I am viewing contact details, **When** I look at the display, **Then** I see all fields I previously entered for this contact
3. **Given** I am viewing contact details, **When** I click close or navigate away, **Then** I return to the contacts list

---

### User Story 4 - Edit Existing Contact (Priority: P2)

As a user, I want to update contact information so I can keep my address book accurate and current.

**Why this priority**: Contact information changes over time (new phone numbers, job changes, moves). Edit functionality ensures the data remains useful.

**Independent Test**: Can be fully tested by selecting a contact, opening edit mode, changing one or more fields, saving, and verifying the changes persist.

**Acceptance Scenarios**:

1. **Given** I am viewing a contact's details, **When** I click "Edit", **Then** I see an editable form pre-filled with current values
2. **Given** I have the edit form open, **When** I modify fields and save, **Then** the changes are persisted and visible immediately
3. **Given** I have the edit form open, **When** I cancel without saving, **Then** no changes are made to the contact

---

### User Story 5 - Delete Contact (Priority: P2)

As a user, I want to delete contacts I no longer need so I can keep my address book clean and relevant.

**Why this priority**: Users need to remove outdated or incorrect entries. However, data integrity and accidental deletion prevention are concerns.

**Independent Test**: Can be fully tested by deleting a contact, verifying it moves to trash, and then either restoring it or permanently deleting it from the trash.

**Acceptance Scenarios**:

1. **Given** I am viewing a contact, **When** I click "Delete", **Then** I am asked to confirm the deletion
2. **Given** I confirm deletion, **When** the action completes, **Then** the contact is removed from my active list and moved to the Trash
3. **Given** I delete a contact, **When** within a short time window, **Then** I can undo the deletion to restore the contact immediately
4. **Given** I have deleted contacts, **When** I visit the Trash view, **Then** I see all soft-deleted contacts
5. **Given** I am in the Trash view, **When** I restore a contact, **Then** it reappears in my main contact list
6. **Given** I am in the Trash view, **When** I permanently delete a contact, **Then** it is gone forever and cannot be recovered

---

### User Story 6 - Search Contacts (Priority: P3)

As a user with many contacts, I want to search by name, email, or company so I can quickly find specific people.

**Why this priority**: Search becomes critical as the contact list grows. For users with dozens or hundreds of contacts, manual browsing is impractical.

**Independent Test**: Can be fully tested by typing a search term and verifying only matching contacts are displayed.

**Acceptance Scenarios**:

1. **Given** I have multiple contacts, **When** I type a name in the search box, **Then** only contacts matching that name are displayed
2. **Given** I search for an email address, **When** results appear, **Then** contacts with matching email are shown
3. **Given** I search for a company name, **When** results appear, **Then** contacts at that company are shown
4. **Given** I clear the search box, **When** the field is empty, **Then** all contacts are displayed again

---

### User Story 7 - Mark Favorites (Priority: P3)

As a user, I want to mark certain contacts as favorites so I can quickly access the people I contact most frequently.

**Why this priority**: Favorites provide a quick-access layer for power users but are not essential for basic contact management.

**Independent Test**: Can be fully tested by toggling a contact's favorite status and verifying the star icon updates immediately. Can also filter to show only favorites.

**Acceptance Scenarios**:

1. **Given** I am viewing a contact (list or detail), **When** I click the favorite/star icon, **Then** the contact is marked as favorite with visual feedback
2. **Given** a contact is marked as favorite, **When** I click the star again, **Then** it is unmarked as favorite
3. **Given** I have some favorite contacts, **When** I filter by favorites, **Then** only favorite contacts are shown

---

### User Story 8 - Sort and Filter Contacts (Priority: P3)

As a user, I want to sort my contacts by name, company, or date added, and filter by favorites so I can organize my view based on my current needs.

**Why this priority**: Sorting and filtering enhance usability for larger contact lists but are secondary to core CRUD operations.

**Independent Test**: Can be fully tested by changing sort order and verifying the list reorders correctly. Filter by favorites and verify only favorites show.

**Acceptance Scenarios**:

1. **Given** I am viewing contacts, **When** I sort by name (A-Z), **Then** contacts are ordered alphabetically by first name
2. **Given** I am viewing contacts, **When** I sort by company, **Then** contacts are grouped/ordered by company name
3. **Given** I am viewing contacts, **When** I sort by date added, **Then** newest contacts appear first (or last, depending on order)
4. **Given** I apply multiple filters/sorts, **When** I share or bookmark the URL, **Then** the same view is restored when revisiting

---

### User Story 9 - Manage Trash (Priority: P3)

As a user, I want to view and manage deleted contacts so I can recover accidental deletions or permanently remove sensitive data.

**Why this priority**: Safety net for users. Essential for "Undo" mechanics and data privacy (permanent removal).

**Independent Test**: Can be fully tested by navigating to the Trash view, observing soft-deleted items, and performing restore or permanent delete actions.

**Acceptance Scenarios**:

1. **Given** I have deleted contacts, **When** I navigate to the Trash page, **Then** I see a list of deleted contacts
2. **Given** I am in the Trash, **When** I select "Restore" for a contact, **Then** the contact is moved back to the main list
3. **Given** I am in the Trash, **When** I select "Delete Forever", **Then** the contact is permanently removed from the database

---

### Edge Cases

- What happens when user tries to create a contact with only whitespace in the first name field? → Validation error, first name must contain non-whitespace characters
- What happens when user enters an invalid email format? → Validation error with clear message about expected format
- What happens when user enters an invalid website URL? → Validation error with clear message about expected format
- How does the system handle very long field values (e.g., 1000+ character notes)? → Accept and store, truncate display if needed with "show more"
- What happens if user tries to delete a contact while offline? → Queue action for when back online, or show error if offline mode not supported
- How does the system handle duplicate contacts? → Allow duplicates (users may have legitimate reasons); consider future deduplication feature
- What happens when searching with special characters? → Escape properly, search should not break
- What happens when the contact list has 1000+ contacts? → Virtual scrolling handles performance, loading items as user scrolls
- What happens when uploading a very large image? → Reject images over 5MB, resize/compress on client before upload if possible

## Requirements _(mandatory)_

### Functional Requirements

**Core CRUD**

- **FR-001**: System MUST allow authenticated users to create new contacts with at minimum a first name
- **FR-002**: System MUST allow users to view a list of all their contacts
- **FR-003**: System MUST allow users to view complete details of any contact they own
- **FR-004**: System MUST allow users to edit any field of a contact they own
- **FR-005**: System MUST allow users to delete contacts they own (soft delete)

**Data Isolation**

- **FR-006**: System MUST ensure users can only view, edit, and delete their own contacts
- **FR-007**: System MUST associate every contact with exactly one user (the owner)

**Contact Fields & Media**

- **FR-008**: System MUST support these contact fields: first name (required), last name, display name, nickname, primary email, primary phone, company, job title, department, street address, city, state, postal code, country, notes, website, favorite status
- **FR-009**: System MUST validate email fields contain valid email format when provided
- **FR-010**: System MUST validate website fields contain valid URL format when provided
- **FR-018**: System MUST allow users to upload an avatar image (JPG/PNG) for a contact
- **FR-019**: System MUST store contact images in secure object storage (R2)

**Search & Filter**

- **FR-011**: System MUST allow users to search contacts by name, email, and company
- **FR-012**: System MUST allow users to filter contacts to show only favorites
- **FR-013**: System MUST allow users to sort contacts by name, company, or date created
- **FR-020**: System MUST implement virtual scrolling for the contact list to support large datasets efficiently

**Soft Delete, Trash & Undo**

- **FR-014**: System MUST implement soft delete for contacts (not permanent deletion initially)
- **FR-015**: System MUST provide an undo option within 5 seconds after deletion
- **FR-021**: System MUST provide a "Trash" view to list soft-deleted contacts
- **FR-022**: System MUST allow users to restore contacts from the Trash
- **FR-023**: System MUST allow users to permanently delete contacts from the Trash
- **FR-024**: System MUST support stacked undo toasts when multiple contacts are deleted in quick succession
- **FR-025**: System MUST persist undo toast globally until timer expires (even across page navigation)
- **FR-026**: System MUST NOT auto-purge trash (contacts remain in trash until manually deleted)
- **FR-027**: System MUST provide an "Empty Trash" bulk action with confirmation showing item count
- **FR-028**: System MUST delete associated avatar from R2 storage when contact is permanently deleted

**URL State**

- **FR-016**: System MUST reflect current view state (search query, filters, selected contact) in the URL
- **FR-017**: System MUST restore the correct view when a user navigates to a URL with state parameters
- **FR-029**: System MUST show edit sheet directly when user navigates to edit URL (respect URL intent)

**Mobile Experience**

- **FR-030**: System MUST display contact list as cards on mobile devices (<768px viewport)
- **FR-031**: System MUST present forms in bottom sheet on mobile devices
- **FR-032**: System MUST support swipe gestures on mobile (right for favorite, left for delete)

**Performance**

- **FR-033**: System MUST resize/compress avatar images client-side before upload (max 512x512)
- **FR-034**: System MUST use cursor-based pagination for contact list queries
- **FR-035**: System MUST maintain 60 FPS during list scrolling with 1000+ contacts

**Error Handling**

- **FR-036**: System MUST restore UI state and show error toast if optimistic update fails
- **FR-037**: System MUST auto-retry avatar uploads once on transient failure before showing error
- **FR-038**: System MUST refetch contact data on window focus to ensure freshness

**Exclusions**

- **EX-001**: Bulk import/export of contacts is OUT OF SCOPE for this release

### Key Entities

- **Contact**: Represents a person in the user's address book. Contains personal information (name, nickname), contact methods (email, phone), professional information (company, job title, department), physical address, and metadata (notes, website, favorite status, timestamps). Each contact belongs to exactly one user.

- **User**: The owner of contacts. Already exists in the system via authentication. A user can have zero to many contacts.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Users can create a new contact with all fields in under 60 seconds
- **SC-002**: Users can find a specific contact via search in under 5 seconds (from typing to viewing result)
- **SC-003**: Contact list displays and becomes interactive within 2 seconds for up to 500 contacts
- **SC-004**: System handles 1000+ contacts per user without noticeable UI lag or performance degradation
- **SC-005**: 95% of users successfully create their first contact on first attempt without errors
- **SC-006**: Delete with undo prevents accidental data loss - undo success rate tracked
- **SC-007**: All contact operations (create, edit, delete, favorite toggle) provide immediate visual feedback within 200ms
- **SC-008**: Contact URLs are shareable - opening a shared contact URL shows that contact's details directly
- **SC-009**: List scrolling maintains 60 FPS with 1000+ contacts (virtualization performance)
- **SC-010**: Search debounce of 300ms provides responsive feel without excessive API calls
- **SC-011**: Avatar upload completes within 3 seconds for images up to 5MB (after client-side compression)
- **SC-012**: Mobile swipe actions register correctly 99% of the time with haptic feedback confirmation
