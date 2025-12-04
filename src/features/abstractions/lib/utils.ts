import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import type { ClassValue } from 'clsx'

import { senv } from '@/env'

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs))
}

// SERVER ONLY FUNCTION
export function isDevServerOnly() {
  return senv.ENV === 'development'
}
// SERVER ONLY FUNCTION
export function isProdServerOnly() {
  return senv.ENV === 'production'
}
