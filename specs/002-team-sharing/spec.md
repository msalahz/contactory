# Feature Specification: Team Contact Sharing

**Feature Branch**: `002-team-sharing`
**Created**: 2026-01-12
**Status**: Draft
**Strategic Context**: [Market Research](../../docs/market-research.md) - Primary differentiation moat

## Overview

Team contact sharing enables small teams (2-20 people) to collaboratively manage shared contact lists with granular
permissions, activity tracking, and conflict resolution. This feature fills a critical gap that neither Google Contacts
nor Apple Contacts addresses.

**Why this matters**: Team collaboration is Contactory's primary competitive moat. Google sells ads, Apple sells
devices - neither has business incentive to build deep team contact management.

---

## User Scenarios & Testing

### User Story 1 - Create and Share a Contact List (Priority: P1)

As a team lead, I want to create a shared contact list and invite team members so we can collaboratively manage our
client contacts.

**Why this priority**: Core value proposition. Without sharing, there's no team feature.

**Independent Test**: Create a list, invite one team member, verify they can see the list.

**Acceptance Scenarios**:

1. **Given** I am logged in, **When** I click "New List" and enter a name, **Then** a new empty contact list is created
   with me as owner
2. **Given** I own a contact list, **When** I click "Share" and enter an email, **Then** an invitation is sent and the
   user appears as "Pending"
3. **Given** I received an invitation, **When** I click the invite link, **Then** I see the shared list in my sidebar
4. **Given** I am a list member, **When** the owner removes me, **Then** the list disappears from my sidebar immediately

---

### User Story 2 - Role-Based Permissions (Priority: P1)

As a list owner, I want to assign different permission levels (view, edit, admin) so I can control who can modify
contacts.

**Why this priority**: Without permissions, sharing is dangerous. Users won't trust the system.

**Independent Test**: Assign viewer role, verify they cannot edit contacts.

**Acceptance Scenarios**:

1. **Given** I own a list, **When** I invite a user, **Then** I can select their role: Viewer, Editor, or Admin
2. **Given** I am a Viewer, **When** I open a contact, **Then** I see details but cannot edit
3. **Given** I am an Editor, **When** I edit a contact, **Then** the change is saved and visible to all members
4. **Given** I am an Admin, **When** I access list settings, **Then** I can invite/remove members and change roles
5. **Given** I am the Owner, **When** I try to leave the list, **Then** I must first transfer ownership or delete the
   list

**Permission Matrix**:

| Action              | Viewer | Editor | Admin | Owner |
|---------------------|--------|--------|-------|-------|
| View contacts       | Yes    | Yes    | Yes   | Yes   |
| Add contacts        | No     | Yes    | Yes   | Yes   |
| Edit contacts       | No     | Yes    | Yes   | Yes   |
| Delete contacts     | No     | Yes    | Yes   | Yes   |
| View member list    | Yes    | Yes    | Yes   | Yes   |
| Invite members      | No     | No     | Yes   | Yes   |
| Remove members      | No     | No     | Yes   | Yes   |
| Change member roles | No     | No     | Yes   | Yes   |
| Rename list         | No     | No     | Yes   | Yes   |
| Delete list         | No     | No     | No    | Yes   |
| Transfer ownership  | No     | No     | No    | Yes   |

---

### User Story 3 - Activity History (Priority: P2)

As a team member, I want to see who changed what and when so I can track contact updates and resolve questions.

**Why this priority**: Builds trust and accountability. Critical for team adoption but not MVP-blocking.

**Independent Test**: Edit a contact, verify the activity log shows the change.

**Acceptance Scenarios**:

1. **Given** I am viewing a shared contact, **When** I click "Activity", **Then** I see a chronological list of changes
2. **Given** someone edited a contact, **When** I view activity, **Then** I see who made the change, what changed, and
   when
3. **Given** I am viewing list activity, **When** a member was added/removed, **Then** I see that in the activity log
4. **Given** activity is older than 90 days, **When** I scroll to load more, **Then** older activity loads on demand

**Activity Types to Track**:

- Contact created
- Contact field updated (with old/new values)
- Contact deleted (soft delete)
- Contact restored
- Member invited
- Member joined
- Member removed
- Member role changed
- List renamed

---

### User Story 4 - Team Duplicate Detection (Priority: P2)

As a team member, I want the system to detect potential duplicates across team members' additions so we don't have messy
data.

