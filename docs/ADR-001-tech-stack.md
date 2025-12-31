# ADR-001: Tech Stack Architecture Decision Record

## Status

Approved

## Date

2025-08-11

## Project

Contactory

## Author

Mohammed

## Context

We need to select a modern, performant technology stack for building the Contacts web application. The application
requires:

- Fast development iteration
- Type safety
- Modern UI components
- Efficient data fetching and state management
- Responsive design capabilities
- Good developer experience
- Flexible implementation patterns
- Utilize solid well documented libraries with strong community support
- Force best practices and conventions
- Bilingual support with seamless language switching
- RTL/LTR layout support for Arabic and English content
- Internationalization (i18n) capabilities

## Decision

We will use the following technology stack:

### Core

- **Build Tool**: Vite
- **UI Framework**: TanStack Start (Fully type-safe React framework)
- **Language**: TypeScript
- **Component Library**: shadcn/ui
- **Styling**: Tailwind CSS

### Data & State

- **Routing**: TanStack Router
- **Data Caching**: TanStack Query
- **Data Tables**: TanStack Table _(pending)_
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Validation**: Zod

### Authentication

- **Auth Library**: better-auth

### UI/UX

- **Icons**: Lucide React
- **Notifications**: Sonner (toast notifications)
- **Theme**: next-themes (dark/light mode)

### Internationalization _(pending)_

- **i18n Library**: react-i18next
- **RTL/LTR Support**: Tailwind CSS built-in RTL support & Logical Properties
- **Date/Number Formatting**: Luxon & Intl API (built-in browser support)

### Testing

- **Unit Testing**: Vitest
- **E2E Testing**: Playwright _(pending)_

### Code Quality

- **Linting**: ESLint
- **Formatting**: Prettier

## Options Considered

1. **SPA vs MPA**: Multi Page Application architecture with TanStack Start chosen for a seamless user experience
2. **Vite vs Webpack**: Vite chosen for faster development builds and HMR
3. **shadcn/ui vs Material-UI**: shadcn/ui chosen for customizability and modern design
4. **React Router vs TanStack Router**: TanStack Router chosen for better TypeScript support and type-safe routing
5. **SWR vs TanStack Query**: TanStack Query chosen for comprehensive caching and synchronization features
6. **Vitest vs Jest**: Vitest chosen for its speed and compatibility with Vite
7. **Playwright vs Cypress**: Playwright chosen for its cross-browser capabilities and modern API
8. **Eslint & Prettier vs Biome**: Chosen for maintaining code quality and consistent formatting across the codebase
9. **react-i18next vs react-intl**: react-i18next chosen for its flexibility, namespace support, and better TypeScript
   integration
10. **Tailwind RTL vs CSS-in-JS RTL**: Tailwind CSS RTL plugin chosen for consistency with existing styling approach
11. **Custom i18n vs Intl API**: Combination approach using react-i18next for text and built-in Intl API for
    dates/numbers
12. **Drizzle vs Prisma**: Drizzle ORM chosen for its lightweight nature, SQL-like syntax, and better TypeScript
    inference
13. **better-auth vs NextAuth/Clerk**: better-auth chosen for its simplicity, self-hosted nature, and tight integration
    with modern stacks
14. **Zod vs Yup**: Zod chosen for its TypeScript-first design and excellent type inference
15. **Sonner vs react-hot-toast**: Sonner chosen for its modern design and better animation support

## Rationale

- **MPA Architecture**: MPA with TanStack Start offers better SEO and initial load performance for content-heavy
  applications
- **TypeScript**: Provides static typing, better tooling, and improved developer experience
- **Vite**: Provides lightning-fast development server and optimized production builds
- **shadcn/ui**: Offers beautiful, customizable components that can be copied and modified as needed
- **Tailwind CSS**: Enables rapid UI development with utility-first approach, with excellent RTL support through logical
  properties
- **TanStack Router**: Provides fully type-safe routing with excellent developer experience
- **TanStack Query**: Handles server state management, caching and synchronization efficiently
- **TanStack Table**: Offers powerful, headless table functionality for complex data displays
- **Drizzle ORM**: Provides type-safe database queries with SQL-like syntax and excellent TypeScript inference,
  lightweight with no code generation required
