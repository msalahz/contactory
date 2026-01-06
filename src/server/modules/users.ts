import { v7 as uuidv7 } from 'uuid'
import { uploadToR2 } from '@/server/modules/r2'

export async function uploadUserAvatarToR2(avatar: File) {
  const key = `avatars/${uuidv7()}.${avatar.type.split('/')[1]}`
  const file = new File([avatar], avatar.name, { type: avatar.type })
  // Return the public URL for the uploaded avatar
  return await uploadToR2(file, key)
}
