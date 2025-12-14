# 📇 Contactory

A simple, fast and secure Contactory management application that helps users organize all their personal and
professional/
contacts in one place.

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

| Feature              | Status         | Description                                                  |
| -------------------- | -------------- | ------------------------------------------------------------ |
| Authentication       | ✅ Implemented | Secure signup, signin, password reset and session management |
| Theme Support        | 🚧 In Progress | Dark/light mode with system preference detection             |
| Organize Contacts    | 📅 Coming Soon | CRUD operations for contacts                                 |
| Search & Filter      | 📅 Coming Soon | Real-time search with advanced filtering                     |
| Sync                 | 📅 Coming Soon | Cross-device synchronization                                 |
| Share                | 📅 Coming Soon | Share contacts via link, email or messaging                  |
| Import/Export        | 📅 Coming Soon | CSV, vCard and JSON support                                  |
| Groups/Labels        | 📅 Coming Soon | Custom groups with color coding                              |
| Favorites            | 📅 Coming Soon | Quick access to important contacts                           |
| Duplicate Detection  | 📅 Coming Soon | Find and merge duplicate contacts                            |
| QR Code Sharing      | 📅 Coming Soon | Share contact info via scannable QR code                     |
| Internationalization | 📅 Coming Soon | Bilingual support (English/Arabic) with RTL/LTR layout       |

---

## 🛠️ Tech Stack

### Core

| Technology     | Purpose                    |
| -------------- | -------------------------- |
| TypeScript     | Type-safe JavaScript       |
| Vite           | Build tool & dev server    |
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

| Technology     | Purpose               |
| -------------- | --------------------- |
| Tailwind CSS 4 | Utility-first styling |
| shadcn/ui      | Component library     |
| Radix UI       | Accessible primitives |
| Lucide React   | Icons                 |
| Sonner         | Toast notifications   |
| next-themes    | Theme management      |
| CVA            | Component variants    |

### Authentication

| Technology  | Purpose      |
| ----------- | ------------ |
| better-auth | Auth library |

### Testing & Quality

| Technology      | Purpose           |
| --------------- | ----------------- |
| Vitest          | Unit testing      |
| Testing Library | Component testing |
| ESLint          | Linting           |
| Prettier        | Code formatting   |

---

## 📁 Project Structure

```
contactory/
├── .github/                       # GitHub configuration
│   ├── copilot-instructions.md    # Copilot code generation guidelines
│   ├── git-commit-instructions.md # Commit message conventions
│   └── workflows/
│       └── ci.yml                 # CI/CD pipeline configuration
├── docs/                          # Documentation
│   ├── ADR-001-tech-stack.md      # Architecture decision record
│   └── PRD.md                     # Product requirements document
├── drizzle/                       # Database migrations
│   └── meta/                      # Migration metadata
├── public/                        # Static assets
│   ├── favicon.svg
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── db/                        # Database configuration
│   │   ├── index.ts               # Database client
│   │   └── schemas/               # Drizzle ORM schemas
│   │       ├── auth.ts            # Auth-related tables
│   │       └── contacts.ts        # Contact tables
│   ├── features/                  # Feature modules
│   │   ├── abstractions/          # Shared UI components
│   │   │   ├── components/
│   │   │   │   ├── primitives/    # Base UI components (button, input, etc.)
│   │   │   │   └── reused/        # Composite components (header, footer, etc.)
│   │   │   └── lib/               # Utility functions
│   │   │       ├── utils.ts       # cn() and helpers
│   │   │       └── utils.test.ts  # Unit tests
│   │   └── users/                 # User feature module
│   │       ├── components/        # Auth forms
│   │       └── functions/         # Server functions
│   ├── integrations/              # Third-party integrations
│   │   ├── better-auth/           # Auth integration
│   │   │   ├── auth.ts            # Server auth config
│   │   │   ├── auth-client.ts     # Client auth config
│   │   │   ├── hooks/             # Auth mutations
│   │   │   └── middlewares/       # Auth middlewares
│   │   ├── tanstack-form/         # Form integration
│   │   │   ├── components/        # Form field components
│   │   │   └── hooks/             # useAppForm hook
│   │   └── tanstack-query/        # Query integration
│   │       ├── root-provider.tsx  # Query client provider
│   │       └── devtools.tsx       # Query devtools
│   ├── routes/                    # TanStack Router routes
│   │   ├── __root.tsx             # Root layout
│   │   ├── index.tsx              # Home page
│   │   ├── _auth/                 # Auth layout routes
│   │   │   ├── signin.tsx
│   │   │   ├── signup.tsx
│   │   │   ├── forgot-password.tsx
│   │   │   └── reset-password.tsx
│   │   ├── api/auth/              # Auth API routes
│   │   └── console/               # Protected routes
│   ├── env.ts                     # Type-safe environment variables
│   ├── router.tsx                 # Router configuration
│   ├── routeTree.gen.ts           # Auto-generated route tree
│   └── styles.css                 # Global styles
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
- PostgreSQL database

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/contactory.git
cd contactory

# Install dependencies
pnpm install
```

### Environment Variables

Copy the example environment file and configure your variables:

```bash
cp .env.example .env.local
```

Then fill in the required environment variables:

| Variable                     | Description                                            | Required |
| ---------------------------- | ------------------------------------------------------ | -------- |
| `DATABASE_URL`               | PostgreSQL connection string                           | ✅       |
| `BETTER_AUTH_SECRET`         | Secret key for authentication                          | ✅       |
| `BETTER_AUTH_URL`            | Base URL of your app (e.g., `http://localhost:3000`)   | ✅       |
| `ENABLE_BETTER_AUTH_OPENAPI` | Enable OpenAPI docs (`true` for dev, `false` for prod) | ❌       |
| `VITE_BETTER_AUTH_BASE_URL`  | Client-side base URL of your app                       | ✅       |

### Running the App

```bash
# Run database migrations
pnpm db:migrate

# Start the development server
pnpm dev
```

The app will be running at `http://localhost:3000`.

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

| Document                                       | Description                                                |
| ---------------------------------------------- | ---------------------------------------------------------- |
| [Product Requirements (PRD)](./docs/PRD.md)    | Feature specifications, user stories and requirements      |
| [Tech Stack ADR](./docs/ADR-001-tech-stack.md) | Architecture decision record explaining technology choices |

### GitHub Configuration

| File                                                            | Description                                                           |
| --------------------------------------------------------------- | --------------------------------------------------------------------- |
| [Copilot Instructions](./.github/copilot-instructions.md)       | Code generation guidelines and project conventions for GitHub Copilot |
| [Git Commit Instructions](./.github/git-commit-instructions.md) | Conventional commit message format and guidelines                     |
| [CI Workflow](./.github/workflows/ci.yml)                       | GitHub Actions workflow for linting, testing and building             |

### CI/CD Pipeline

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
