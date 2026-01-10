# 🤖 Copilot Code Generation Instructions

## 📑 Table of Contents

- [Project Structure](#-project-structure)
- [General Formatting Rules](#-general-formatting-rules)
- [General Meta Rules](#-general-meta-rules)
- [Language Rules](#-language-rules)
- [Code Style](#-code-style)
- [Tips and Tricks](#-tips-and-tricks)
- [React Patterns](#-react-patterns)
- [Project-Specific Patterns](#-project-specific-patterns)
- [shadcn/ui](#-shadcnui)
- [General Guidelines](#-general-guidelines)

---

## 🚀 Project Structure

This project uses TypeScript with the following conventions:

- 📁 All code files use lowercase with hyphens (e.g., `my-component.tsx`)
- 📝 Markdown files use lowercase with hyphens (e.g., `my-doc.md`)
- 📦 All application logic goes in the `lib` directory
- ⚙️ All configuration uses environment variables via a `.env` file
- 🗂️ Feature-based folder structure under `src/features/`
- 🔗 Integration libraries under `src/integrations/`
- 🛣️ Routes under `src/routes/`

### 📁 Folder Organization

```
src/
├── features/              # Feature modules
│   ├── auth/              # Authentication feature
│   │   ├── components/    # Auth UI components
│   │   ├── hooks/         # Auth hooks
│   │   └── lib/           # Auth utilities
│   ├── landing/           # Landing page feature
│   │   └── components/    # Landing page components
│   └── users/             # User management feature
│       ├── components/    # User UI components
│       ├── hooks/         # User hooks
│       ├── lib/           # User utilities
│       └── utils/         # Helper functions
├── integrations/          # Third-party integrations
│   ├── better-auth/       # Auth integration
│   ├── shadcn/            # UI components
│   ├── tanstack-form/     # Form integration
│   └── tanstack-query/    # Query integration
├── routes/                # TanStack Router routes
│   ├── __root.tsx         # Root layout
│   ├── _auth/             # Auth routes
│   ├── _public/           # Public routes
│   ├── _user/             # Protected user routes
│   ├── _admin/            # Admin routes
│   └── api/               # API endpoints
├── server/                # Server-side code
│   ├── db/                # Database configuration
│   │   ├── client.ts      # Drizzle DB client
│   │   ├── migrations/    # Database migrations
│   │   └── seeds.ts       # Seed data
│   ├── emails/            # Email templates
│   ├── middlewares/       # Server middlewares
│   ├── modules/           # Business logic modules
│   ├── mutations/         # Server mutation functions
│   ├── queries/           # Server query functions
│   └── schemas/           # Validation schemas
├── core/                # core utilities
│   ├── components/        # Reusable components
│   ├── theme/             # Theme configuration
│   └── utils/             # Utility functions
└── env.client.ts          # Client environment variables
```

---

## 🎨 General Formatting Rules

### ✂️ Trailing Whitespace

Remove trailing white spaces! They complicate diffs and are unnecessary.

❌ **Not Recommended:**

```typescript
const name = 'John Smith'
__
```

✅ **Recommended:**

```typescript
const name = 'John Smith'
```

> 💡 **Tip**: Configure your editor to trim trailing whitespace on save.

### 📐 Indentation

Be consistent with your indentation throughout the file. Use **2 spaces**.

Pick one and stick with it across the entire project.

---

## 🔧 General Meta Rules

### 📝 File Encoding

- Use UTF-8 (no BOM)
- Ensure your editor is configured correctly

### 💭 Comments

Use comments to explain code: what does it cover, what purpose does it serve, and why is the respective solution used or
preferred?

Document functions with **JSDoc**:

**Recommended JSDoc annotations:**

- `@description`: describe your function
- `@param`: describe the name, type and description of a function parameter
- `@returns`: document the type and description of a function's return value

**Example:**

```typescript
/**
 * @description Adds two numbers together
 * @param a - First number
 * @param b - Second number
 * @returns Sum of a and b
 */
function sum(a: number, b: number): number {
  return a + b
}
```

**Class example:**

```typescript
/**
 * @description Represents a book in the library
 */
class Book {
  constructor(
    public title: string,
    public author: string,
  ) {}
}
```

### 📋 Action Items

Mark todos and action items with `TODO:`.

✅ **Recommended:**

```typescript
// TODO: add validation for email format
```

---

## 🌟 Language Rules

### 📦 Variable Declaration

Order of preference:

1. `const` (default choice)
2. `let` (when reassignment needed)
3. `var` (avoid)

### 🎯 Semicolons

Always use semicolons to avoid subtle bugs.

❌ **Not Recommended:**

```typescript
const foo = () => {
  return true // Missing semicolon
} // Missing semicolon

function foo() {
  return true
} // Extra semicolon
```

✅ **Recommended:**

```typescript
const foo = () => {
  return true
}

function foo() {
  return true
}
```

### 🚫 Wrapper Objects for Primitive Types

Don't use wrapper objects for primitives. Type casting is okay.

❌ **Not Recommended:**

```typescript
const x = new Boolean(0)
if (x) {
  alert('hi') // Shows 'hi' because x is a truthy object
}
```

✅ **Recommended:**

```typescript
const x = Boolean(0)
if (x) {
  alert('hi') // Won't show because x is false
}
```

### 🔄 Closures

Use closures, but be careful with memory leaks.

❌ **Not Recommended:**

```typescript
function foo(element: HTMLElement, a: number, b: number) {
  element.onclick = function () {
    /* uses a and b */
  }
}
```

✅ **Recommended:**

```typescript
function foo(element: HTMLElement, a: number, b: number) {
  element.onclick = bar(a, b)
}

function bar(a: number, b: number) {
  return function () {
    /* uses a and b */
  }
}
```

### 🔁 Loops and Iteration

#### Arrays

Use `forEach`, `map`, `filter`, or `for...of` for arrays:

❌ **Not Recommended:**

```typescript
const myArray = ['a', 'b', 'c']
for (const index in myArray) {
  console.log(myArray[index])
}
```

✅ **Recommended:**

```typescript
const myArray = ['a', 'b', 'c']

// forEach
myArray.forEach((val) => {
  console.log(val)
})

// for...of
for (const val of myArray) {
  console.log(val)
}
```

#### Objects

Use `Object.entries()`, `Object.keys()`, or `Object.values()`:

❌ **Not Recommended:**

```typescript
const myObj = { firstName: 'Ada', lastName: 'Lovelace' }
for (const key in myObj) {
  console.log(myObj[key])
}
```

✅ **Recommended:**

```typescript
const myObj = { firstName: 'Ada', lastName: 'Lovelace' }

// Object.entries
Object.entries(myObj).forEach(([key, value]) => {
  console.log(`${key}: ${value}`)
})

// Or with hasOwnProperty check if using for...in
for (const key in myObj) {
  if (Object.hasOwn(myObj, key)) {
    console.log(myObj[key])
  }
}
```

### 📝 Multiline String Literals

Use template literals for multiline strings:

❌ **Not Recommended:**

```typescript
const myString =
  'A rather long string of English text, an error message ' +
  'actually that just keeps going and going -- an error ' +
  'message that is really really long.'
```

✅ **Recommended:**

```typescript
const myString = `A rather long string of English text, an error message
actually that just keeps going and going -- an error
message that is really really long.`
```

### 🎁 Array and Object Literals

Use literals instead of constructors:

❌ **Not Recommended:**

```typescript
const myArray = new Array(x1, x2, x3)
const myObject = new Object()
myObject.a = 0
```

✅ **Recommended:**

```typescript
const myArray = [x1, x2, x3]
const myObject = { a: 0 }
```

---

## 🎯 Code Style

### 🏷️ Naming Conventions

| Type      | Convention       | Example           |
| --------- | ---------------- | ----------------- |
| Functions | camelCase        | `getUserById`     |
| Variables | camelCase        | `userName`        |
| Classes   | PascalCase       | `UserService`     |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRIES`     |
| Files     | lowercase-hyphen | `user-service.ts` |

### 🎨 Code Formatting

Always start curly braces on the same line:

✅ **Recommended:**

```typescript
if (something) {
  // do something
} else {
  // do something else
}
```

Single-line array and object initializers:

✅ **Recommended:**

```typescript
const array = [1, 2, 3]
const object = { a: 1, b: 2, c: 3 }
```

Multiline array and object initializers:

✅ **Recommended:**

```typescript
const array = ['joe@email.com', 'sal@email.com', 'murr@email.com']

const object = {
  id: 'foo',
  class: 'foo-important',
  name: 'notification',
}
```

### 📝 Strings

Use single quotes for strings. Use double quotes inside HTML strings:

✅ **Recommended:**

```typescript
const element = '<button class="btn">Click Me</button>'
```

> ⚠️ **Exception**: JSON requires double quotes per specification.

---

## 💡 Tips and Tricks

### ✅ Truthy and Falsy Values

**Falsy values:**

- `null`
- `undefined`
- `''` (empty string)
- `0`

**Truthy values (be careful!):**

- `'0'` (string)
- `[]` (empty array)
- `{}` (empty object)

### 🎯 Ternary Operator

Use for simple conditionals:

❌ **Not Recommended:**

```typescript
if (val) {
  return foo()
} else {
  return bar()
}
```

✅ **Recommended:**

```typescript
return val ? foo() : bar()
```

### ⚡ Short-circuit Evaluation

Use `||` for default values and `&&` for conditional execution:

❌ **Not Recommended:**

```typescript
let theName
if (name) {
  theName = name
} else {
  theName = 'John'
}
```

✅ **Recommended:**

```typescript
const theName = name || 'John'
```

### 🆕 Modern JavaScript/TypeScript Patterns

#### Optional Chaining (`?.`)

```typescript
// Instead of
if (user && user.address && user.address.city) {
  console.log(user.address.city)
}

// Use
console.log(user?.address?.city)
```

#### Nullish Coalescing (`??`)

```typescript
// Only falls back for null/undefined, not falsy values
const count = userCount ?? 0
const name = userName ?? 'Anonymous'
```

#### Async/Await

```typescript
// Instead of .then() chains
async function fetchUser(id: string): Promise<User> {
  try {
    const response = await fetch(`/api/users/${id}`)
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch user:', error)
    throw error
  }
}
```

---

## ⚛️ React Patterns

### 🏷️ Type-Only Imports

Separate type imports from regular imports for clarity:

✅ **Recommended:**

```typescript
import { useMutation } from '@tanstack/react-query'

import type { QueryClient } from '@tanstack/react-query'
import type { Session } from '@/integrations/better-auth/auth-client'
```

### 🧩 Component Props

Use `React.ComponentProps` for extending native element props:

✅ **Recommended:**

```typescript
export interface ButtonProps extends React.ComponentProps<'button'> {
  variant?: 'primary' | 'secondary'
  isLoading?: boolean
}

export function Button ({ variant, isLoading, ...props }: ButtonProps) {
  return <button { ...props }
  />
}
```

### 📦 Named Exports

Prefer named exports over default exports:

✅ **Recommended:**

```typescript
export function MyComponent() {
  /* ... */
}

export { MyComponent }
```

❌ **Not Recommended:**

```typescript
export default function MyComponent() {
  /* ... */
}
```

### 🎨 Conditional Rendering

Use ternary for inline conditionals and `null` checks:

✅ **Recommended:**

```typescript
{
  error ? <ErrorMessage error = { error } /> : null}
  {children ? <Field>{ children } < /Field> : null}
```

### 🪝 Custom Hooks

Prefix custom hooks with `use` and return mutations/queries from TanStack:

✅ **Recommended:**

```typescript
export function useSigninEmail() {
  return useMutation({
    mutationKey: ['signin-email'],
    mutationFn: signinEmail,
  })
}
```

---

## 🔧 Project-Specific Patterns

### 📋 Zod Schema Validation

Use Zod for form and data validation:

✅ **Recommended:**

```typescript
import { z } from 'zod'

const formSchema = z.object({
  email: z.email('Invalid email address').nonempty('Email is required'),
  password: z
    .string()
    .nonempty('Password is required')
    .min(10, 'Password must be at least 10 characters long'),
})
```

### 🗄️ Drizzle ORM Schemas

Use Drizzle ORM patterns for database schemas:

✅ **Recommended:**

```typescript
import { pgTable, text, timestamp, boolean } from 'drizzle-orm/pg-core'
import { v7 as uuidv7 } from 'uuid'

export const contact = pgTable('contact', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
})
```

### 🌐 Environment Variables

Use `@t3-oss/env-core` for type-safe environment variables:

✅ **Recommended:**

```typescript
import { z } from 'zod'
import { createEnv } from '@t3-oss/env-core'

export const senv = createEnv({
  server: {
    DATABASE_URL: z.url(),
    API_SECRET: z.string(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
})
```

### 🖥️ Server Functions

Use TanStack Start server functions:

✅ **Recommended:**

```typescript
import { createServerFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'

export const findSessionFn = createServerFn().handler(() => {
  const request = getRequest()
  return auth.api.getSession({ headers: request.headers })
})
```

### 🛣️ Route Components

Use TanStack Router patterns:

✅ **Recommended:**

```typescript
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/signin')({
  beforeLoad({ context }) {
    if (context.session) {
      throw redirect({ to: '/console' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  // component logic
}
```

### 📝 Form Handling

Use the custom `useAppForm` hook with Zod validation:

✅ **Recommended:**

```typescript
const form = useAppForm({
  defaultValues: {
    email: '',
    password: '',
  },
  validators: {
    onSubmit: formSchema,
  },
  async onSubmit({ value }) {
    await onFormSubmit(value)
  },
})
```

### 🎨 Class Variance Authority (CVA)

Use CVA for component variants:

✅ **Recommended:**

```typescript
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

const buttonVariants = cva('base-classes', {
  variants: {
    variant: {
      default: 'default-classes',
      destructive: 'destructive-classes',
    },
    size: {
      default: 'h-9 px-4',
      sm: 'h-8 px-3',
      lg: 'h-10 px-6',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})
```

### 🔀 Path Aliases

Use `@/` alias for imports from `src/`:

✅ **Recommended:**

```typescript
import { cn } from '@/features/abstractions/lib/utils'
import { Button } from '@/features/abstractions/components/primitives/button'
import { useSigninEmail } from '@/integrations/better-auth/hooks/use-signin-email'
```

---

## 🎨 shadcn/ui

Use the latest version of shadcn to install new components:

```bash
pnpx shadcn@latest add button
```

---

## 📋 General Guidelines

- avoid serial comma
- use single quotes for strings
- always use semicolons
- prefer `const` over `let`
- never use `var`
- use template literals for string interpolation
- use arrow functions for callbacks
- use `async/await` over `.then()` chains
- use optional chaining (`?.`) and nullish coalescing (`??`)
- use `Object.entries()` for object iteration
- keep functions small and focused
- write self-documenting code with clear variable names
- use `import type` for type-only imports
- prefer named exports over default exports
- use `@/` path alias for imports from `src/`
- use Zod for schema validation
- use CVA for component variants
- place primitives in `components/primitives/`
- place reusable composed components in `components/reused/`
- name custom hooks with `use` prefix
- use `React.ComponentProps<'element'>` for extending native props
- use singular nouns for table names
