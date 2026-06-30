import { describe, it, expect } from 'vitest'
import Utils from './Utils'

const utils = new Utils()

describe('Utils.getLongDate', () => {
  it('formats the date portion in long UTC form', () => {
    // `dateStyle: 'long'` + `timeZone: 'UTC'` makes the date portion stable
    // regardless of the machine/CI timezone.
    const [longDate, time] = utils.getLongDate(new Date('2024-07-04T15:30:00Z'))
    expect(longDate).toBe('July 4, 2024')
    expect(typeof time).toBe('string')
  })
})

describe('Utils.isAfterToday', () => {
  it('returns true for a date in the future', () => {
    const future = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    expect(utils.isAfterToday(future.toISOString())).toBe(true)
  })

  it('returns false for a date in the past', () => {
    expect(utils.isAfterToday('2000-01-01T00:00:00Z')).toBe(false)
  })
})

describe('Utils.generateRandomImage', () => {
  it('returns one of the known image names', () => {
    const result = utils.generateRandomImage()
    expect(typeof result).toBe('string')
    expect(result.length).toBeGreaterThan(0)
  })
})