**Why this priority**: Data quality differentiator. Neither competitor does this for teams.

**Independent Test**: Add two contacts with same email, verify duplicate warning appears.

**Acceptance Scenarios**:

1. **Given** I am adding a contact, **When** the email matches an existing contact, **Then** I see a "Potential
   duplicate" warning
2. **Given** duplicates are detected, **When** I click "Review", **Then** I see a side-by-side comparison
3. **Given** I am reviewing duplicates, **When** I click "Merge", **Then** I can select which fields to keep from each
4. **Given** I am reviewing duplicates, **When** I click "Keep Both", **Then** both contacts are marked as "Not
   Duplicate"

**Duplicate Detection Rules**:

- Exact email match (case-insensitive)
- Exact phone match (normalized format)
- Fuzzy name match (> 85% similarity) + same company

---

### User Story 5 - Contact Ownership Transfer (Priority: P3)

As a team admin, I want to transfer contact ownership when someone leaves the team so contacts aren't orphaned.

**Why this priority**: Operational necessity for mature teams, not MVP-critical.

**Independent Test**: Transfer ownership of contacts from one user to another.

**Acceptance Scenarios**:

1. **Given** I am an Admin, **When** I view a member's contacts, **Then** I see an option to "Transfer Ownership"
2. **Given** I am transferring contacts, **When** I select a new owner, **Then** all selected contacts are reassigned
3. **Given** a member is removed from the list, **When** they had contacts, **Then** Admin sees prompt to transfer or
   keep as-is

---

### Edge Cases

- What happens when a user is in multiple teams with the same contact? (Contacts remain separate per list)
- What happens when the owner deletes their account? (Ownership transfers to oldest Admin, or list is deleted if no
  Admins)
- What happens during a sync conflict? (Last-write-wins with conflict UI for resolution)
- What happens if invitation email bounces? (Show "Invite Failed" status, allow resend)
- What happens with very large teams (>20)? (Soft limit with upgrade prompt for enterprise tier)

---

## Requirements

### Functional Requirements

- **FR-001**: Users MUST be able to create named contact lists
- **FR-002**: Users MUST be able to invite others to lists via email
- **FR-003**: Invitations MUST be accepted before access is granted
- **FR-004**: Lists MUST have exactly one Owner at all times
- **FR-005**: Owners MUST be able to assign roles: Viewer, Editor, Admin
- **FR-006**: Permission checks MUST occur server-side on every mutation
- **FR-007**: Activity log MUST capture all contact and membership changes
- **FR-008**: Activity log MUST be viewable by all list members
- **FR-009**: Duplicate detection MUST run on contact create/update
- **FR-010**: Duplicate detection MUST compare across all list members' contacts
- **FR-011**: Soft-deleted contacts MUST be restorable for 30 days
- **FR-012**: Deleted lists MUST cascade soft-delete all contained contacts

### Key Entities

- **ContactList**: Named container for shared contacts. Has one owner, many members.
- **ListMembership**: Junction between User and ContactList with role (owner/admin/editor/viewer)
- **ListInvitation**: Pending invitation with token, email, intended role, expiration
- **ActivityLog**: Immutable record of changes with actor, action, timestamp, details
- **Contact**: Extended with `listId` foreign key and `createdById` for ownership tracking

### Non-Functional Requirements (Constitution Standards)

Per Contactory Constitution (`.specify/memory/constitution.md` v1.0.0):

**Code Quality**:

- **NFR-Q1**: TypeScript strict mode with Zod validation for all API inputs
- **NFR-Q2**: Explicit imports only (no barrel exports)

**Testing** (Risk-Based):

- **NFR-T1**: Permission checks are HIGH-RISK - require integration + unit tests
- **NFR-T2**: Invitation flow is MEDIUM-RISK - require integration tests
- **NFR-T3**: Activity logging is MEDIUM-RISK - require integration tests

**User Experience**:

- **NFR-UX1**: WCAG 2.1 AA compliance (keyboard nav for all sharing UI)
- **NFR-UX2**: All user-facing text via i18n keys
- **NFR-UX3**: Invitation sends within 200ms of click (background job)
- **NFR-UX4**: Undo for accidental member removal (5-second toast)

**Performance**:

