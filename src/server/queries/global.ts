import { createServerFn } from '@tanstack/react-start'
import { getInitialPreferences } from '@/server/modules/global'

export const getInitialPreferencesFn = createServerFn().handler(() => {
  return getInitialPreferences()
})
