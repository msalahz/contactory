# Product Requirements Document (PRD)

# Contactory - Contacts Management Application

## Overview

A modern, type-safe contact management application built with a focus on performance, security, and developer
experience. The application helps users organize all their personal and professional contacts in one place.

## Vision

To provide an effortless way to manage, search, and share contacts across devices with a focus on simplicity, type
safety, and excellent user experience.

## Target Users

- Individuals managing personal contacts
- Professionals organizing work contacts
- Developers looking for a reference implementation of modern web technologies

## Technical Stack

- **Frontend**: React with TypeScript, TanStack Start, shadcn/ui
- **Styling**: Tailwind CSS v4
- **State Management**: TanStack Query
- **Routing**: TanStack Router
- **Backend**: Node.js with TanStack Start
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: better-auth
- **Email**: Resend with React Email
- **Validation**: Zod
- **Testing**: Vitest
- **Build Tool**: Vite

## Core Features

### 1. Authentication

**Status:** Implemented  
**Description:** Secure user authentication and session management.

**Features:**

- Email/password signup and signin
- Password reset via email
- Protected routes
- Session management
- Theme support (light/dark mode)

### 2. Contact Management

**Status:** In Development  
**Description:** Manage personal and professional contacts with ease.

**Features:**

- Create, read, update, and delete contacts
- Mark contacts as favorites
- Responsive and accessible UI

**Data Model:**

| Field          | Type      | Description                          |
| -------------- | --------- | ------------------------------------ |
| `id`           | UUID v7   | Primary key                          |
| `userId`       | Text      | Foreign key to user (cascade delete) |
| `firstName`    | Text      | Required first name                  |
| `lastName`     | Text      | Optional last name                   |
| `displayName`  | Text      | Computed or custom display name      |
| `nickname`     | Text      | Optional nickname                    |
| `primaryEmail` | Text      | Primary email address                |
| `primaryPhone` | Text      | Primary phone number                 |
| `company`      | Text      | Company/organization name            |
| `jobTitle`     | Text      | Job title                            |
| `department`   | Text      | Department name                      |
| `street`       | Text      | Street address                       |
| `city`         | Text      | City                                 |
| `state`        | Text      | State/Province                       |
| `postalCode`   | Text      | Postal/ZIP code                      |
| `country`      | Text      | Country                              |
| `notes`        | Text      | Additional notes                     |
| `website`      | Text      | Website URL                          |
| `isFavorite`   | Boolean   | Favorite flag (default: false)       |
| `createdAt`    | Timestamp | Creation timestamp                   |
| `updatedAt`    | Timestamp | Last update timestamp                |

**Planned Enhancements:**

- Contact groups and tags
- Contact import/export
- Contact sharing
- Contact merging for duplicates
- QR code sharing

### 3. Search & Filtering

**Status:** Planned (Q1 2025)  
**Description:** Advanced search and filtering capabilities.

**Planned Features:**

- Real-time search across contact fields
- Filter by name, email, phone, company
- Save frequently used filters
- Search history
- Full-text search support

### 4. Data Sync

**Status:** Planned (Q2 2025)  
**Description:** Seamless data synchronization across devices.

**Planned Features:**

- Real-time sync using Tanstack DB
- Offline-first support
- Conflict resolution
- Sync status indicators
- Selective sync options

### 4. Share

**Status:** Coming Soon  
**Description:** Easily share contacts with friends, family, or colleagues.

**Requirements:**

- Share individual contacts or groups
- Multiple sharing methods (link, email, messaging)
- Permission control for shared contacts
- Share contact information in standard formats (vCard)
- Temporary sharing links with expiration

### 5. Import/Export

**Status:** Coming Soon  
**Description:** Quickly import or export your contacts in various formats.

**Requirements:**

- Import from CSV, vCard (VCF), and JSON formats
- Export to CSV, vCard (VCF), and JSON formats
- Bulk import with validation and error handling
- Import from popular contact services (Google Contacts, Apple Contacts, etc.)
- Preview and mapping of fields during import
- Export selected contacts, or the entire contact list

### 6. Groups/Labels

**Status:** Coming Soon  
**Description:** Organize contacts into custom groups like Family, Work, or Friends.

**Requirements:**

- Create custom groups and labels
- Assign multiple groups to a single contact
- Color coding for visual distinction
- Filter and view contacts by group
- Bulk operations on groups (add/remove multiple contacts)
- Nested groups or sub-categories

### 7. Favorites

**Status:** Under Development (Database Schema Implemented)  
**Description:** Mark important contacts for quick and easy access.

**Requirements:**

- Star/favorite contacts for priority access
- Quick access panel for favorite contacts
- Sort favorites by custom order or frequency of use
- Limit or unlimited favorites
- One-tap communication with favorites

**Implementation Notes:**

