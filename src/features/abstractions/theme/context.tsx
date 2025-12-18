import { createContext } from 'react'
import { Store } from '@tanstack/react-store'

import type { Theme, ThemeStoreState } from '@/features/abstractions/theme/models'

/**
 * @description Context for sharing the theme store
 */
export const ThemeContext = createContext<Store<ThemeStoreState> | null>(null)

export interface ThemeProviderProps {
  initialTheme: Theme
  children: React.ReactNode
}

/**
 * @description Provider component that initializes and shares the theme store
 * @param initialTheme - The initial theme value from SSR hydration
 * @param children - Child components
 */
export function ThemeProvider({ initialTheme, children }: ThemeProviderProps) {
  const store = new Store<ThemeStoreState>({ theme: initialTheme })

  return <ThemeContext.Provider value={store}>{children}</ThemeContext.Provider>
}
