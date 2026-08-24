export type Confidence = "confirmed/current" | "estimated" | "stale" | "unavailable" | "needs verification";
export type VeganSupport = "strong vegan support" | "adequate vegan support" | "requires planning" | "problematic";

export const beautifulWeek = {
  id: "beautiful-week",
  label: "Beautiful Week",
  target: { low: 5000, high: 6000, currency: "USD", travelers: 2, ceilingIsHard: true },
  updatedAt: "2026-08-24",
  assumptions: {
    duration: "Approximately seven nights",
    contingency: 300,
    note: "Planning estimates only. Reprice every component together before booking; no property total is authoritative until taxes, mandatory fees, room category, occupancy and cancellation terms are verified.",
  },
  destinations: [
    {
      id: "cabo", name: "Los Cabos", dates: "2026-10-13/2026-10-21", flexibleDates: "2026-10-14/2026-10-21",
      hero: "/places/casa-rayrae.webp", alt: "A terrace opening toward the blue water and hills of Los Cabos",
      eyebrow: "The trip we never took", title: "Los Cabos", stayName: "Montecristo Estates",
      publicCopy: "Once, this place was almost part of our story. We held the possibility for years, but somehow never arrived. Maybe the loveliest thing about going now would be finishing a sentence we began a long time ago.",
      moments: ["A private pool above the Pacific", "Slow mornings and nowhere we have to be", "One long afternoon at Flora Farms"],
      properties: [
        { name: "Montecristo Estates", role: "primary", inventory: "canonical resort + private-owner inventory", source: "https://www.pueblobonito.com/resorts/montecristo-estates", confidence: "needs verification" as Confidence, vegan: "requires planning" as VeganSupport, note: "Verify whether the quote is room-only or all-inclusive and whether private inventory carries equivalent resort access." },
        { name: "Hotel El Ganzo", role: "San José del Cabo candidate", inventory: "canonical hotel inventory", source: "https://www.elganzo.com/reservations/oceanview-king", confidence: "needs verification" as Confidence, vegan: "requires planning" as VeganSupport, note: "Adults-only Ocean View King matches the room brief. Published policy permits free cancellation through eight days before arrival; verify the selected October rate follows that policy and capture its full taxes and fees." },
        { name: "Solaz, a Luxury Collection Resort, Los Cabos", role: "San José del Cabo candidate", inventory: "canonical Marriott inventory", source: "https://www.marriott.com/en-us/hotels/sjdlc-solaz-a-luxury-collection-resort-los-cabos/overview/", confidence: "needs verification" as Confidence, vegan: "requires planning" as VeganSupport, note: "Ocean View King and Panoramic Ocean View King categories fit the room brief. Verify an October refundable rate, all taxes and resort fees, Marriott Titanium benefits, and plant-based dining arrangements." },
      ],
      cost: { lodging: 2800, airfare: 900, transport: 250, meals: 1050, experiences: 450, contingency: 300, total: 5750, confidence: "estimated" as Confidence },
      monitoring: { checkedAt: "2026-08-24T16:20:00-07:00", previousTotal: null, deltaPercent: null, alert: false, availability: "Partial public inventory found", refundability: "Needs verification", summary: "Baseline established. Public search did not expose a complete refundable, all-fee quote for Montecristo or the alternate resorts, so the modeled total is unchanged." },
      flight: { origin: "PSP", destination: "SJD", cabin: "Economy baseline; first class only if total remains below ceiling", estimate: 900, confidence: "estimated" as Confidence },
      dining: ["Flora Farms — arrange vegan dishes ahead", "Acre — request a vegan dinner in advance", "Chubby Noodle Cabo — vegan-friendly options; reconfirm"],
      experiences: ["A long lunch and garden walk at Flora Farms", "A private sunset sail, if the final total allows"],
    },
    {
      id: "puerto-vallarta", name: "Puerto Vallarta", dates: "2026-10-20/2026-10-27",
      hero: "/places/casa-suhana.webp", alt: "An infinity pool terrace above the green hills of Puerto Vallarta",
      eyebrow: "Warmth, without a schedule", title: "Puerto Vallarta", stayName: "Casa Velas or Villa Premiere",
      publicCopy: "A week of garden mornings, warm evenings and dinners worth dressing for. Close enough to the city to follow our curiosity, quiet enough to let the days unfold on their own.",
      moments: ["A quiet, grown-up place to land", "Beautiful dinners close at hand", "The city whenever we feel like wandering"],
      properties: [
        { name: "Casa Velas", role: "primary", inventory: "canonical resort inventory", source: "https://www.hotelcasavelas.com/", confidence: "needs verification" as Confidence, vegan: "adequate vegan support" as VeganSupport, note: "Adults-only all-inclusive; request written vegan confirmation and full tax/fee total." },
        { name: "Villa Premiere Boutique Hotel & Romantic Getaway", role: "primary", inventory: "canonical resort inventory", source: "https://www.premiereonline.com.mx/", confidence: "needs verification" as Confidence, vegan: "adequate vegan support" as VeganSupport, note: "Verify package inclusions and plant-based dinner options before booking." },
        { name: "Garza Blanca Preserve Resort & Spa", role: "candidate", inventory: "canonical resort inventory", source: "https://www.garzablancaresort.com/puerto-vallarta", confidence: "needs verification" as Confidence, vegan: "requires planning" as VeganSupport, note: "Reprice only against a complete direct-booking total." },
      ],
      cost: { lodging: 2700, airfare: 850, transport: 180, meals: 1150, experiences: 400, contingency: 300, total: 5580, confidence: "estimated" as Confidence },
      monitoring: { checkedAt: "2026-08-24T16:20:00-07:00", previousTotal: null, deltaPercent: null, alert: false, availability: "Candidates remain listed", refundability: "Needs verification", summary: "Baseline established. King and ocean-view categories are published, but complete refundable totals for the October window were not exposed in accessible canonical results." },
      flight: { origin: "PSP", destination: "PVR", cabin: "Economy baseline; compare first class only within ceiling", estimate: 850, confidence: "estimated" as Confidence },
      dining: ["The Green Place — fully plant-based", "Veggitalia — vegan Italian", "Tintoque — arrange a vegan tasting menu ahead"],
      experiences: ["A private sunset sail on Banderas Bay", "A slow gallery-and-dinner evening in Centro"],
    },
    {
      id: "big-island", name: "Hawaiʻi — Big Island", dates: "2026-10-20/2026-10-27",
      hero: "/places/hale-naia.jpg", alt: "A pool and terrace looking across the Pacific on Hawaiʻi Island",
      eyebrow: "Seven days at island pace", title: "Hawaiʻi", stayName: "Waikoloa Beach Villas",
      publicCopy: "Ocean mornings, roads through volcanic country, and warm evenings that ask for nothing. A beautiful place to live for a week—and the freedom to drive somewhere simply because the road looks promising.",
      moments: ["Coffee in the ocean air", "A road through lava and sky", "Dinner as the sun leaves the Kohala Coast"],
      properties: [
        { name: "Waikoloa Beach Villas", role: "primary", inventory: "private-owner inventory", source: "https://waikoloabeachvillas.com/", confidence: "needs verification" as Confidence, vegan: "requires planning" as VeganSupport, note: "Verify exact unit, cleaning fee, Hawaiʻi taxes, card fee, cancellation terms and 2026 resort access." },
        { name: "Waikoloa Beach Marriott Resort & Spa", role: "hotel candidate", inventory: "canonical hotel inventory", source: "https://www.marriott.com/en-us/hotels/koamc-waikoloa-beach-marriott-resort-and-spa/overview/", confidence: "needs verification" as Confidence, vegan: "requires planning" as VeganSupport, note: "Track only if an all-in direct rate fits the complete-trip ceiling." },
        { name: "The Westin Hāpuna Beach Resort", role: "hotel candidate", inventory: "canonical hotel inventory", source: "https://www.marriott.com/en-us/hotels/koawi-the-westin-hapuna-beach-resort/overview/", confidence: "needs verification" as Confidence, vegan: "requires planning" as VeganSupport, note: "Monitor for a qualifying direct rate; include parking and resort fees." },
      ],
      cost: { lodging: 2200, airfare: 1150, transport: 650, meals: 1050, experiences: 450, contingency: 300, total: 5800, confidence: "estimated" as Confidence },
      monitoring: { checkedAt: "2026-08-24T16:20:00-07:00", previousTotal: null, deltaPercent: null, alert: false, availability: "October inventory observed", refundability: "Needs verification", summary: "Baseline established. Third-party Waikoloa units showed October nightly inventory, but refundability and full taxes/fees were not verified, so those rates did not replace the planning total." },
      flight: { origin: "PSP/LAX/ONT", destination: "KOA", cabin: "Economy with practical connection; compare positioning to LAX/ONT", estimate: 1150, confidence: "estimated" as Confidence },
      dining: ["Journey Café — plant-based in Kailua-Kona", "Herbivores — vegan-friendly casual meals", "‘Ulu Ocean Grill — request the dedicated vegan menu"],
      experiences: ["Hawaiʻi Volcanoes National Park day drive", "A manta-ray evening or Kohala sunset sail"],
    },
  ],
} as const;

