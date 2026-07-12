// Strapi stores an event/match with "no time entered" as midnight (T00:00:00Z).
// Rendering that verbatim produces a misleading "12:00 AM"; instead we detect
// midnight-UTC and surface "Time TBD". A real fixture at exactly 00:00 UTC is
// vanishingly rare for this club, so the tradeoff is acceptable.

export const TIME_TBD = 'Time TBD'

export function isTimeTBD(date: string | Date | number): boolean {
  const d = new Date(date)
  if (isNaN(d.getTime())) return true
  return d.getUTCHours() === 0 && d.getUTCMinutes() === 0
}

/**
 * Format a fixture time, or return "Time TBD" when no time was entered.
 * `opts` are passed to `toLocaleTimeString` so callers keep their existing
 * formatting (12-hour, etc.).
 */
export function formatMatchTime(
  date: string | Date | number,
  opts: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: '2-digit' },
): string {
  if (isTimeTBD(date)) return TIME_TBD
  return new Date(date).toLocaleTimeString('en-US', opts)
}
