export function extractR2ObjectKey(url: string) {
  return `avatars/${url.split('avatars/')[1]}`
}
