import { describe, it, expect } from 'vitest'
import {
  isBombers,
  parseScore,
  getMatchOutcome,
  isGameCancelled,
} from './matchOutcome'

const team = (name: string, id = 1) => ({ id, name })

describe('isBombers', () => {
  it('matches any casing/variant containing "bombers"', () => {
    expect(isBombers('St. Louis Bombers')).toBe(true)
    expect(isBombers('St. Louis Bombers DII')).toBe(true)
    expect(isBombers('bombers')).toBe(true)
  })

  it('is false for opponents and empty input', () => {
    expect(isBombers('Chicago Lions')).toBe(false)
    expect(isBombers('')).toBe(false)
    expect(isBombers(undefined)).toBe(false)
    expect(isBombers(null)).toBe(false)
  })
})

describe('parseScore', () => {
  it('parses numeric strings and numbers', () => {
    expect(parseScore('55')).toBe(55)
    expect(parseScore(7)).toBe(7)
    expect(parseScore('0')).toBe(0)
  })

  it('returns null for absent/empty/non-numeric values', () => {
    expect(parseScore(null)).toBeNull()
    expect(parseScore(undefined)).toBeNull()
    expect(parseScore('')).toBeNull()
    expect(parseScore('n/a')).toBeNull()
  })
})

describe('getMatchOutcome', () => {
  it('derives from scores when both are present (Bombers home)', () => {
    const game = {
      home: team('St. Louis Bombers'),
      away: team('Metropolis', 2),
      home_score: '55',
      away_score: '7',
    }
    // 55-7 with winner relation unset must be a WIN, not a TIE.
    expect(getMatchOutcome(game)).toBe('win')
  })

  it('derives from scores when Bombers are the away side', () => {
    const game = {
      home: team('Wichita Barbarians', 2),
      away: team('St. Louis Bombers'),
      home_score: '12',
      away_score: '20',
    }
    expect(getMatchOutcome(game)).toBe('win')
  })

  it('returns loss when Bombers score lower', () => {
    const game = {
      home: team('St. Louis Bombers'),
      away: team('Chicago Lions', 2),
      home_score: '10',
      away_score: '24',
    }
    expect(getMatchOutcome(game)).toBe('loss')
  })

  it('returns tie for equal scores', () => {
    const game = {
      home: team('St. Louis Bombers'),
      away: team('Chicago Lions', 2),
      home_score: '17',
      away_score: '17',
    }
    expect(getMatchOutcome(game)).toBe('tie')
  })

  it('falls back to the winner relation when scores are absent', () => {
    const game = {
      home: team('St. Louis Bombers'),
      away: team('Chicago Lions', 2),
      home_score: null,
      away_score: null,
      winner: team('St. Louis Bombers'),
    }
    expect(getMatchOutcome(game)).toBe('win')
    const lost = { ...game, winner: team('Chicago Lions', 2) }
    expect(getMatchOutcome(lost)).toBe('loss')
  })

  it('returns null when indeterminate (finished, no scores, no winner)', () => {
    const game = {
      home: team('St. Louis Bombers'),
      away: team('Chicago Lions', 2),
      home_score: null,
      away_score: null,
      winner: null,
      finished: true,
    }
    // Must NOT default a scoreless finished match to a loss or a tie.
    expect(getMatchOutcome(game)).toBeNull()
  })

  it('returns null for cancelled games even when scores exist', () => {
    const game = {
      home: team('St. Louis Bombers'),
      away: team('Chicago Lions', 2),
      home_score: '55',
      away_score: '7',
      cancelled: true,
    }
    // A cancelled game must never count as a win/loss, whatever data is set.
    expect(getMatchOutcome(game)).toBeNull()
  })

  it('returns null when the parent tournament is cancelled', () => {
    const game = {
      home: team('St. Louis Bombers'),
      away: team('Chicago Lions', 2),
      home_score: '55',
      away_score: '7',
      tournament: { id: 1, cancelled: true },
    }
    expect(getMatchOutcome(game)).toBeNull()
  })

  it('returns null when neither side is the Bombers, or game is missing', () => {
    expect(getMatchOutcome(null)).toBeNull()
    expect(
      getMatchOutcome({
        home: team('A', 1),
        away: team('B', 2),
        home_score: '3',
        away_score: '1',
      }),
    ).toBeNull()
  })
})

describe('isGameCancelled', () => {
  it('is true for the explicit flag on the game or its tournament', () => {
    expect(isGameCancelled({ cancelled: true })).toBe(true)
    expect(isGameCancelled({ tournament: { cancelled: true } })).toBe(true)
  })

  it('is true for the legacy convention: finished, no scores, no winner', () => {
    expect(
      isGameCancelled({
        finished: true,
        home_score: null,
        away_score: null,
        winner: null,
      }),
    ).toBe(true)
  })

  it('is false for played games and unfinished fixtures', () => {
    expect(isGameCancelled(null)).toBe(false)
    expect(isGameCancelled({ finished: false })).toBe(false)
    expect(
      isGameCancelled({ finished: true, home_score: '10', away_score: '7' }),
    ).toBe(false)
    // Finished with a winner but no scores was decided, not cancelled.
    expect(
      isGameCancelled({
        finished: true,
        home_score: null,
        away_score: null,
        winner: { id: 2, name: 'Chicago Lions' },
      }),
    ).toBe(false)
  })
})
