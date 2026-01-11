import { envServer } from '@/env.server'
import { envCloudflare } from '@/env.cloudflare'

export function getContactoryR2Bucket() {
  return envCloudflare.CONTACTORY_R2_BUCKET
}

export function getHyperdrive() {
  return envCloudflare.NEON_HYPERDRIVE
}

export async function uploadR2Object(key: string, blob: Blob) {
  await getContactoryR2Bucket().put(key, blob)
  return new URL(key, envServer.R2_PUBLIC_URL)
}

export function deleteR2Object(key: string) {
  // eslint-disable-next-line drizzle/enforce-delete-with-where
  return getContactoryR2Bucket().delete(key)
}
