// Single source of truth for deriving a match result from the Bombers' point of
// view. Previously NextUpSection (scores → W/L, no tie) and MatchCard (winner
// relation only → TIE) each derived this differently and contradicted each
// other for the same match. Everything routes through here now.

export type MatchOutcome = 'win' | 'loss' | 'tie' | null

/** True when a team name is (any variant of) the St. Louis Bombers. */
export function isBombers(name?: string | null): boolean {
  return !!name && name.toLowerCase().includes('bombers')
}

/**
 * Normalize a Strapi score (string | number | null | '') to a number, or null
 * when it isn't a real value. `0` is a valid score and stays `0`.
 */
export function parseScore(score: unknown): number | null {
  if (score == null || score === '') return null
  const n = Number(score)
  return Number.isFinite(n) ? n : null
}

/**
 * True when a game was called off: the explicit `cancelled` flag on the game
 * or its parent tournament, or the legacy convention that predates the flag
 * (marked finished with no scores and no winner relation).
 */
export function isGameCancelled(game: any): boolean {
  if (!game) return false
  if (game.cancelled || game.tournament?.cancelled) return true
  return (
    !!game.finished &&
    parseScore(game.home_score) == null &&
    parseScore(game.away_score) == null &&
    game.winner?.id == null
  )
}

/**
 * Derive win/loss/tie for the Bombers:
 *   1. Cancelled games have no outcome — they never count toward a record.
 *   2. If both scores are present, compare them (source of truth).
 *   3. Otherwise fall back to the CMS `winner` relation.
 *   4. Otherwise return null (indeterminate) — callers render "–"/no badge
 *      rather than inventing a 0–0 loss or a phantom tie.
 */
export function getMatchOutcome(game: any): MatchOutcome {
  if (!game) return null
  if (game.cancelled || game.tournament?.cancelled) return null

  const bombersHome = isBombers(game.home?.name)
  const bombersAway = isBombers(game.away?.name)
  if (!bombersHome && !bombersAway) return null

  const bombersScore = parseScore(
    bombersHome ? game.home_score : game.away_score,
  )
  const oppScore = parseScore(bombersHome ? game.away_score : game.home_score)

  if (bombersScore != null && oppScore != null) {
    if (bombersScore > oppScore) return 'win'
    if (bombersScore < oppScore) return 'loss'
    return 'tie'
  }

  if (game.winner?.id != null) {
    return isBombers(game.winner?.name) ? 'win' : 'loss'
  }

  return null
}
