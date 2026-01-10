<!--
## Note to AI Agents
This document is intended for business-focused stakeholders who may not have a technical background in software development. It provides a high-level overview of the project, its goals, with no technical details.
-->

# Project Overview: Contactory

## Executive Summary

**Contactory** is a modern contact management application that enables users to organize, search, and manage their
personal and professional contacts in one secure place. Built with a focus on simplicity, performance, and user
experience, Contactory provides essential contact management features with plans for advanced functionality including
sharing, import/export, and cross-device synchronization.

---

## Vision & Mission

### Vision

To provide an effortless way to manage, search, and share contacts across devices with a focus on simplicity and
excellent user experience.

### Mission

Empower individuals and professionals to maintain an accurate, organized address book with minimal friction and maximum
safety.

---

## Product Goals

1. **Core Functionality**: Provide reliable CRUD operations for contacts with minimal friction
2. **User Safety**: Implement soft-delete with undo to prevent accidental data loss
3. **Performance**: Handle 1000+ contacts per user without performance degradation
4. **Accessibility**: Meet WCAG 2.1 AA compliance standards
5. **Global Support**: Bilingual (English/Arabic) with RTL/LTR layout support
6. **Security**: Ensure user data isolation and secure authentication

---

## Target Users

- **Individuals** managing personal contacts
- **Professionals** organizing work contacts
- **Teams** (future roadmap) sharing contact information

---

## Core Features (Implemented & In Progress)

### Authentication (✅ Implemented)

- Email/password signup and signin
- Password reset via email verification
- Secure session management
- Protected routes with authentication guards
- Social login (Google OAuth)

### Theme Support (✅ Implemented)

- Light and dark mode themes
- System preference detection
- Persistent user preference

### Contact Management (🚧 In Progress)

#### CRUD Operations

- **Create**: Add new contacts with first name (required) and optional fields
- **Read**: View contacts in list and detail views
- **Update**: Edit any contact field
- **Delete**: Soft delete with restoration option

#### Contact Data Fields

| Field           | Required | Description                     |
| --------------- | -------- | ------------------------------- |
| First Name      | Yes      | Only required field             |
| Last Name       | No       |                                 |
| Display Name    | No       | Computed or custom              |
| Nickname        | No       |                                 |
| Primary Email   | No       | Validated format                |
| Primary Phone   | No       |                                 |
| Company         | No       |                                 |
| Job Title       | No       |                                 |
| Department      | No       |                                 |
| Street Address  | No       |                                 |
| City            | No       |                                 |
| State           | No       |                                 |
| Postal Code     | No       |                                 |
| Country         | No       |                                 |
| Notes           | No       | Long text                       |
| Website         | No       | Validated URL                   |
| Avatar          | No       | Image upload (JPG/PNG, max 5MB) |
| Favorite Status | No       | Default: false                  |

#### Avatar Management

- File upload to secure object storage
- Client-side resize and compression
- Automatic cleanup on permanent deletion
- Fallback to initials with colorful backgrounds when no image

### Data Isolation & Security

- Users can only access their own contacts
- Each contact belongs to exactly one user
- Cascade delete when user account is deleted
- Secure upload and storage of media files

### Search & Filtering (🚧 In Progress)

- **Real-time Search**: Name, email, company fields
- **Debounced Input**: 300ms debounce for efficiency
- **Filtering**: Show only favorite contacts
- **Search Composition**: Search within active filters
- **Smart Results**: "No results" with clear search and spelling suggestions

### Sorting & Organization (🚧 In Progress)

- Sort by first name (A-Z)
- Sort by company
- Sort by date created (newest/oldest)
- URL state persistence for shareable/bookmarkable views

### Favorites Management (🚧 In Progress)

- Mark/unmark contacts as favorites
- Favorites pinned at top of list
- Visual separation from regular contacts
- Filter to show favorites only
- Instant visual feedback with toast confirmation

### Soft Delete & Trash Management (🚧 In Progress)

#### Delete Flow

1. User initiates deletion
2. Contact soft-deleted (moved to trash)
3. Toast notification with 5-second undo window
4. Stacked toasts for multiple sequential deletions

#### Trash View

