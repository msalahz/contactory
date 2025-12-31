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
- [Documentation](#-documentation)
- [Dependencies](#-dependencies)
- [License](#-license)

---

## ✨ Features

| Feature              | Status         | Description                                             |
| -------------------- | -------------- | ------------------------------------------------------- |
| Authentication       | ✅ Implemented | Secure signup, signin, password reset with better-auth  |
| Theme Support        | ✅ Implemented | Dark/light mode with system preference detection        |
| Organize Contacts    | 🚧 In Progress | CRUD operations for contacts (basic structure in place) |
| Favorites            | 🚧 In Progress | Mark and manage favorite contacts                       |
| Search & Filter      | 📅 Coming Soon | Real-time search with advanced filtering                |
| Sync                 | 📅 Coming Soon | Cross-device synchronization                            |
| Share                | 📅 Coming Soon | Share contacts via link, email or messaging             |
| Import/Export        | 📅 Coming Soon | CSV, vCard and JSON support                             |
| Groups/Labels        | 📅 Coming Soon | Custom groups with color coding                         |
| Duplicate Detection  | 📅 Coming Soon | Find and merge duplicate contacts                       |
| QR Code Sharing      | 📅 Coming Soon | Share contact info via scannable QR code                |
| Internationalization | 📅 Coming Soon | Bilingual support with RTL/LTR layout                   |

---

## 🛠️ Tech Stack

### Core

| Technology     | Purpose                    |
| -------------- | -------------------------- |
| TypeScript 5.9 | Type-safe JavaScript       |
| Vite 7.3       | Build tool & dev server    |
| TanStack Start | Full-stack React framework |
| React 19       | UI library                 |

### Data & State

| Technology      | Purpose                   |
| --------------- | ------------------------- |
| TanStack Router | Type-safe routing         |
| TanStack Query  | Data fetching & caching   |
| TanStack Store  | State management          |
| TanStack Form   | Form handling             |
| Drizzle ORM     | Database ORM (PostgreSQL) |
| Zod             | Schema validation         |

### UI/UX

| Technology               | Purpose                |
| ------------------------ | ---------------------- |
| Tailwind CSS 4           | Utility-first styling  |
| shadcn/ui                | Component library      |
| Radix UI                 | Accessible primitives  |
| Lucide React             | Icons                  |
| class-variance-authority | Component variants     |
| tailwind-merge           | Merge Tailwind classes |

### Authentication

| Technology       | Purpose                             |
| ---------------- | ----------------------------------- |
| better-auth      | Authentication & session management |
| @t3-oss/env-core | Environment validation              |

### Development Tools

| Technology      | Purpose                |
| --------------- | ---------------------- |
| Vitest          | Unit testing framework |
| Testing Library | Component testing      |
| ESLint          | Code linting           |
| Prettier        | Code formatting        |
| Drizzle Kit     | Database migrations    |
| React Email     | Email templates        |
| Resend          | Email delivery service |

---

## 📁 Project Structure

```
contactory/
├── .github/                       # GitHub configuration
│   ├── workflows/
│   │   └── ci.yml                # CI/CD pipeline configuration
├── docs/                          # Documentation
│   ├── ADR-001-tech-stack.md      # Architecture decision record
│   ├── ADR-002-file-structure.md  # Project structure decisions
│   └── PRD.md                     # Product requirements document
├── drizzle/                       # Database migrations
│   └── meta/                      # Migration metadata
├── public/                        # Static assets
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── features/                  # Feature modules
│   │   ├── landing/               # Landing page components
│   │   │   └── components/        # Reusable UI components
│   │   └── users/                 # User management
│   │       ├── components/        # User interface components
│   │       └── hooks/             # Custom React hooks
│   ├── integrations/              # Third-party integrations
│   │   ├── better-auth/           # Auth configuration
│   │   └── shadcn/                # UI components
│   ├── routes/                    # Application routes
│   │   ├── __root.tsx             # Root layout
│   │   ├── _dashboard/            # Protected dashboard routes
│   │   ├── _public/               # Public routes
│   │   └── api/                   # API endpoints
│   ├── server/                    # Server-side code
│   │   ├── db/                    # Database client and models
│   │   ├── emails/                # Email templates
│   │   └── functions/             # Server functions
│   └── shared/                    # Shared utilities and components
│       ├── components/            # Reusable components
│       ├── hooks/                 # Shared React hooks
│       └── utils/                 # Utility functions
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
| ---------------------------------- | -------------------------------- | -------- | ----------------------- |
| `DATABASE_URL`                     | PostgreSQL connection string     | ✅       | -                       |
| `BETTER_AUTH_SECRET`               | Secret key for authentication    | ✅       | -                       |
| `BETTER_AUTH_URL`                  | Base URL of your app             | ✅       | `http://localhost:3000` |
| `BETTER_AUTH_GOOGLE_CLIENT_ID`     | Google OAuth client ID           | ❌       | -                       |
| `BETTER_AUTH_GOOGLE_CLIENT_SECRET` | Google OAuth client secret       | ❌       | -                       |
| `RESEND_API_KEY`                   | API key for Resend email service | ❌       | -                       |
| `VITE_BETTER_AUTH_BASE_URL`        | Client-side base URL of your app | ✅       |

---

## 📜 Scripts

| Script             | Description                          |
| ------------------ | ------------------------------------ |
| `pnpm dev`         | Start development server (port 3000) |
| `pnpm build`       | Build for production                 |
| `pnpm serve`       | Preview production build             |
| `pnpm test`        | Run unit tests                       |
| `pnpm lint`        | Lint codebase                        |
| `pnpm format`      | Format code with Prettier            |
| `pnpm check`       | Format and lint with auto-fix        |
| `pnpm typecheck`   | Run TypeScript type checking         |
| `pnpm db:generate` | Generate database migrations         |
| `pnpm db:migrate`  | Run database migrations              |
| `pnpm db:push`     | Push schema changes to database      |
| `pnpm db:studio`   | Open Drizzle Studio                  |

---

## 📖 Documentation

### Project Documentation

- [Product Requirements (PRD)](./docs/PRD.md) - Feature specifications and user stories
- [Tech Stack ADR](./docs/ADR-001-tech-stack.md) - Technology decisions and rationale
- [File Structure ADR](./docs/ADR-002-file-structure.md) - Project organization and architecture

### GitHub Configuration

| File                                                            | Description                                                           |
| --------------------------------------------------------------- | --------------------------------------------------------------------- |
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
| -------------------------- | -------- | -------------------------- |
| `react`                    | ^19.2.1  | UI library                 |
| `react-dom`                | ^19.2.1  | React DOM renderer         |
| `@tanstack/react-start`    | ^1.132.0 | Full-stack React framework |
| `@tanstack/react-router`   | ^1.132.0 | Type-safe routing          |
| `@tanstack/react-query`    | ^5.66.5  | Data fetching & caching    |
| `@tanstack/react-form`     | ^1.0.0   | Form handling              |
| `@tanstack/react-store`    | ^0.7.0   | State management           |
| `drizzle-orm`              | ^0.39.0  | Database ORM               |
| `pg`                       | ^8.11.0  | PostgreSQL client          |
| `better-auth`              | ^1.4.5   | Authentication library     |
| `zod`                      | ^4.1.11  | Schema validation          |
| `tailwindcss`              | ^4.0.6   | CSS framework              |
| `class-variance-authority` | ^0.7.1   | Component variants         |
| `clsx`                     | ^2.1.1   | Class name utility         |
| `tailwind-merge`           | ^3.0.2   | Tailwind class merging     |
| `@radix-ui/*`              | various  | Accessible UI primitives   |
| `lucide-react`             | ^0.544.0 | Icon library               |
| `sonner`                   | ^2.0.7   | Toast notifications        |
| `next-themes`              | ^0.4.6   | Theme management           |
| `@t3-oss/env-core`         | ^0.13.8  | Type-safe env variables    |
| `uuid`                     | ^13.0.0  | UUID generation            |

### Development

| Package                               | Version | Description         |
| ------------------------------------- | ------- | ------------------- |
| `typescript`                          | ^5.7.2  | TypeScript compiler |
| `vite`                                | ^7.1.7  | Build tool          |
| `vitest`                              | ^3.0.5  | Test runner         |
| `@testing-library/react`              | ^16.2.0 | Component testing   |
| `eslint`                              | ^9.39.1 | Linting             |
| `prettier`                            | ^3.5.3  | Code formatting     |
| `drizzle-kit`                         | ^0.30.0 | Drizzle CLI tools   |
| `@netlify/vite-plugin-tanstack-start` | ^1.2.2  | Netlify deployment  |

---

## 📄 License

This project is private.