- `isFavorite` boolean field implemented in contact schema
- Compound index on `(isFavorite, userId)` for efficient favorites queries

### 8. Duplicate Detection

**Status:** Coming Soon  
**Description:** Find and merge duplicate contacts automatically.

**Requirements:**

- Automatic detection of potential duplicates
- Smart matching algorithm (name, email, phone number)
- Manual merge interface with field selection
- Batch merge operations
- Undo functionality for merged contacts
- Configurable similarity threshold

### 9. QR Code Sharing

**Status:** Coming Soon  
**Description:** Share contact info via scannable QR code.

**Requirements:**

- Generate QR code for individual contacts
- Generate QR code for user's own contact information
- Scan QR codes to import contacts
- Customizable QR code design
- Download or share QR code image
- Support for vCard format in QR codes

## Implementation Status

### Completed

- [x] Authentication system
  - [x] Email/password signup
  - [x] Email/password signin
  - [x] Password reset flow
  - [x] Protected routes
  - [x] Session management
- [x] Basic contact management
  - [x] Contact model and schema
  - [x] CRUD operations
  - [x] Favorites functionality
- [x] Theme support
  - [x] Light/dark mode
  - [x] System preference detection

### In Progress

- [ ] Advanced contact management
  - [ ] Contact groups and tags
  - [ ] Import/export functionality
  - [ ] Contact sharing
  - [ ] Duplicate detection and merging

### Planned

- [ ] Search and filtering
- [ ] Data synchronization
- [ ] Mobile responsiveness
- [ ] API documentation
- [ ] Comprehensive test coverage
  - `/forgot-password` - Request password reset
  - `/reset-password` - Complete password reset
- Session management with `findSessionFn` server function
- Auth-aware landing page CTA (shows "My Contacts" when logged in)
- Route guards redirect authenticated users away from auth pages

### 11. Internationalization (i18n)

**Status:** Coming Soon  
**Description:** Support for multiple languages with seamless language switching.

**Requirements:**

- Bilingual support (English and Arabic)
- RTL (Right-to-Left) layout support for Arabic
- LTR (Left-to-Right) layout support for English
- Language switcher in the UI
- Locale-aware date and time formatting
- Locale-aware number formatting
- Persistent language preference per user

### 12. Theme Support

**Status:** Under Development
**Description:** Dark and light theme modes for user preference.

**Requirements:**

- Light theme mode
- Dark theme mode
- System preference detection (auto theme)
- Theme toggle in the UI
- Persistent theme preference per user
- Consistent theming across all components

**Implementation Notes:**

- Theme toggle component implemented using TanStack Store
- Light/dark mode switching with Moon/Sun icons
- `useTheme` hook available for theme-aware components

## Technical Requirements

### Authentication & Security

- User signup and signin with email/password (via better-auth)
- Secure password hashing and storage
- Session-based authentication with secure cookies
- Password reset flow with email verification
- Secure data storage and transmission (HTTPS)
- Privacy controls for contact information
- CSRF protection

### Internationalization

- Bilingual support: English (LTR) and Arabic (RTL)
- react-i18next for translation management
- Tailwind CSS logical properties for RTL/LTR layout
- Luxon & Intl API for locale-aware date/number formatting

### Theming

- Dark and light mode support via TanStack Store
- System preference detection
- Persistent user preference
- `useTheme` hook for theme-aware components

### Performance

- Fast load times and responsive UI
- Efficient handling of large contact lists (1000+ contacts)
- Optimized search and filtering
- Minimal latency for sync operations

### User Experience

- Clean, modern, and intuitive interface
- Responsive design for all screen sizes
- Accessibility compliance (WCAG 2.1)
- Consistent design language across features

### Data Management

- Reliable data persistence
- Data backup and recovery
- Data export for user ownership
- GDPR compliance and data privacy

## Success Metrics

- User adoption and retention rates
- Contact management efficiency (time to find/add/edit contacts)
- Feature usage rates
- User satisfaction scores
- Sync reliability and speed
- Search accuracy and speed

## Technical Considerations

- **Performance**: Optimized database queries and efficient state management
- **Security**: Secure authentication, input validation, and proper access controls
- **Type Safety**: Full TypeScript support throughout the stack
- **Developer Experience**: Comprehensive documentation and testing
- **Accessibility**: WCAG 2.1 AA compliance
- **SEO**: Server-side rendering and metadata optimization
- Favorites (UI implementation)

**Coming Soon:**

- Search
- Sync
- Share
- Import/Export
- Groups/Labels
- Duplicate Detection
- QR Code Sharing
- Internationalization (i18n)

Features will be developed in phases based on priority and user feedback.

## Conclusion

This contacts management application aims to provide a comprehensive, user-friendly solution for organizing and managing
contacts across all devices, with a focus on simplicity, security, and performance.
