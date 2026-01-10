import { createServerFn } from '@tanstack/react-start'

import { getInitialPreferences } from '@/server/lib/preferences'

export const getInitialPreferencesFn = createServerFn().handler(() => {
  return getInitialPreferences()
})
