import { useContext } from 'react'
import { useStore } from '@tanstack/react-store'
import { useServerFn } from '@tanstack/react-start'
import { useMutation } from '@tanstack/react-query'

import type { Theme } from '@/server/schemas/theme'

import { ThemeContext } from '@/shared/theme/themeContext'
import { setThemeCookieFn } from '@/server/mutations/setThemeCookieFn'

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

  return {
    theme,
    setTheme,
  }
}
