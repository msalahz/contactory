import { createServerFn } from '@tanstack/react-start'

import { getInitialPreferences } from '@/server/modules/shared'

export const getInitialPreferencesFn = createServerFn().handler(() => {
  return getInitialPreferences()
})