- Dedicated page for viewing deleted contacts
- Restore contacts back to main list
- Permanently delete contacts (irreversible)
- "Empty Trash" bulk action with item count confirmation
- No auto-purge policy (stays until manually deleted)

#### Undo Mechanics

- Global toast persistence across page navigation
- Individual 5-second countdown per deletion
- Complete contact restoration capability

### Virtual Scrolling & Performance (🚧 In Progress)

- **Efficient Loading**: Load more contacts as user scrolls
- **Large Dataset Support**: Handle 1000+ contacts efficiently
- **Smooth Interactions**: 60 FPS scrolling performance
- **Loading Feedback**: Skeleton states during infinite scroll
- **Data Freshness**: Auto-refetch on return from background tab

### Mobile Experience (🚧 In Progress)

- **Responsive List**: Card view on mobile (<768px)
- **Bottom Sheet Forms**: Native mobile feel, thumb-friendly
- **Swipe Gestures**: Right for favorite, left for delete
- **Haptic Feedback**: Touch confirmation on mobile actions
- **Full-screen Expansion**: Forms can expand to full screen if needed

### Navigation & URL State (🚧 In Progress)

- **URL-driven State**: Search, filters, sorting reflected in URL
- **Shareable Links**: URLs preserve exact view state
- **Deep Linking**: Edit URLs show edit form directly
- **Browser Navigation**: Back button closes sheets naturally

---

## Planned Features (Future Releases)

### Import/Export

- **Supported Formats**: CSV, vCard (VCF), JSON
- **Import Sources**: Google Contacts, Apple Contacts, CSV/vCard files
- **Export Options**: All contacts or selection
- **Validation**: Preview and field mapping before import
- **Bulk Operations**: Import multiple contacts at once

### Groups & Labels

- **Custom Groups**: Create and name custom groups
- **Color Coding**: Visual distinction for different groups
- **Multiple Assignment**: Assign one contact to multiple groups
- **Bulk Operations**: Add/remove multiple contacts from groups
- **Nested Groups**: Sub-categories within groups
- **Filter by Group**: View contacts in specific groups

### Contact Sharing

- **Share Methods**: Link, email, messaging
- **Format Support**: vCard standard format
- **Access Control**: Permission management for shared contacts
- **Temporary Links**: Expiring share links with time limits
- **Share Groups**: Share multiple contacts at once

### Duplicate Detection

- **Automatic Detection**: Identifies potential duplicates
- **Smart Matching**: Name, email, phone number comparison
- **Manual Review**: User review before merge
- **Merge Interface**: Field-level selection during merge
- **Batch Operations**: Merge multiple duplicate pairs
- **Undo Support**: Revert merged contacts
- **Configurable Threshold**: Adjust similarity matching sensitivity

### QR Code Sharing

- **Generate QR**: Create scannable codes for contacts
- **Self QR**: Share own contact information
- **Scan Import**: Add contacts by scanning QR codes
- **Customization**: Design and styling options
- **vCard Support**: QR codes encode vCard format
- **Download**: Export QR code images

### Internationalization (i18n)

- **Bilingual Support**: English (LTR) and Arabic (RTL)
- **Language Switching**: User preference in settings
- **Locale Formatting**: Date, time, number formatting per locale
- **Number Display**: Western numerals (0-9) in all locales
- **Phone Formatting**: Smart formatting based on country code
- **RTL Layout**: Automatic layout direction switching

### Data Synchronization

- **Real-time Sync**: Cross-device contact updates
- **Offline Support**: Offline-first capability
- **Conflict Resolution**: Handle simultaneous edits
- **Sync Indicators**: Show sync status to user
- **Selective Sync**: Choose which data to sync

---

## Key Requirements

### Functional Requirements

