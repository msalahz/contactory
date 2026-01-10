// src/start.ts
import { createStart } from '@tanstack/react-start'
import { preferencesMiddleware } from '@/server/middlewares/preferences'

export const startInstance = createStart(() => ({
  requestMiddleware: [preferencesMiddleware],
}))
