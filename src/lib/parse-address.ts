// Matches a 2-letter US state abbreviation near the end of an address string,
// optionally followed by a ZIP code: "Chicago, IL" or "Chicago, IL 60601"
const STATE_RE = /\b([A-Z]{2})\b(?:\s+\d{5}(?:-\d{4})?)?\s*$/

// Matches the city segment immediately before ", ST [ZIP]"
const CITY_RE = /([^,]+),\s*[A-Z]{2}\b(?:\s+\d{5}(?:-\d{4})?)?\s*$/

export function parseState(address: string | null | undefined): string | null {
  if (!address) return null
  const match = address.match(STATE_RE)
  return match ? match[1] : null
}

export function parseCity(address: string | null | undefined): string | null {
  if (!address) return null
  const match = address.match(CITY_RE)
  return match ? match[1].trim() : null
}