| ID     | Requirement                                    |
| ------ | ---------------------------------------------- |
| FR-001 | Create new contacts with minimum first name    |
| FR-002 | View list of all user contacts                 |
| FR-003 | View complete contact details                  |
| FR-004 | Edit any contact field                         |
| FR-005 | Soft delete contacts with undo option          |
| FR-006 | Data isolation - users see only their contacts |
| FR-007 | One user per contact ownership                 |
| FR-008 | Support 15+ contact data fields                |
| FR-009 | Validate email format when provided            |
| FR-010 | Validate website URL format when provided      |
| FR-011 | Search by name, email, company                 |
| FR-012 | Filter to show favorites only                  |
| FR-013 | Sort by name, company, or date                 |
| FR-014 | Soft delete implementation                     |
| FR-015 | 5-second undo window                           |
| FR-016 | URL state persistence                          |
| FR-017 | Restore view from URL state                    |
| FR-018 | Avatar image upload (JPG/PNG)                  |
| FR-019 | Secure storage for images                      |
| FR-020 | Virtual scrolling for large lists              |
| FR-021 | Trash view for deleted contacts                |
| FR-022 | Restore from trash                             |
| FR-023 | Permanent deletion from trash                  |
| FR-024 | Stacked undo toasts                            |
| FR-025 | Global toast persistence                       |
| FR-026 | No auto-purge of trash                         |
| FR-027 | Empty trash bulk action                        |
| FR-028 | Avatar cleanup on permanent delete             |
| FR-029 | Edit sheet respects URL intent                 |
| FR-030 | Mobile card view (<768px)                      |
| FR-031 | Bottom sheet forms on mobile                   |
| FR-032 | Swipe gestures on mobile                       |
| FR-033 | Client-side image compression                  |
| FR-034 | Efficient pagination for large lists           |
| FR-035 | 60 FPS scrolling with 1000+ contacts           |
| FR-036 | Error recovery with UI restoration             |
| FR-037 | Auto-retry on upload failure                   |
| FR-038 | Refetch on window focus                        |

### Non-Functional Requirements

#### Performance

- **List Load Time**: < 2 seconds to interactive (500 contacts)
- **Search Response**: < 5 seconds from query to results
- **Scroll Performance**: 60 FPS with 1000+ contacts
- **Avatar Upload**: < 3 seconds (with client compression)
- **Form Submission**: < 1 second
- **Search Debounce**: 300ms

#### Accessibility

- **Standard**: WCAG 2.1 AA compliance
- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Proper ARIA labels and announcements
- **Focus Management**: Logical focus order in sheets/dialogs
- **Color Contrast**: Meet AA standards (4.5:1 for text)

#### Security

- **Authentication**: Secure login with session management
- **Data Isolation**: User-scoped data access
- **Input Validation**: All inputs validated before processing
- **File Upload**: Size limits and type validation
- **HTTPS**: All connections encrypted

#### Internationalization

- **Languages**: English and Arabic
- **Text Direction**: Automatic RTL/LTR switching
- **Date Formatting**: Locale-aware formatting
- **Number Formatting**: Locale-aware with standard numerals

---

## Success Metrics

| Metric                 | Target                     |
| ---------------------- | -------------------------- |
| Create contact time    | < 60 seconds               |
| Search to first result | < 5 seconds                |
| Page to interactive    | < 2 seconds (500 contacts) |
| Large dataset handling | 1000+ contacts, no lag     |
| First contact success  | 95% on first attempt       |
| Visual feedback        | < 200ms latency            |
| Scroll smoothness      | 60 FPS                     |
| Avatar upload          | < 3 seconds                |
| Mobile swipe accuracy  | 99% success rate           |
| User satisfaction      | 4.5+/5.0 rating            |

---

## Development Roadmap

### Phase 1: MVP (Current)

- Contact CRUD (create, read, update, soft delete)
- List with virtual scrolling
- Avatar upload
- Trash management with restore
- Search and filtering
- Favorites
- Mobile responsiveness

### Phase 2: Enhanced Experience (Q2 2026)

- Import/export functionality
- Groups and labels
- Contact sharing (links)
- Duplicate detection

### Phase 3: Advanced Features (Q3 2026)

- QR code sharing
- Real-time sync
- Advanced duplicate merging
- Offline support

### Phase 4: Expansion (Q4 2026)

- Additional languages beyond English/Arabic
- Advanced filtering and saved searches
- Contact reminders
- API for third-party integrations

---

## Project Status

**Current Branch**: `001-contacts-crud`
**Current Focus**: Contacts CRUD MVP implementation
**Last Updated**: January 10, 2026

### Completed Features

- Authentication system
- Theme support (light/dark mode)
- Database schema design
- Specification and planning
- User story documentation

### In Progress

- Server-side contact operations
- React components and hooks
- Virtual scrolling integration
- Avatar upload mechanism

### Coming Soon

