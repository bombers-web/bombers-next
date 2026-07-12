import { describe, it, expect } from 'vitest'
import { isTimeTBD, formatMatchTime } from './formatTime'

describe('isTimeTBD', () => {
  it('is true when the time is midnight UTC (no time entered)', () => {
    expect(isTimeTBD('2026-05-22T00:00:00.000Z')).toBe(true)
  })

  it('is true for an unparseable/empty date', () => {
    expect(isTimeTBD('')).toBe(true)
    expect(isTimeTBD('not a date')).toBe(true)
  })

  it('is false when a real time is present', () => {
    expect(isTimeTBD('2026-05-22T19:00:00.000Z')).toBe(false)
    expect(isTimeTBD('2026-05-22T00:30:00.000Z')).toBe(false)
  })
})

describe('formatMatchTime', () => {
  it('returns "Time TBD" for a midnight-UTC (unset) time', () => {
    expect(formatMatchTime('2026-05-22T00:00:00.000Z')).toBe('Time TBD')
  })

  it('formats a real time', () => {
    // 19:00 UTC — formatted in UTC to be deterministic across environments.
    expect(
      formatMatchTime('2026-05-22T19:00:00.000Z', {
        hour: 'numeric',
        minute: '2-digit',
        timeZone: 'UTC',
      }),
    ).toBe('7:00 PM')
  })
})