export const extraordinary = {
  id: "extraordinary", label: "Extraordinary", target: "$10K–$12K", preserved: true, updatedAt: "2026-08-24",
  note: "Existing approved collection. Its public presentation and behavior remain unchanged.",
  properties: [
    { destination: "Puerto Vallarta", name: "Casa Suhana", dates: "2026-10-20/2026-10-27", lodging: 7200, airfare: 1200, transport: 250, meals: 1450, experiences: 550, contingency: 500, total: 11150, confidence: "needs verification" as Confidence, inventory: "private villa inventory", dining: "strong vegan support" as VeganSupport, source: "https://www.casasuhana.com/", note: "Verify seven-night villa quote, staffing, meal inclusions, taxes, service charge, deposit and cancellation terms.", monitoring: { checkedAt: "2026-08-24T16:20:00-07:00", previousTotal: null, deltaPercent: null, alert: false, summary: "Baseline established; complete refundable villa total still requires direct verification." } },
    { destination: "Los Cabos", name: "Casa Rayrae", dates: "2026-10-13/2026-10-20", lodging: 7000, airfare: 1200, transport: 350, meals: 1500, experiences: 500, contingency: 500, total: 11050, confidence: "needs verification" as Confidence, inventory: "private villa inventory", dining: "adequate vegan support" as VeganSupport, source: "https://www.casarayrae.com/", note: "Verify canonical listing, occupancy terms, mandatory service charges, taxes and cancellation terms.", monitoring: { checkedAt: "2026-08-24T16:20:00-07:00", previousTotal: null, deltaPercent: null, alert: false, summary: "Baseline established; complete refundable villa total still requires direct verification." } },
    { destination: "Hawaiʻi — Big Island", name: "Hale Naiʻa", dates: "2026-10-20/2026-10-27", lodging: 7200, airfare: 1500, transport: 700, meals: 1100, experiences: 450, contingency: 500, total: 11450, confidence: "needs verification" as Confidence, inventory: "private-home inventory", dining: "adequate vegan support" as VeganSupport, source: "https://www.luxurybigisland.com/", note: "Verify exact home and canonical manager, Hawaiʻi taxes, cleaning and management fees, damage terms and cancellation policy.", monitoring: { checkedAt: "2026-08-24T16:20:00-07:00", previousTotal: null, deltaPercent: null, alert: false, summary: "Baseline established; exact home availability and refundable all-fee total remain unverified." } },
    { destination: "Moʻorea", name: "The Lagoon House", dates: "2026-10-21/2026-10-27", lodging: 5200, airfare: 3600, transport: 650, meals: 900, experiences: 450, contingency: 600, total: 11400, confidence: "needs verification" as Confidence, inventory: "private-villa inventory", dining: "requires planning" as VeganSupport, source: "https://www.airbnb.com/", note: "Confirm exact Maharepa listing, host identity, total fees, ferry logistics and cancellation terms. Never treat unverified inventory as authoritative.", monitoring: { checkedAt: "2026-08-24T16:20:00-07:00", previousTotal: null, deltaPercent: null, alert: false, summary: "Baseline established; exact canonical inventory and refundable total remain unverified." } },
    { destination: "Moʻorea", name: "Sofitel Kia Ora · Horizon Overwater Villa", dates: "2026-10-21/2026-10-27", lodging: 6200, airfare: 3600, transport: 650, meals: 500, experiences: 300, contingency: 600, total: 11850, confidence: "needs verification" as Confidence, inventory: "canonical resort inventory", dining: "requires planning" as VeganSupport, source: "https://www.sofitel-moorea-kiaora.com/", note: "Verify Horizon room category, meal-plan inclusions, taxes, resort charges, transfers and cancellation terms directly with Sofitel.", monitoring: { checkedAt: "2026-08-24T16:20:00-07:00", previousTotal: null, deltaPercent: null, alert: false, summary: "Baseline established; Horizon category refundable all-fee total remains unverified." } },
  ],
} as const;
