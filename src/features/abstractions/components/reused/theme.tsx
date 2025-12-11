import { z } from 'zod'
import { MoonIcon, SunIcon } from 'lucide-react'
import { createContext, useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Store, useStore } from '@tanstack/react-store'
import { getCookie, setCookie } from '@tanstack/react-start/server'
import { createServerFn, useServerFn } from '@tanstack/react-start'

import { cn, noop } from '@/features/abstractions/lib/utils'
import { Button } from '@/features/abstractions/components/primitives/button'

/**
 * @description Schema for validating the theme cookie value.
 */
export const themeSchema = z.union([z.literal('light'), z.literal('dark')])

/**
 * @description Type representing the theme, inferred from the theme schema.
 */
export type Theme = z.infer<typeof themeSchema>

/**
 * @description State of the theme store.
 * @property theme - The current theme value. Can be either 'light' or 'dark'.
 */
export interface ThemeStoreState {
  theme: Theme
}

/**
 * Function to set a theme cookie on the client.
 */
export const setThemeCookieFn = createServerFn()
  .inputValidator(themeSchema)
  .handler(({ data }) => {
    setCookie('theme', data, {
      path: '/',
      maxAge: 365 * 24 * 60 * 60, // 1 year
    })
  })
/**
 * @description Server function to get the theme from the cookie
 */
export const getThemeCookieFn = createServerFn().handler(() => {
  const theme = getCookie('theme')
  return themeSchema.safeParse(theme).data
})

/**
 * @description Context for sharing theme store across the app
 */
const ThemeContext = createContext<Store<ThemeStoreState> | null>(null)

/**
 * @description Provider component that initializes and shares the theme store
 * @param initialTheme - The initial theme value from SSR hydration
 * @param children - Child components
 */
export function ThemeProvider({
  initialTheme,
  children,
}: {
  initialTheme: Theme
  children: React.ReactNode
}) {
  const store = new Store<ThemeStoreState>({ theme: initialTheme })

  return <ThemeContext.Provider value={store}>{children}</ThemeContext.Provider>
}

/**
 * @description Theme toggle button component
 * @param theme
 * @param onChange
 */
export function ThemeToggle({
  theme,
  onChange = noop,
}: {
  theme: Theme
  onChange?: (theme: Theme) => void
}) {
  return (
    <Button
      size="icon"
      variant="outline"
      onClick={() => onChange(theme === 'light' ? 'dark' : 'light')}
    >
      <MoonIcon className={cn(theme === 'light' ? 'hidden' : 'block')} />
      <SunIcon className={cn(theme === 'dark' ? 'hidden' : 'block')} />
    </Button>
  )
}

/**
 * @description Hook to access and update the theme from the shared store
 * @returns Object containing theme value and setTheme function
 */
export function useTheme() {
  const store = useContext(ThemeContext)

  if (!store) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  const setThemeCookie = useServerFn(setThemeCookieFn)
  const { mutate } = useMutation({
    mutationKey: ['set-theme-cookie'],
    mutationFn: setThemeCookie,
  })

  const theme = useStore(store, (state) => state.theme)

  const setTheme = (newTheme: Theme) => {
    mutate({ data: newTheme })
    store.setState((state) => ({ ...state, theme: newTheme }))
  }

  return { theme, setTheme }
}