- Search and filtering UI
- Favorites functionality
- Trash management interface
- Mobile optimizations
- Accessibility audit

---

## Key Design Decisions

1. **Soft Delete First**: Contacts are soft-deleted (not permanently removed) to enable undo and restore functionality
2. **URL-Driven State**: Application state reflected in URLs for shareability and deep linking
3. **Virtual Scrolling**: Infinite scroll with pagination for performance with large datasets
4. **Avatar Storage**: Scalable, secure image storage separate from database
5. **Bilingual from Start**: i18n architecture built in from foundation for global support
6. **Privacy-First**: User data isolation enforced at every layer
7. **Mobile-First Design**: Responsive layouts optimized for mobile first, then desktop

---

## User Safety & Data Privacy

### Data Protection

- **User Isolation**: Each user sees only their contacts
- **Secure Storage**: Passwords hashed, no plaintext storage
- **Encryption**: All data transmitted over HTTPS
- **Access Control**: Authentication required for all operations
- **Audit Trail**: Track of sensitive operations logged

### Undo & Recovery

- **5-Second Undo**: Restore accidental deletions immediately
- **Trash View**: Review deleted contacts before permanent removal
- **No Auto-Delete**: Trash stays until manually emptied
- **Permanent Delete Confirmation**: Clear warning before irreversible action
- **File Cleanup**: Associated images removed with contact

### GDPR & Compliance

- **Data Portability**: Export contacts in standard formats (planned)
- **Right to Delete**: Complete account deletion available
- **Transparent Privacy**: Clear data usage policies
- **Secure Sessions**: Regular session timeouts
- **No Data Sharing**: User data never shared with third parties

---

## Risk Mitigation

| Risk                               | Impact | Mitigation                                                     |
| ---------------------------------- | ------ | -------------------------------------------------------------- |
| Large dataset performance          | High   | Virtual scrolling, efficient pagination, database optimization |
| Data loss from accidental deletion | High   | Soft delete with 5-second undo, trash view with restore        |
| Mobile usability issues            | Medium | Bottom sheets, swipe gestures, responsive card layouts         |
| Avatar upload failures             | Medium | Auto-retry, error messages with retry button                   |
| Internationalization complexity    | Medium | Feature-based translations, automatic RTL/LTR switching        |
| User account security              | High   | Session-based auth, HTTPS-only, secure cookies                 |

---

## Success Criteria for MVP

✅ All user stories 1-9 passing acceptance scenarios
✅ Contact operations complete within performance targets
✅ Virtual scrolling handles 1000+ contacts smoothly
✅ Soft delete with undo working reliably
✅ Mobile experience tested on iOS/Android
✅ WCAG 2.1 AA accessibility compliance
✅ i18n ready for English/Arabic support
✅ Zero unhandled errors in primary user flows
✅ All data isolation tests passing
✅ Avatar upload and storage working correctly

---

## Contact & Support

**Product Owner**: Mohammed
**Last Updated**: January 10, 2026
**Repository**: github.com/your-org/contactory

---

## Documentation Map

| Document                            | Purpose                                                 | Audience                            |
| ----------------------------------- | ------------------------------------------------------- | ----------------------------------- |
| **project-overview.md**             | Product vision, features, requirements                  | PMs, stakeholders, all team members |
| **project-architecture.md**         | Technical stack, patterns, guidelines                   | Developers, architects, tech leads  |
| **ADR-001-tech-stack.md**           | Tech stack decisions (archive after reading)            | Technical reference                 |
| **ADR-002-file-structure.md**       | Monolith architecture decisions (archive after reading) | Technical reference                 |
| **ADR-003-internationalization.md** | i18n architecture decisions (archive after reading)     | Technical reference                 |
| **PRD.md**                          | Original PRD (superseded by overview)                   | Can be archived                     |
| **product-requirements.md**         | Legacy PRD (superseded by overview + specs)             | Can be archived                     |

---

## Getting Started

1. **For stakeholders/PMs**: Read project-overview.md
2. **For developers**: Read project-architecture.md
3. **For context**: Review ADR-\*.md files, then archive them
4. **For specs**: Check specs/001-contacts-crud/spec.md

_For technical architecture, implementation details, and developer setup,
see [project-architecture.md](./project-architecture.md)_
