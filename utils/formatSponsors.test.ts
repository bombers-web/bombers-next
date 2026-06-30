import { describe, it, expect } from 'vitest'
import { formatSponsors, Sponsor, SponsorTier } from './formatSponsors'

const sponsor = (
  id: number,
  name: string,
  level: string,
  url = `https://${name}.com`,
): Sponsor => ({
  id,
  name,
  level,
  image: { url: `/${name}.png` },
  website: url,
})

describe('formatSponsors', () => {
  it('returns an empty array for falsy input', () => {
    expect(formatSponsors(undefined as unknown as Sponsor[])).toEqual([])
  })

  it('returns a flat list (id/name/logo/website) when useTiers is falsy', () => {
    const result = formatSponsors([sponsor(1, 'Acme', 'gold')])
    expect(result).toEqual([
      {
        id: 1,
        name: 'Acme',
        logo: '/Acme.png',
        website: 'https://Acme.com',
      },
    ])
  })

  it('groups sponsors by level and sorts tiers platinum→other', () => {
    const result = formatSponsors(
      [
        sponsor(1, 'Bronzey', 'bronze'),
        sponsor(2, 'Platty', 'platinum'),
        sponsor(3, 'Goldy', 'gold'),
      ],
      true,
    ) as SponsorTier[]

    expect(result.map((t) => t.tierName)).toEqual([
      'Platinum Sponsors',
      'Gold Sponsors',
      'Bronze Sponsors',
    ])
    expect(result[0].sponsors).toHaveLength(1)
    expect(result[0].sponsors[0].name).toBe('Platty')
  })

  it('is case-insensitive on the level field', () => {
    const result = formatSponsors(
      [sponsor(1, 'Loud', 'GOLD')],
      true,
    ) as SponsorTier[]
    expect(result).toHaveLength(1)
    expect(result[0].tierName).toBe('Gold Sponsors')
  })

  it('returns all five tiers (empty where none) when returnEmptyTiers is set', () => {
    const result = formatSponsors(
      [sponsor(1, 'Goldy', 'gold')],
      true,
      true,
    ) as SponsorTier[]

    expect(result.map((t) => t.tierName)).toEqual([
      'Platinum Sponsors',
      'Gold Sponsors',
      'Silver Sponsors',
      'Bronze Sponsors',
      'Other Sponsors',
    ])
    const gold = result.find((t) => t.tierName === 'Gold Sponsors')
    expect(gold?.sponsors).toHaveLength(1)
    const platinum = result.find((t) => t.tierName === 'Platinum Sponsors')
    expect(platinum?.sponsors).toEqual([])
  })
})
