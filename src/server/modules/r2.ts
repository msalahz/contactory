import { env } from 'cloudflare:workers'

export function getR2Url(key: string) {
  return new URL(key, env.R2_PUBLIC_URL)
}

export function getUserAvatarR2KeyFromUrl(url: string) {
  return `avatars/${url.split('avatars/')[1]}`
}

export async function uploadToR2(blob: Blob, key: string) {
  const { CONTACTORY_R2_BUCKET } = env
  await CONTACTORY_R2_BUCKET.put(key, blob)
  return getR2Url(key)
}

export function deleteFromR2(key: string) {
  const { CONTACTORY_R2_BUCKET } = env
  // eslint-disable-next-line drizzle/enforce-delete-with-where
  return CONTACTORY_R2_BUCKET.delete(key)
}
