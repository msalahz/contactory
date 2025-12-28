import { z } from 'zod'

export const themeSchema = z.union([z.literal('light'), z.literal('dark')])

export type Theme = z.infer<typeof themeSchema>
