import { describe, expect, test } from 'vitest'
import something from '.'

/**
 * FIXME: Test your code
 */
describe.concurrent('index', () => {
  test('should be `true`', async () => {
    expect(something).toBe(true)
  })
})
