# Feature Specification: Verified Team Contact Sharing

**Feature Branch**: `002-team-sharing`
**Created**: 2026-01-12
**Updated**: 2026-01-12
**Status**: Draft (Revised for VC/SSI Strategy)
**Strategic Context**: [Market Research](../../docs/market-research.md) - VC/SSI Pivot Strategy

## Overview

Verified team contact sharing enables teams to collaboratively manage contact lists where **contacts are cryptographically verifiable credentials**. Unlike traditional contact sharing (already solved by Shared Contacts for Gmail at $1.29/user), Contactory's approach uses W3C Verifiable Credentials (VCs) to enable:

1. **Self-updating contacts** - When a contact updates their info, your copy updates automatically
2. **Verified professional identity** - Cryptographic proof that "John at Acme Corp" actually works there
3. **Selective disclosure** - Contacts share only what they want (email but not phone)
4. **Team-wide trust** - Share verifiable contacts across your team with audit trails

**Why this matters**: This positioning differentiates Contactory from the 6+ existing team sharing solutions. We're not building "another shared contacts app" - we're building the **contact layer for the verifiable credential economy**.

---

## Strategic Context

### Market Reality (See [Market Research](../../docs/market-research.md))

| Existing Solutions        | What They Do               | Gap                          |
| ------------------------- | -------------------------- | ---------------------------- |
| Shared Contacts for Gmail | Team sharing at $1.29/user | No verification, static data |
| Contacts+                 | Cross-platform sync        | No VCs, data goes stale      |
| HubSpot Free CRM          | Free team contacts         | No privacy, no verification  |
| Folk CRM                  | Modern team CRM            | No decentralized identity    |

### Our Differentiation

**Traditional Contacts**: Static data that goes stale, no verification, no privacy control
**Contactory VC Contacts**: Self-updating, cryptographically verified, selective disclosure

### Regulatory Tailwind

- **EU eIDAS 2.0** mandates digital identity wallets by September 2026
- **W3C VC 2.0** became a standard in May 2025
- Businesses will need VC-compatible systems for compliance

---

## User Scenarios & Testing

### User Story 1 - Receive a Verified Contact (Priority: P0)

As a user, I want to receive a contact's verifiable credential so I always have their latest, verified information.

**Why this priority**: Core VC value proposition. If users can't receive VCs, nothing else matters.

**Independent Test**: User A shares their VC with User B, User B sees verified contact.

**Acceptance Scenarios**:

