import { z } from 'zod'

/**
 * @description Schema for validating the theme cookie value.
 */
export const themeSchema = z.union([z.literal('light'), z.literal('dark')])

/**
 * @description Type representing the theme, inferred from the theme schema.
 */
export type Theme = z.infer<typeof themeSchema>

/**
 * @description State of the theme store.
 * @property theme - The current theme value. Can be either 'light' or 'dark'.
 */
export interface ThemeStoreState {
  theme: Theme
}
