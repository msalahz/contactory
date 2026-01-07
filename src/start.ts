// src/start.ts
import { createStart } from '@tanstack/react-start'
import { preferencesMiddleware } from '@/server/middlewares/global'

export const startInstance = createStart(() => ({
  requestMiddleware: [preferencesMiddleware],
}))