1. **Given** someone shares their contact VC with me via link/QR, **When** I open it, **Then** I see their verified information with a "Verified" badge
2. **Given** I received a VC contact, **When** the issuer updates their information, **Then** my copy updates automatically (or I'm notified)
3. **Given** I'm viewing a verified contact, **When** I check verification, **Then** I see who issued the credential and when
4. **Given** a contact's employer revokes their work credential, **When** I view the contact, **Then** I see "Employment verification expired" warning

---

### User Story 2 - Share My Contact with Selective Disclosure (Priority: P0)

As a user, I want to share my contact information while controlling exactly what each recipient can see.

**Why this priority**: Privacy control is the core SSI value proposition.

**Independent Test**: Share contact with email only, verify recipient cannot see phone.

**Acceptance Scenarios**:

1. **Given** I want to share my contact, **When** I click "Share", **Then** I see a checklist of which fields to include
2. **Given** I'm sharing my contact, **When** I select only "Email" and "Name", **Then** the recipient only sees those fields
3. **Given** I shared my contact with someone, **When** I update my information, **Then** their copy updates automatically
4. **Given** I shared my contact, **When** I revoke access, **Then** the recipient sees "Contact revoked" and can no longer see my details

**Selective Disclosure Options**:

| Field        | Default Shared | Can Hide      |
| ------------ | -------------- | ------------- |
| Name         | Yes            | No (required) |
| Email        | Yes            | Yes           |
| Phone        | No             | Yes           |
| Job Title    | Yes            | Yes           |
| Company      | Yes            | Yes           |
| Address      | No             | Yes           |
| Social Links | No             | Yes           |

---

### User Story 3 - Create a Verified Team Directory (Priority: P1)

As a team lead, I want to create a shared contact list where all team members can add verified contacts.

**Why this priority**: Team collaboration with verified contacts is our core differentiator.

**Independent Test**: Create team list, add verified contact, verify all members see it with verification status.

**Acceptance Scenarios**:

1. **Given** I am logged in, **When** I create a new team list, **Then** I become the owner
2. **Given** I own a team list, **When** I invite a team member, **Then** they receive a VC-based invitation
3. **Given** I am a team member, **When** I add a verified contact to the list, **Then** all members see the contact with its verification status
4. **Given** a contact's verification expires, **When** any team member views it, **Then** they see the verification warning
5. **Given** I am viewing our team directory, **When** I filter by "Verified only", **Then** I see only contacts with valid credentials

---

### User Story 4 - Role-Based Permissions with Verifiable Audit (Priority: P1)

As a list owner, I want to assign permission levels where all actions are cryptographically logged.

**Why this priority**: Compliance teams need auditable permission systems.

**Independent Test**: Assign viewer role, verify they cannot edit and action is logged.

**Acceptance Scenarios**:

1. **Given** I own a list, **When** I invite a user, **Then** I can select their role: Viewer, Editor, Admin
2. **Given** I am a Viewer, **When** I try to edit a contact, **Then** I am blocked and the attempt is logged
3. **Given** I am an Editor, **When** I edit a contact, **Then** the change is logged with my DID signature
4. **Given** I need to export audit log, **When** I click "Export", **Then** I get a cryptographically signed audit report

**Permission Matrix** (unchanged from original):

| Action              | Viewer | Editor | Admin | Owner |
| ------------------- | ------ | ------ | ----- | ----- |
| View contacts       | Yes    | Yes    | Yes   | Yes   |
| Add contacts        | No     | Yes    | Yes   | Yes   |
| Edit contacts       | No     | Yes    | Yes   | Yes   |
| Delete contacts     | No     | Yes    | Yes   | Yes   |
| View member list    | Yes    | Yes    | Yes   | Yes   |
| Invite members      | No     | No     | Yes   | Yes   |
| Remove members      | No     | No     | Yes   | Yes   |
| Change member roles | No     | No     | Yes   | Yes   |
| Export audit log    | No     | No     | Yes   | Yes   |
| Delete list         | No     | No     | No    | Yes   |

---

### User Story 5 - Issue Organizational Credentials (Priority: P2)

As an organization admin, I want to issue verifiable credentials to my employees so they can prove they work for us.

**Why this priority**: B2B use case - organizations as credential issuers.

**Independent Test**: Issue employee credential, verify it appears on their profile with company verification.

**Acceptance Scenarios**:

1. **Given** I am an org admin, **When** I access "Issue Credentials", **Then** I see my organization's issuer profile
2. **Given** I want to credential an employee, **When** I enter their email and role, **Then** they receive a VC proving employment
3. **Given** an employee leaves, **When** I revoke their credential, **Then** their contacts show "Employment verification expired"
4. **Given** someone views a credentialed employee, **When** they check verification, **Then** they see our organization's verified badge

---

### User Story 6 - Zero-Knowledge Proofs for Privacy (Priority: P3)

As a privacy-conscious user, I want to prove claims without revealing underlying data.

**Why this priority**: Advanced privacy feature for later phases.

**Independent Test**: Prove "I work at a Fortune 500" without revealing company name.

**Acceptance Scenarios**:

1. **Given** I have a company credential, **When** sharing, **Then** I can choose "Prove Fortune 500" instead of revealing company
2. **Given** I have an age credential, **When** sharing, **Then** I can prove "Over 18" without revealing birthdate
3. **Given** a recipient receives a ZKP claim, **When** they verify, **Then** they see "Claim verified" without the underlying data

---

## Requirements

### Functional Requirements (VC-Enhanced)

**Core VC Functionality**:

- **FR-VC01**: Users MUST be able to create a Decentralized Identifier (DID)
- **FR-VC02**: Users MUST be able to receive Verifiable Credentials from issuers
- **FR-VC03**: Users MUST be able to share contact info as a VC with selective disclosure
- **FR-VC04**: VCs MUST be verifiable against issuer's public key
- **FR-VC05**: VC verification MUST show issuer identity and issuance date
- **FR-VC06**: Revoked VCs MUST show "Revoked" status within 1 hour
- **FR-VC07**: VCs MUST use W3C VC Data Model 2.0 format

**Team Sharing** (from original):

- **FR-001**: Users MUST be able to create named contact lists
- **FR-002**: Users MUST be able to invite others to lists via VC-based invitations
- **FR-003**: Invitations MUST be cryptographically signed
- **FR-004**: Lists MUST have exactly one Owner at all times
- **FR-005**: Owners MUST be able to assign roles: Viewer, Editor, Admin
- **FR-006**: Permission checks MUST occur server-side with DID verification
- **FR-007**: Activity log MUST be cryptographically signed by actor's DID
- **FR-008**: Activity log MUST be exportable for compliance audits

**Data Privacy**:

- **FR-P01**: Users MUST be able to revoke shared credentials at any time
- **FR-P02**: Revocation MUST propagate to all recipients within 24 hours
- **FR-P03**: Users MUST see who has accessed their shared credentials
- **FR-P04**: No contact data stored without explicit user consent

### Key Entities (VC-Enhanced)

- **DID (Decentralized Identifier)**: User's cryptographic identity
- **VerifiableCredential**: W3C VC 2.0 format credential containing contact info
- **ContactList**: Named container for shared verifiable contacts
- **ListMembership**: Junction with role, signed by inviter's DID
- **ListInvitation**: VC-based invitation with cryptographic proof
- **ActivityLog**: Immutable, DID-signed record of changes
- **RevocationRegistry**: Track revoked credentials

### Non-Functional Requirements

**Per Contactory Constitution** (`.specify/memory/constitution.md` v1.0.0):

**Code Quality**:

- **NFR-Q1**: TypeScript strict mode with Zod validation for all VC payloads
- **NFR-Q2**: All VC operations use established libraries (see [VC Technical Research](./vc-technical-research.md))

**Testing** (Risk-Based):

- **NFR-T1**: VC verification is HIGH-RISK - require integration + unit tests
- **NFR-T2**: Permission checks with DID - require integration tests
- **NFR-T3**: Revocation propagation - require integration tests

**User Experience**:

- **NFR-UX1**: WCAG 2.1 AA compliance
- **NFR-UX2**: "Verified" badge visually distinct and accessible
- **NFR-UX3**: VC operations should feel instant (<500ms UI feedback)
- **NFR-UX4**: Clear explanation of what "verified" means for non-technical users

**Performance**:

- **NFR-P1**: VC verification completes in <500ms
- **NFR-P2**: List view with 100 verified contacts loads in <2s
- **NFR-P3**: Selective disclosure UI renders in <200ms
- **NFR-P4**: Revocation check adds <100ms to contact view

**Security**:

- **NFR-S1**: Private keys NEVER leave user's device (use browser crypto APIs)
- **NFR-S2**: All VC operations use established cryptographic standards
- **NFR-S3**: Server NEVER has access to unencrypted private keys

---

## Implementation Phases

### Phase 1: Privacy-First Foundation (Now - Q1 2026)

**Focus**: Core contact management with encryption

- End-to-end encrypted contacts
- Local-first architecture (data on device first)
- Basic team sharing (traditional, not VC-based)
- No data harvesting commitment

**Success Criteria**:

- Users can create encrypted contacts
- Team sharing works with role-based permissions
- All user data is encrypted at rest

### Phase 2: VC Integration (Q2-Q3 2026)

**Focus**: Add verifiable credential support

- DID creation and management
- Receive VCs from external issuers
- Share contact as VC with selective disclosure
- Basic verification UI

**Success Criteria**:

- Users can create DIDs
- Users can receive and verify VCs
- Selective disclosure works for sharing

### Phase 3: Full VC Platform (Q4 2026 - aligned with eIDAS)

**Focus**: Complete VC ecosystem

- Issue organizational credentials
- Advanced verification (ZKP support)
- EU wallet interoperability
- Compliance certifications

**Success Criteria**:

- Organizations can issue employee VCs
- ZKP proofs work for privacy claims
- Interoperable with EU Digital Wallet

---

## Success Criteria (Updated)

### Measurable Outcomes

- **SC-001**: 80% of users understand "verified contact" vs "regular contact" distinction
- **SC-002**: VC verification completes in <500ms for 95% of requests
- **SC-003**: Selective disclosure reduces shared data fields by >50% on average
- **SC-004**: <1% of VCs fail verification due to system errors
- **SC-005**: Revocation propagates to all holders within 24 hours

### Beta Validation Goals

- Recruit 20+ privacy-conscious professionals (lawyers, doctors, journalists)
- Recruit 5+ small business compliance teams
- > 60% express willingness to pay for verified contacts
- NPS >50 for verification features

---

## Technical Considerations

### VC Technology Stack

See [VC Technical Research](./vc-technical-research.md) for detailed analysis.

**Summary**:

- **VC Format**: W3C VC Data Model 2.0 (JSON-LD or JWT)
- **DID Method**: `did:web` for organizations, `did:key` for individuals (initially)
- **Libraries**: `@veramo/core` or `@web5/credentials` (to be evaluated)
- **Crypto**: Web Crypto API for key management

### Database Schema (VC-Enhanced)

```sql
-- User DIDs
CREATE TABLE user_dids (
    id          UUID PRIMARY KEY,
    user_id     UUID NOT NULL REFERENCES users(id),
    did         VARCHAR(255) NOT NULL UNIQUE,
    public_key  TEXT NOT NULL,
    method      VARCHAR(50) NOT NULL, -- 'did:key', 'did:web', etc.
    is_primary  BOOLEAN DEFAULT false,
    created_at  TIMESTAMP DEFAULT NOW()
);

-- Verifiable Credentials (received)
CREATE TABLE received_credentials (
    id              UUID PRIMARY KEY,
    holder_id       UUID NOT NULL REFERENCES users(id),
    issuer_did      VARCHAR(255) NOT NULL,
    credential_type VARCHAR(100) NOT NULL,
    credential_jwt  TEXT NOT NULL, -- The actual VC
    subject_data    JSONB NOT NULL, -- Extracted claims (cached)
    issued_at       TIMESTAMP NOT NULL,
    expires_at      TIMESTAMP,
    revoked_at      TIMESTAMP,
    last_verified   TIMESTAMP,
    created_at      TIMESTAMP DEFAULT NOW()
);

-- Shared Credentials (issued to others)
CREATE TABLE shared_credentials (
    id              UUID PRIMARY KEY,
    issuer_id       UUID NOT NULL REFERENCES users(id),
    recipient_did   VARCHAR(255),
    recipient_email VARCHAR(255),
    fields_shared   JSONB NOT NULL, -- Which fields were disclosed
    credential_jwt  TEXT NOT NULL,
    revoked_at      TIMESTAMP,
    last_accessed   TIMESTAMP,
    created_at      TIMESTAMP DEFAULT NOW()
);

-- Contact lists (enhanced with VC support)
CREATE TABLE contact_lists (
    id              UUID PRIMARY KEY,
    name            VARCHAR(255) NOT NULL,
    owner_id        UUID NOT NULL REFERENCES users(id),
    require_verified BOOLEAN DEFAULT false, -- Only allow verified contacts
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW(),
    deleted_at      TIMESTAMP
);

-- List memberships (with DID verification)
CREATE TABLE list_memberships (
    id              UUID PRIMARY KEY,
    list_id         UUID NOT NULL REFERENCES contact_lists(id),
    user_id         UUID NOT NULL REFERENCES users(id),
    user_did        VARCHAR(255), -- Their DID for signing
    role            VARCHAR(20) NOT NULL CHECK (role IN ('viewer', 'editor', 'admin')),
    invitation_vc   TEXT, -- The VC-based invitation they accepted
    joined_at       TIMESTAMP DEFAULT NOW(),
    UNIQUE (list_id, user_id)
);

-- Activity log (DID-signed)
CREATE TABLE activity_logs (
    id          UUID PRIMARY KEY,
    list_id     UUID NOT NULL REFERENCES contact_lists(id),
    actor_id    UUID NOT NULL REFERENCES users(id),
    actor_did   VARCHAR(255) NOT NULL,
    action      VARCHAR(50) NOT NULL,
    target_type VARCHAR(50) NOT NULL,
    target_id   UUID,
    details     JSONB,
    signature   TEXT NOT NULL, -- Actor's DID signature
    created_at  TIMESTAMP DEFAULT NOW()
);

-- Revocation registry
CREATE TABLE credential_revocations (
    id              UUID PRIMARY KEY,
    credential_id   UUID NOT NULL,
    issuer_did      VARCHAR(255) NOT NULL,
    revocation_id   VARCHAR(255) NOT NULL UNIQUE,
    reason          VARCHAR(255),
    revoked_at      TIMESTAMP DEFAULT NOW()
);
```

### API Endpoints (VC-Enhanced)

```
# DID Management
POST   /api/dids                        # Create DID
GET    /api/dids                        # Get user's DIDs
DELETE /api/dids/:id                    # Revoke DID

# Credentials (Receive/Verify)
POST   /api/credentials/receive         # Store received VC
GET    /api/credentials                 # List received credentials
GET    /api/credentials/:id/verify      # Verify a credential
DELETE /api/credentials/:id             # Remove credential

# Credentials (Share)
POST   /api/share                       # Create shareable VC
GET    /api/share                       # List shared credentials
PATCH  /api/share/:id                   # Update disclosure settings
DELETE /api/share/:id                   # Revoke shared credential

# Team Lists (enhanced)
POST   /api/lists                       # Create list
GET    /api/lists                       # Get user's lists
GET    /api/lists/:id                   # Get list with verification status
PATCH  /api/lists/:id                   # Update list settings
DELETE /api/lists/:id                   # Delete list

# Invitations (VC-based)
POST   /api/lists/:id/invitations       # Send VC invitation
POST   /api/invitations/:token/accept   # Accept with DID

# Activity (DID-signed)
GET    /api/lists/:id/activity          # Get signed activity log
GET    /api/lists/:id/activity/export   # Export for compliance

# Verification
GET    /api/verify/:credentialId        # Public verification endpoint
```

---

## Open Questions

1. **DID Method Selection**: Should we start with `did:key` (simpler) or `did:web` (more recognizable)?
2. **Key Storage**: Browser storage vs. hardware key support vs. mobile secure enclave?
3. **Offline Verification**: How to verify credentials when issuer is offline? (Cache public keys?)
4. **EU Wallet Interop**: What's the timeline for EUDI Wallet API specifications?
5. **Pricing**: At what usage tier do VC features become paid?
6. **Revocation Method**: Status list vs. individual revocation registry?

---

## Dependencies

- User authentication system (exists)
- Contact CRUD (in progress - 001-contacts-crud)
- VC library selection (see [VC Technical Research](./vc-technical-research.md))
- Cryptographic key management (new)
- DID resolver infrastructure (new)

---

## Related Documents

- [Market Research](../../docs/market-research.md) - Strategic positioning
- [VC Technical Research](./vc-technical-research.md) - Implementation details
- [Contactory Constitution](../../.specify/memory/constitution.md) - Quality standards

---

## Document History

| Date       | Author   | Changes                                  |
| ---------- | -------- | ---------------------------------------- |
| 2026-01-12 | Mohammed | Initial specification                    |
| 2026-01-12 | Mohammed | Major revision for VC/SSI strategy pivot |
