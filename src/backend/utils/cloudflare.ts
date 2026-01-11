import { v7 as uuidv7 } from 'uuid'

export function extractR2ObjectKey(url: string, prefix: string) {
  return `${prefix}/${url.split(`${prefix}/`)[1]}`
}

export function generateR2ObjectKey(prefix: string, id: string, ext: string) {
  return `${prefix}/${id}${uuidv7()}.${ext}`
}