- **better-auth**: Simple, self-hosted authentication with built-in support for email/password, social login, and
  session management
- **Zod**: TypeScript-first schema validation with excellent type inference and runtime validation
- **Sonner**: Modern toast notification library with beautiful animations and stacking support
- **react-i18next**: Mature, feature-rich internationalization library with excellent TypeScript support and namespace
  organization
- **Tailwind CSS RTL**: Seamless RTL/LTR switching without CSS-in-JS complexity
- **Luxon & Intl API**: Provides robust date and number formatting capabilities, leveraging native browser support
- **Vitest**: Fast and lightweight testing framework that integrates seamlessly with Vite
- **Playwright**: Provides robust end-to-end testing capabilities across multiple browsers
- **Eslint & Prettier**: Enforces code quality and consistency, making collaboration easier

## Consequences

### Positive

- Fast development iteration with Vite's HMR
- Excellent developer experience with SEO-friendly MPA architecture
- Easier to maintain and scale with TypeScript
- Type-safe routing and linking with TanStack Router
- Modern, responsive UI with minimal custom CSS
- Excellent caching and data synchronization
- Strong ecosystem and community support
- Consistent design system with shadcn/ui
- Scalable architecture for future growth
- Comprehensive testing coverage with Vitest and Playwright
- Consistent coding standards and best practices with Eslint and Prettier
- Seamless bilingual support with react-i18next namespace organization
- Automatic RTL/LTR layout switching with Tailwind's built-in RTL support & logical properties
- Native browser internationalization for dates, numbers and currencies
- Type-safe translation keys with TypeScript integration

### Negative

- shadcn/ui components may require customization for brand-specific needs
- Learning curve for TanStack libraries if team is not familiar
- Increased bundle size if not optimized properly, especially with multiple libraries (mitigated by Vite's tree-shaking
  and code-splitting capabilities)
- Need to ensure proper configuration and optimization of Vite for production builds
- Need to ensure proper testing setup with Vitest and Playwright for both unit and E2E tests
- Additional complexity for managing translation files and RTL/LTR-specific styles
- Testing complexity increases with bilingual content and layout direction changes
- Initial setup overhead for i18n configuration and translation workflow

## Implementation

1. Initialize Vite project with React and TypeScript template
2. Install and configure Tailwind CSS v4
3. Set up shadcn/ui component library
4. Configure TanStack Router for application routing
5. Set up TanStack Query for data fetching
6. Integrate TanStack Table for data display components
7. Install and configure react-i18next with TypeScript support
8. Set up translation files for Arabic and English
9. Implement language switching mechanism and direction detection
10. Set up Vitest for unit testing (including i18n testing utilities)
11. Configure Playwright for end-to-end testing (including RTL/LTR scenarios)
12. Install and configure Eslint and Prettier for code quality
13. Create development setup guide and coding standards documentation
14. Create i18n guidelines and translation workflow documentation

## Related Decisions

- Future ADRs will cover specific implementation patterns and conventions for this stack

## References

- [TansStack Start Documentation](https://tanstack.com/start/latest)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [RTL Support in Tailwind CSS](https://tailwindcss.com/docs/hover-focus-and-other-states#rtl-support)
- [Simplified RTL support with logical properties](https://tailwindcss.com/blog/tailwindcss-v3-3#simplified-rtl-support-with-logical-properties)
- [Logical Properties in Tailwind CSS](https://tailwindcss.com/docs/top-right-bottom-left#using-logical-properties)
- [Right to Left (RTL) in React - Developer's Guide](https://leancode.co/blog/right-to-left-in-react)
- [TanStack Router Documentation](https://tanstack.com/router/latest)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [TanStack Table Documentation](https://tanstack.com/table/latest)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [better-auth Documentation](https://www.better-auth.com/)
- [Zod Documentation](https://zod.dev/)
- [Sonner Documentation](https://sonner.emilkowal.ski/)
- [Lucide React Documentation](https://lucide.dev/guide/packages/lucide-react)
- [react-i18next Documentation](https://react.i18next.com/)
- [Intl API Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
- [Luxon Documentation](https://moment.github.io/luxon/)
- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [Eslint Documentation](https://eslint.org/docs/latest/)
- [Prettier Documentation](https://prettier.io/docs/en/)
