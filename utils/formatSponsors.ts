export interface Sponsor {
  id: number;
  name: string;
  level: string;
  image: {
    url: string;
  };
  website: string;
}

export interface FormattedSponsor {
  id: number;
  name: string;
  logo: string;
  website?: string;
}

export interface SponsorTier {
  tierName: string;
  tierDescription: string;
  sponsors: FormattedSponsor[];
}

export const formatSponsors = (
  sponsors: Sponsor[],
  useTiers?: boolean,
  returnEmptyTiers?: boolean
): SponsorTier[] | FormattedSponsor[] => {
  if (!sponsors) return [];
  if (!useTiers) {
    return sponsors.map((sponsor) => ({
      id: sponsor.id,
      name: sponsor.name,
      logo: sponsor?.image?.url,
      website: sponsor?.website,
    }));
  }
  const tiers = {
    platinum: { name: "Platinum Sponsors", description: "" },
    gold: { name: "Gold Sponsors", description: "" },
    silver: { name: "Silver Sponsors", description: "" },
    bronze: { name: "Bronze Sponsors", description: "" },
    other: { name: "Other Sponsors", description: "" },
  };

  const groupedSponsors = sponsors.reduce((acc, sponsor) => {
    const level = sponsor.level.toLowerCase();
    if (!acc[level]) {
      acc[level] = [];
    }

    acc[level].push({
      id: sponsor.id,
      name: sponsor.name,
      logo: sponsor?.image?.url,
      website: sponsor?.website,
    });

    return acc;
  }, {} as Record<string, FormattedSponsor[]>);

  let formattedSponsors: SponsorTier[];

  if (returnEmptyTiers) {
    formattedSponsors = Object.keys(tiers).map((level) => ({
      tierName: tiers[level as keyof typeof tiers].name,
      tierDescription: tiers[level as keyof typeof tiers].description,
      sponsors: groupedSponsors[level] || [],
    }));
  } else {
    formattedSponsors = Object.entries(groupedSponsors).map(
      ([level, sponsors]) => ({
        tierName: tiers[level as keyof typeof tiers].name,
        tierDescription: tiers[level as keyof typeof tiers].description,
        sponsors,
      })
    );
  }

  return formattedSponsors.sort((a, b) => {
    const tierOrder = [
      "Platinum Sponsors",
      "Gold Sponsors",
      "Silver Sponsors",
      "Bronze Sponsors",
      "Other Sponsors",
    ];
    return tierOrder.indexOf(a.tierName) - tierOrder.indexOf(b.tierName);
  });
};
