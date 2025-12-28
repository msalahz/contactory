import { createContext } from 'react'
import { Store } from '@tanstack/react-store'

import type { Theme } from '@/server/schemas/theme'

export interface ThemeStoreState {
  theme: Theme
}

export const ThemeContext = createContext<Store<ThemeStoreState> | null>(null)

export interface ThemeProviderProps {
  initialTheme: Theme
  children: React.ReactNode
}

export function ThemeProvider({ initialTheme, children }: ThemeProviderProps) {
  const store = new Store<ThemeStoreState>({ theme: initialTheme })

  return <ThemeContext.Provider value={store}>{children}</ThemeContext.Provider>
}
