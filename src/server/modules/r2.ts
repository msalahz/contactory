import { env } from 'cloudflare:workers'

export async function uploadToR2(blob: Blob, key: string) {
  const { CONTACTORY_R2_BUCKET, R2_PUBLIC_URL } = env
  await CONTACTORY_R2_BUCKET.put(key, blob)
  return new URL(key, R2_PUBLIC_URL)
}

export function deleteFromR2(key: string) {
  // eslint-disable-next-line drizzle/enforce-delete-with-where
  return env.CONTACTORY_R2_BUCKET.delete(key)
}
