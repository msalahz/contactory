import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import type { ClassValue } from 'clsx'

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs))
}

export function noop(): void
export function noop(): Promise<void>
export function noop(): Promise<boolean>
export function noop(): void | Promise<void | boolean> {
  // do nothing or return Promise.resolve() based on context
  return Promise.resolve()
}
