import { z } from 'zod'
import type { setCookie } from '@tanstack/react-start/server'

export const COOKIE_OPTIONS: Parameters<typeof setCookie>[2] = {
  path: '/',
  maxAge: 365 * 24 * 60 * 60, // 1 year
  secure: true,
  httpOnly: true,
  sameSite: 'lax',
}

export const THEME_DEFAULT = 'dark'
export const THEME_COOKIE_NAME = 'theme'
export const themeSchema = z.union([z.literal('light'), z.literal('dark')])
export type Theme = z.infer<typeof themeSchema>

export const LANGUAGE_DEFAULT = 'en'
export const LANGUAGE_COOKIE_NAME = 'language'
export const languageSchema = z.union([z.literal('en'), z.literal('ar')])
export type Language = z.infer<typeof languageSchema>

export const directionSchema = z.union([z.literal('ltr'), z.literal('rtl')])
export type Direction = z.infer<typeof directionSchema>
