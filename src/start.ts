// src/start.ts
import { createStart } from '@tanstack/react-start'
import { preferencesMiddleware } from '@/backend/middlewares/preferences'

export const startInstance = createStart(() => ({
  requestMiddleware: [preferencesMiddleware],
}))
