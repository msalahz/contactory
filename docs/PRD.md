# Product Requirements Document (PRD)

# Contacts Management Application

## Overview

A simple, fast, and secure contact management application that helps users organize all their personal and professional contacts in one place.

## Vision

To provide an effortless way to manage, search, and share contacts across devices with a focus on simplicity and user experience.

## Target Users

- Individuals managing personal contacts
- Professionals organizing work contacts
- Anyone looking to consolidate contacts from multiple sources

## Core Features

### 1. Organize

**Status:** Under Development  
**Description:** Keep all your contacts in one place, neatly organized and easy to manage.

**Requirements:**

- Create, read, update, and delete contacts
- Store contact information including name, phone number, email, address and notes
- Clean and intuitive user interface for contact management
- Efficient data storage and retrieval

**Data Model (Implemented):**

The contact database schema has been implemented with the following fields:

| Field          | Type      | Description                                                              |
|----------------|-----------|--------------------------------------------------------------------------|
| `id`           | UUID v7   | Primary key                                                              |
| `userId`       | Text      | Foreign key to user (cascade delete)                                     |
| `firstName`    | Text      | Required first name                                                      |
| `lastName`     | Text      | Optional last name                                                       |
| `displayName`  | Text      | Computed or custom display name                                          |
| `nickname`     | Text      | Optional nickname                                                        |
| `primaryEmail` | Text      | Primary email address                                                    |
| `primaryPhone` | Text      | Primary phone number                                                     |
| `company`      | Text      | Company/organization name                                                |
| `jobTitle`     | Text      | Job title                                                                |
| `department`   | Text      | Department name                                                          |
| `address`      | JSONB     | Flexible address object (street, city, state, postalCode, country, type) |
| `notes`        | Text      | Additional notes                                                         |
| `website`      | Text      | Website URL                                                              |
| `isFavorite`   | Boolean   | Favorite flag (default: false)                                           |
| `createdAt`    | Timestamp | Creation timestamp                                                       |
| `updatedAt`    | Timestamp | Last update timestamp                                                    |

**Database Indexes:**

- `contact_userId_idx` - User ID lookup
- `contact_firstName_idx` - First name search
- `contact_lastName_idx` - Last name search
- `contact_primaryEmail_idx` - Email search
- `contact_isFavorite_idx` - Favorites by user (compound index)

### 2. Search

**Status:** Coming Soon  
**Description:** Find anyone instantly with powerful search and filtering options.

**Requirements:**

- Real-time search across all contact fields
- Filter contacts by various criteria (name, email, phone, groups, etc.)
- Advanced search options with multiple parameters
- Quick access to recently accessed contacts
- Search history and suggestions

### 3. Sync

**Status:** Coming Soon  
**Description:** Stay up to date across all your devices with automatic syncing.

**Requirements:**

- Real-time synchronization across multiple devices
- Conflict resolution for simultaneous edits
- Offline mode with sync queue
- Support for web, mobile, and desktop platforms
- Background sync without user intervention

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
- Export selected contacts or entire contact list

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

### 10. Authentication & User Management

**Status:** Implemented  
**Description:** Secure user registration, signin and session management.

**Requirements:**

- User signup with email and password
- User signin with email and password
- Password reset via email (forgot password flow)
- Secure session management
- Sign out functionality
- Social signin support (future consideration)
- Account settings and profile management

**Implementation Notes:**

- Authentication powered by better-auth integration
- Routes implemented:
    - `/signin` - Email/password signin
    - `/signup` - Email/password registration
    - `/forgot-password` - Request password reset
    - `/reset-password` - Complete password reset
- Session management with `findSessionFn` server function
- Auth-aware landing page CTA (shows "Go to Console" when logged in)
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

## Future Considerations

- Integration with calendar and email applications
- Contact enrichment from social media profiles
- Birthday and important date reminders
- Contact notes and interaction history
- Custom fields for contacts
- API for third-party integrations
- Team collaboration features
- Contact verification and validation

## Timeline

**Completed:**

- Authentication & User Management (signup, signin, password reset)
- Contact Database Schema (Drizzle ORM with indexes)

**In Progress:**

- Theme Support (light/dark mode toggle)
- Organize (CRUD operations for contacts)
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

This contacts management application aims to provide a comprehensive, user-friendly solution for organizing and managing contacts across all devices, with a focus on simplicity, security and performance.
