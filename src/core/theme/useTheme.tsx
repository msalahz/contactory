import { useContext } from 'react'
import { useStore } from '@tanstack/react-store'
import { useServerFn } from '@tanstack/react-start'
import { useMutation } from '@tanstack/react-query'

import type { Theme } from '@/core/schemas'

import { ThemeContext } from '@/core/theme/ThemeContext'
import { setThemeCookieFn } from '@/backend/mutations/preferences'

/**
 * @description Hook to access and update the theme from the core store
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