- **NFR-P1**: List view loads in < 2s with 500 contacts
- **NFR-P2**: Activity log loads first 50 items in < 1s
- **NFR-P3**: Duplicate check completes in < 500ms during contact save
- **NFR-P4**: Permission check adds < 50ms to API response time

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: Team of 5 can create shared list and all access it within 5 minutes
- **SC-002**: Permission violations return 403 in < 100ms (no data leak window)
- **SC-003**: 90% of users understand role differences without documentation
- **SC-004**: Duplicate detection catches > 95% of exact email matches
- **SC-005**: Activity log loads last 50 entries in < 1 second

### Beta Validation Goals

- Recruit 5-10 small teams for beta testing
- Each team actively uses sharing for 2+ weeks
- Net Promoter Score > 40 for team features
- < 5 permission-related support tickets per 100 users

---

## Technical Considerations

### Database Schema (Preliminary)

```sql
-- Contact lists
CREATE TABLE contact_lists
(
    id         UUID PRIMARY KEY,
    name       VARCHAR(255) NOT NULL,
    owner_id   UUID         NOT NULL REFERENCES users (id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP -- soft delete
);

-- List memberships
CREATE TABLE list_memberships
(
    id        UUID PRIMARY KEY,
    list_id   UUID        NOT NULL REFERENCES contact_lists (id),
    user_id   UUID        NOT NULL REFERENCES users (id),
    role      VARCHAR(20) NOT NULL CHECK (role IN ('viewer', 'editor', 'admin')),
    joined_at TIMESTAMP DEFAULT NOW(),
    UNIQUE (list_id, user_id)
);

-- Invitations
CREATE TABLE list_invitations
(
    id          UUID PRIMARY KEY,
    list_id     UUID         NOT NULL REFERENCES contact_lists (id),
    email       VARCHAR(255) NOT NULL,
    role        VARCHAR(20)  NOT NULL,
    token       VARCHAR(64)  NOT NULL UNIQUE,
    invited_by  UUID         NOT NULL REFERENCES users (id),
    expires_at  TIMESTAMP    NOT NULL,
    accepted_at TIMESTAMP,
    created_at  TIMESTAMP DEFAULT NOW()
);

-- Activity log
CREATE TABLE activity_logs
(
    id          UUID PRIMARY KEY,
    list_id     UUID        NOT NULL REFERENCES contact_lists (id),
    actor_id    UUID        NOT NULL REFERENCES users (id),
    action      VARCHAR(50) NOT NULL,
    target_type VARCHAR(50) NOT NULL,
    target_id   UUID,
    details     JSONB,
    created_at  TIMESTAMP DEFAULT NOW()
);

-- Extend contacts table
ALTER TABLE contacts
    ADD COLUMN list_id UUID REFERENCES contact_lists (id);
ALTER TABLE contacts
    ADD COLUMN created_by_id UUID REFERENCES users (id);
```

### API Endpoints (Preliminary)

```
POST   /api/lists                    # Create list
GET    /api/lists                    # Get user's lists
GET    /api/lists/:id                # Get list details
PATCH  /api/lists/:id                # Update list (name)
DELETE /api/lists/:id                # Delete list (owner only)

POST   /api/lists/:id/invitations    # Send invitation
GET    /api/lists/:id/invitations    # List pending invitations
DELETE /api/lists/:id/invitations/:inviteId  # Cancel invitation
POST   /api/invitations/:token/accept  # Accept invitation

GET    /api/lists/:id/members        # List members
PATCH  /api/lists/:id/members/:userId  # Change role
DELETE /api/lists/:id/members/:userId  # Remove member

GET    /api/lists/:id/activity       # Get activity log
GET    /api/contacts/:id/activity    # Get contact activity

POST   /api/lists/:id/contacts       # Add contact to list
GET    /api/lists/:id/duplicates     # Check for duplicates
POST   /api/lists/:id/merge          # Merge duplicates
```

---

## Open Questions

1. Should users be able to belong to multiple teams/organizations, or is this single-team initially?
2. Should we support "organization" as a level above "lists" for larger teams?
3. How should sync with Google/Apple handle shared contacts? (Sync to owner's account only?)
4. Should activity logs be exportable for compliance purposes?
5. What's the invitation expiration period? (Suggest: 7 days)

---

## Dependencies

- User authentication system (exists)
- Contact CRUD (in progress - 001-contacts-crud)
- Email sending via Resend (exists)
- Real-time updates via WebSocket or polling (new)

---

## Document History

| Date       | Author   | Changes               |
|------------|----------|-----------------------|
| 2026-01-12 | Mohammed | Initial specification |
