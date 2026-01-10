import { z } from 'zod'

export const USER_AVATAR_MAX_IMAGE_FILE_SIZE = 1000 * 1000 * 5 // 5 MB
export const USER_AVATAR_ACCEPTED_IMAGE_FILE_TYPE = 'image/*'

export const userAvatarFileSchema = z
  .file()
  .refine((file) => file.size > 0, 'Media file is too small (min 1 byte)')
  .refine(
    (file) => file.size < USER_AVATAR_MAX_IMAGE_FILE_SIZE,
    'Image file is too large (max 5MB)',
  )
  .refine(
    (file) => file.type.startsWith(USER_AVATAR_ACCEPTED_IMAGE_FILE_TYPE.replace('*', '')),
    'Unsupported image file type',
  )
