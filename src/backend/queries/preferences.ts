import { createServerFn } from '@tanstack/react-start'

import { getInitialPreferences } from '@/backend/lib/preferences'

export const getInitialPreferencesFn = createServerFn().handler(() => {
  return getInitialPreferences()
})
