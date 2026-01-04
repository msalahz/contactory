import { describe, expect, it } from 'vitest'

import { convertFileToBase64 } from './convertFileToBase64'

describe('convertFileToBase64', () => {
  it('should convert a file to base64 string', async () => {
    const fileContent = 'Hello, World!'
    const file = new File([fileContent], 'test.txt', { type: 'text/plain' })

    const result = await convertFileToBase64(file)

    expect(result).toBeTypeOf('string')
    expect(result).toContain('data:text/plain;base64,')
  })

  it('should handle image files', async () => {
    const imageData = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]) // PNG header bytes
    const file = new File([imageData], 'test.png', { type: 'image/png' })

    const result = await convertFileToBase64(file)

    expect(result).toBeTypeOf('string')
    expect(result).toContain('data:image/png;base64,')
  })

  it('should handle empty files', async () => {
    const file = new File([], 'empty.txt', { type: 'text/plain' })

    const result = await convertFileToBase64(file)

    expect(result).toBe('data:text/plain;base64,')
  })

  it('should reject when FileReader encounters an error', async () => {
    const file = new File(['test'], 'test.txt', { type: 'text/plain' })

    const originalFileReader = global.FileReader
    const mockError = new Error('Read error')

    class MockFileReader {
      result: string | null = null
      onload: (() => void) | null = null
      onerror: ((error: Error) => void) | null = null

      readAsDataURL() {
        setTimeout(() => {
          if (this.onerror) {
            this.onerror(mockError)
          }
        }, 0)
      }
    }

    global.FileReader = MockFileReader as unknown as typeof FileReader

    await expect(convertFileToBase64(file)).rejects.toEqual(mockError)

    global.FileReader = originalFileReader
  })
})
