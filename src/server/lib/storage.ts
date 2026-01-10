import { env } from 'cloudflare:workers'

export async function uploadR2Object(blob: Blob, key: string) {
  await env.CONTACTORY_R2_BUCKET.put(key, blob)
  return new URL(key, env.R2_PUBLIC_URL)
}

export function deleteR2Object(key: string) {
  // eslint-disable-next-line drizzle/enforce-delete-with-where
  return env.CONTACTORY_R2_BUCKET.delete(key)
}
