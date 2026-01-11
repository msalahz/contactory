# 📇 Contactory

A modern, type-safe contact management application built with TanStack Start, React 19, and Drizzle ORM. Organize all
your personal and professional contacts in one secure place with a beautiful, responsive interface.

🔗 **[Live Demo](https://contactory.consultin.dev/)**

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Scripts](#-scripts)
- [Code Review Workflows](#-code-review-workflows)
- [Documentation](#-documentation)
- [Dependencies](#-dependencies)
- [License](#-license)

---

## ✨ Features

| Feature              | Status         | Description                                             |
|----------------------|----------------|---------------------------------------------------------|
| Authentication       | ✅ Implemented  | Secure signup, signin, password reset with better-auth  |
| Theme Support        | ✅ Implemented  | Dark/light mode with system preference detection        |
| Internationalization | ✅ Implemented  | Bilingual support with RTL/LTR layout                   |
| Organize Contacts    | 🚧 In Progress | CRUD operations for contacts (basic structure in place) |
| Favorites            | 🚧 In Progress | Mark and manage favorite contacts                       |
| Search & Filter      | 📅 Coming Soon | Real-time search with advanced filtering                |
| Sync                 | 📅 Coming Soon | Cross-device synchronization                            |
| Share                | 📅 Coming Soon | Share contacts via link, email or messaging             |
| Import/Export        | 📅 Coming Soon | CSV, vCard and JSON support                             |
| Groups/Labels        | 📅 Coming Soon | Custom groups with color coding                         |
| Duplicate Detection  | 📅 Coming Soon | Find and merge duplicate contacts                       |
| QR Code Sharing      | 📅 Coming Soon | Share contact info via scannable QR code                |

---

## 🛠️ Tech Stack

### Core

| Technology       | Purpose                    |
|------------------|----------------------------|
| TypeScript 5.9.3 | Type-safe JavaScript       |
| Vite 7.3.0       | Build tool & dev server    |
| TanStack Start   | Full-stack React framework |
| React 19.2.3     | UI library                 |

### Data & State

| Technology      | Purpose                   |
|-----------------|---------------------------|
| TanStack Router | Type-safe routing         |
| TanStack Query  | Data fetching & caching   |
| TanStack Store  | State management & theme  |
| TanStack Form   | Form handling             |
| Drizzle ORM     | Database ORM (PostgreSQL) |
| Zod             | Schema validation         |

### UI/UX

| Technology               | Purpose                |
|--------------------------|------------------------|
| Tailwind CSS 4           | Utility-first styling  |
| shadcn/ui                | Component library      |
| Radix UI                 | Accessible primitives  |
| Lucide React             | Icons                  |
| class-variance-authority | Component variants     |
| tailwind-merge           | Merge Tailwind classes |

### Authentication

| Technology       | Purpose                             |
|------------------|-------------------------------------|
| better-auth      | Authentication & session management |
| @t3-oss/env-core | Environment validation              |

### Deployment

| Technology         | Purpose             |
|--------------------|---------------------|
| Cloudflare Workers | Edge deployment     |
| Wrangler           | Cloudflare CLI tool |

### Development Tools

| Technology      | Purpose                |
|-----------------|------------------------|
| Vitest          | Unit testing framework |
| Testing Library | Component testing      |
| ESLint          | Code linting           |
| Prettier        | Code formatting        |
| Drizzle Kit     | Database migrations    |
| React Email     | Email templates        |
| Resend          | Email delivery service |
| Motion          | Animation library      |

---

## 📁 Project Structure

```
contactory/
├── .github/                       # GitHub configuration
│   ├── workflows/
│   │   └── ci.yml                # CI/CD pipeline configuration
├── docs/                          # Documentation
│   ├── project-overview.md       # Product vision, features, requirements
│   └── project-architecture.md   # Technical stack, patterns, guidelines
├── public/                        # Static assets
│   ├── favicon.svg
│   └── robots.txt
├── specs/                         # Feature specifications
│   └── 001-contacts-crud/        # Contacts CRUD feature spec
├── src/
│   ├── backend/                   # Server-only code
│   │   ├── lib/                   # Business logic modules
│   │   │   ├── auth.ts            # Auth business logic
│   │   │   ├── contacts.ts        # Contacts business logic
│   │   │   ├── storage.ts         # File storage logic
│   │   │   └── theme.ts           # Theme management
│   │   ├── middlewares/           # Server middlewares
│   │   ├── mutations/             # Server mutation functions (RPCs)
│   │   │   ├── auth.ts            # Auth mutations
│   │   │   └── contacts.ts        # Contacts mutations
│   │   ├── queries/               # Server query functions (RPCs)
│   │   │   ├── auth.ts            # Auth queries
│   │   │   └── contacts.ts        # Contacts queries
│   │   └── utils/                 # Server utilities
│   ├── core/                      # Core/reusable code
│   │   ├── components/            # Shared UI components
│   │   ├── locales/               # i18n translations
│   │   ├── theme/                 # Theme system
│   │   ├── utils/                 # Utility functions
│   │   └── schemas.ts             # Zod schemas & TypeScript types
│   ├── features/                  # Client feature modules
│   │   ├── auth/                  # Authentication feature
│   │   │   ├── components/        # Auth UI components
│   │   │   ├── hooks/             # Auth hooks
│   │   │   └── lib/               # Auth utilities
│   │   ├── contacts/              # Contacts management feature
│   │   │   ├── components/        # Contacts UI components
│   │   │   ├── hooks/             # Contacts hooks
│   │   │   ├── lib/               # Contacts utilities
│   │   │   ├── keys.ts            # Query keys factory
│   │   │   └── options.ts         # Query options factory
│   │   └── landing/               # Landing page feature
│   │       └── components/        # Landing page components
│   ├── integrations/              # Third-party integrations
│   │   ├── better-auth/           # Authentication config
│   │   ├── drizzle/               # Drizzle client, migrations, seeds, config
│   │   ├── i18n/                  # Internationalization setup
│   │   ├── resend/                # Email integration & templates
│   │   ├── shadcn/                # UI components
│   │   ├── tanstack-form/         # Form handling
│   │   └── tanstack-query/        # Query client setup
│   ├── routes/                    # File-based routing
│   │   ├── __root.tsx             # Root layout with providers
│   │   ├── _auth/                 # Unauthenticated routes
│   │   │   ├── sign-in.tsx        # Sign in page
│   │   │   ├── sign-up.tsx        # Sign up page
│   │   │   ├── forgot-password.tsx # Password reset request
│   │   │   └── reset-password.tsx # Password reset form
│   │   ├── _public/               # Public routes (landing)
│   │   ├── _user/                 # Protected user routes
│   │   │   ├── route.tsx          # User layout + auth guard
│   │   │   ├── dashboard.tsx      # Main dashboard view
│   │   │   ├── contacts/          # Contacts routes
│   │   │   │   ├── index.tsx      # Contacts list
│   │   │   │   ├── new.tsx        # Create contact sheet
│   │   │   │   ├── $contactId.tsx # Contact detail sheet
│   │   │   │   └── $contactId.edit.tsx # Edit contact sheet
│   │   │   └── profile.tsx        # User profile page
│   │   └── _admin/                # Admin-only routes
│   ├── start.ts                   # TanStack Start configuration
│   ├── style.css                  # Global styles with Tailwind CSS
│   ├── env.client.ts              # Client environment variables
│   ├── env.server.ts              # Server environment variables
│   └── router.tsx                 # TanStack Router configuration
├── .env.example                   # Example environment variables
├── components.json                # shadcn/ui config
├── drizzle.config.ts              # Drizzle ORM config
├── eslint.config.js               # ESLint config
├── package.json                   # Dependencies & scripts
├── prettier.config.js             # Prettier config
├── tsconfig.json                  # TypeScript config
└── vite.config.ts                 # Vite config
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+
- PostgreSQL +14

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/contactory.git
   cd contactory
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env.local
   ```

   Update the `.env.local` file with your configuration.

4. Run database migrations:

   ```bash
   pnpm db:migrate
   ```

5. Start the development server:
   ```bash
   pnpm dev
   ```
   The application will be available at `http://localhost:3000`

### Environment Variables

| Variable                           | Description                      | Required | Default                 |
|------------------------------------|----------------------------------|----------|-------------------------|
| `DATABASE_URL`                     | PostgreSQL connection string     | ✅        | -                       |
| `BETTER_AUTH_SECRET`               | Secret key for authentication    | ✅        | -                       |
| `BETTER_AUTH_URL`                  | Base URL of your app             | ✅        | `http://localhost:3000` |
| `BETTER_AUTH_GOOGLE_CLIENT_ID`     | Google OAuth client ID           | ❌        | -                       |
| `BETTER_AUTH_GOOGLE_CLIENT_SECRET` | Google OAuth client secret       | ❌        | -                       |
| `RESEND_API_KEY`                   | API key for Resend email service | ❌        | -                       |
| `VITE_BETTER_AUTH_BASE_URL`        | Client-side base URL of your app | ✅        |

---

## 📜 Scripts

| Script              | Description                            |
|---------------------|----------------------------------------|
| `pnpm dev`          | Start development server (port 3000)   |
| `pnpm build`        | Build for production                   |
| `pnpm serve`        | Preview production build               |
| `pnpm test`         | Run unit tests                         |
| `pnpm test:workers` | Run Cloudflare Workers tests           |
| `pnpm lint`         | Lint codebase                          |
| `pnpm format`       | Format code with Prettier              |
| `pnpm check`        | Format and lint with auto-fix          |
| `pnpm typecheck`    | Run TypeScript type checking           |
| `pnpm db:generate`  | Generate database migrations           |
| `pnpm db:migrate`   | Run database migrations                |
| `pnpm db:push`      | Push schema changes to database        |
| `pnpm db:pull`      | Pull schema from database              |
| `pnpm db:studio`    | Open Drizzle Studio                    |
| `pnpm db:seeds`     | Run database seed script               |
| `pnpm deploy`       | Build and deploy to Cloudflare Workers |
| `pnpm cf-typegen`   | Generate Cloudflare Workers types      |

---

## 🔍 Code Review Workflows

This repo includes Claude/Windsurf workflows under `.windsurf/workflows/` prefixed with
`code-review*`. These workflows follow a multi-agent code review approach (constitution
compliance, bug detection, security, performance) and use confidence scoring to reduce false
positives.

### Available workflows

- **Project-wide review**: `code-review.project`
    - **Use when**: You want an overall health report for the repo.
    - **Examples**:
        - `code-review.project`
        - `code-review.project quick`
        - `code-review.project focus:security`

- **Pull request review**: `code-review.pr`
    - **Use when**: Reviewing a GitHub PR via `gh`.
    - **Examples**:
        - `code-review.pr`
        - `code-review.pr 123`

- **Git diff review**: `code-review.git`
    - **Use when**: Reviewing local changes without a PR.
    - **Examples**:
        - `code-review.git`
        - `code-review.git staged`
        - `code-review.git unstaged`
        - `code-review.git HEAD~3`
        - `code-review.git commit1..commit2`

- **Pre-commit staged review**: `code-review.staged`
    - **Use when**: Quick gate-style check before committing.
    - **Examples**:
        - `code-review.staged`
        - `code-review.staged --strict`

- **Feature-scope review**: `code-review.feature`
    - **Use when**: Deep review for a feature folder (architecture, UX/i18n consistency, tests).
    - **Examples**:
        - `code-review.feature auth`
        - `code-review.feature src/features/users`

- **Single-file review**: `code-review.file`
    - **Use when**: You want detailed, line-by-line feedback for one file.
    - **Examples**:
        - `code-review.file src/router.tsx`

### What the workflows check

- **Code Quality**: TypeScript strictness, lint/format consistency, error handling patterns
- **Testing**: coverage gaps and test quality for changes
- **UX Consistency**: i18n usage, accessibility, consistent shadcn/ui patterns
- **Performance**: expensive imports, unnecessary re-renders, route loading patterns
- **Security**: secrets, authz/authn correctness, input validation

---

## 📖 Documentation

### Project Documentation

- [Project Overview](docs/project-overview.md) - Product vision, features, requirements
- [Project Architecture](docs/project-architecture.md) - High-level project structure and design decisions

### Specifications

- [001 Contacts CRUD](docs/archived-001-contacts-crud/spec.md)

### GitHub Configuration

| File                                                            | Description                                                           |
|-----------------------------------------------------------------|-----------------------------------------------------------------------|
| [Copilot Instructions](./.github/copilot-instructions.md)       | Code generation guidelines and project conventions for GitHub Copilot |
| [Git Commit Instructions](./.github/git-commit-instructions.md) | Conventional commit message format and guidelines                     |
| [CI Workflow](./.github/workflows/ci.yml)                       | GitHub Actions workflow for linting, testing and building             |

The project uses GitHub Actions for continuous integration. The pipeline runs on every push and pull request to `main`:

- **Linting** – ESLint code quality checks
- **Formatting** – Prettier format verification
- **Type Check** – TypeScript type validation
- **Tests** – Vitest unit test execution
- **Build** – Production build verification

---

## 📦 Dependencies

### Production

| Package                    | Version  | Description                |
|----------------------------|----------|----------------------------|
| `react`                    | ^19.2.3  | UI library                 |
| `react-dom`                | ^19.2.3  | React DOM renderer         |
| `@tanstack/react-start`    | ^1.145.7 | Full-stack React framework |
| `@tanstack/react-router`   | ^1.145.7 | Type-safe routing          |
| `@tanstack/react-query`    | ^5.90.16 | Data fetching & caching    |
| `@tanstack/react-form`     | ^1.27.7  | Form handling              |
| `@tanstack/react-store`    | ^0.7.7   | State management & theme   |
| `drizzle-orm`              | ^0.45.1  | Database ORM               |
| `postgres`                 | ^3.4.7   | PostgreSQL client          |
| `better-auth`              | ^1.4.10  | Authentication library     |
| `zod`                      | ^4.3.5   | Schema validation          |
| `tailwindcss`              | ^4.1.18  | CSS framework              |
| `class-variance-authority` | ^0.7.1   | Component variants         |
| `clsx`                     | ^2.1.1   | Class name utility         |
| `tailwind-merge`           | ^3.4.0   | Tailwind class merging     |
| `radix-ui`                 | ^1.4.3   | Accessible UI primitives   |
| `lucide-react`             | ^0.544.0 | Icon library               |
| `motion`                   | ^12.24.0 | Animation library          |
| `@t3-oss/env-core`         | ^0.13.10 | Type-safe env variables    |
| `uuid`                     | ^13.0.0  | UUID generation            |

### Development

| Package                   | Version | Description               |
|---------------------------|---------|---------------------------|
| `typescript`              | ^5.9.3  | TypeScript compiler       |
| `vite`                    | ^7.3.0  | Build tool                |
| `vitest`                  | ^3.2.4  | Test runner               |
| `@testing-library/react`  | ^16.3.1 | Component testing         |
| `eslint`                  | ^9.39.2 | Linting                   |
| `prettier`                | ^3.7.4  | Code formatting           |
| `drizzle-kit`             | ^0.31.8 | Drizzle CLI tools         |
| `@cloudflare/vite-plugin` | ^1.17.1 | Cloudflare Workers plugin |
| `wrangler`                | ^4.54.0 | Cloudflare CLI            |

---

## 📄 License

This project is private.
