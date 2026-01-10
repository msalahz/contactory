import { v7 as uuidv7 } from 'uuid'
import { getRequest } from '@tanstack/react-start/server'

import { redirect } from '@tanstack/react-router'
import type { User } from '@/integrations/better-auth/authClient'

import { getAuth } from '@/integrations/better-auth/auth'
import { deleteR2Object, uploadR2Object } from '@/backend/lib/storage'
import { extractR2ObjectKey } from '@/backend/utils/storage'

export async function findAuthSession() {
  const request = getRequest()
  const auth = getAuth()
  return await auth.api.getSession({ headers: request.headers })
}

export async function findAuthUser() {
  const session = await findAuthSession()
  return session?.user ?? null
}

export async function uploadUserAvatar(avatar: File, userId: User['id']) {
  const key = `avatars/${userId}${uuidv7()}-user-avatar.${avatar.type.split('/')[1]}`
  const file = new File([avatar], avatar.name, { type: avatar.type })
  // Return the public URL for the uploaded avatar
  return await uploadR2Object(file, key)
}

export async function deleteUserAvatar(avatarUrl: string) {
  const key = extractR2ObjectKey(avatarUrl)
  return await deleteR2Object(key)
}

export async function requireAuth() {
  const session = await findAuthSession()
  // if the user is not logged in
  if (!session) {
    throw redirect({ to: '/sign-in' })
  }
  return session
}

export async function requireAdmin() {
  const session = await findAuthSession()

  const roleString = session?.user?.role || undefined

  const roles = roleString
    ?.split(',')
    .map((r) => r.trim())
    .filter(Boolean)

  // if the user is not logged in or is not an admin
  if (!session || !roles?.includes('admin')) {
    throw redirect({ to: '/' })
  }
  return session
}
