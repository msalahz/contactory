import { useState } from 'react'
import type { Theme } from '@/server/schemas/theme'

export interface PrefersColorSchemeReturn {
  prefersColorScheme: Exclude<Theme, 'system'>
}

export function usePrefersColorScheme(): PrefersColorSchemeReturn {
  const [prefersDarkScheme, setPrefersDarkScheme] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false,
  )

  if (typeof window !== 'undefined') {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      setPrefersDarkScheme(e.matches)
    })
  }

  return { prefersColorScheme: prefersDarkScheme ? 'dark' : 'light' }
}
