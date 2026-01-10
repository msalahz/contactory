import { describe, expect, it } from 'vitest'

import { noop } from './noop'

describe('noop', () => {
  it('should return a resolved Promise', async () => {
    const result = noop()
    expect(result).toBeInstanceOf(Promise)
    await expect(result).resolves.toBeUndefined()
  })

  it('should be callable without errors', () => {
    expect(() => noop()).not.toThrow()
  })
})
