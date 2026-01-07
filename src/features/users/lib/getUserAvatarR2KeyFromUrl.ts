export function getUserAvatarR2KeyFromUrl(url: string) {
  return `avatars/${url.split('avatars/')[1]}`
}
