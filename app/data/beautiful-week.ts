export type Confidence = "confirmed/current" | "estimated" | "stale" | "unavailable" | "needs verification";
export type VeganSupport = "strong vegan support" | "adequate vegan support" | "requires planning" | "problematic";

export const beautifulWeek = {
  id: "beautiful-week",
  label: "Beautiful Week",
  target: { low: 5000, high: 6000, currency: "USD", travelers: 2, ceilingIsHard: true },
  updatedAt: "2026-08-28",
  assumptions: {
    duration: "Approximately seven nights",
    contingency: 300,
    note: "Planning estimates only. Reprice every component together before booking; no property total is authoritative until taxes, mandatory fees, room category, occupancy and cancellation terms are verified.",
  },
  destinations: [
    {
      id: "cabo", name: "Los Cabos", dates: "2026-10-13/2026-10-20", flexibleDates: "2026-10-14/2026-10-21",
      hero: "/places/casa-rayrae.webp", alt: "A terrace opening toward the blue water and hills of Los Cabos",
      eyebrow: "The trip we never took", title: "Los Cabos", stayName: "Montecristo Estates",
      publicCopy: "Once, this place was almost part of our story. We held the possibility for years, but somehow never arrived. Maybe the loveliest thing about going now would be finishing a sentence we began a long time ago.",
      moments: ["A private pool above the Pacific", "Slow mornings and nowhere we have to be", "One long afternoon at Flora Farms"],
      properties: [
        { name: "Montecristo Estates", role: "primary", inventory: "canonical resort + private-owner inventory", source: "https://www.pueblobonito.com/resorts/montecristo-estates", confidence: "needs verification" as Confidence, vegan: "requires planning" as VeganSupport, note: "Verify whether the quote is room-only or all-inclusive and whether private inventory carries equivalent resort access." },
        { name: "Hotel El Ganzo", role: "San José del Cabo candidate", inventory: "canonical hotel inventory", source: "https://be.synxis.com/addons?adult=2&arrive=2026-10-13&chain=32709&child=0&currency=USD&depart=2026-10-20&hotel=46912&level=hotel&locale=en-US&productcurrency=USD&rooms=1&sbe_rc=NjBmYjZmNDctMDQyMi00NzY5LWJlYjYtNTNlYjI1ZmI4MjEz", confidence: "needs verification" as Confidence, vegan: "requires planning" as VeganSupport, note: "Unconfirmed rate for Oct 13–20: $721 per night, or $5,047 for seven nights. Comparable trip estimate: $7,997 with the existing airfare, transport, meals, experiences and contingency assumptions." },
        { name: "Solaz, a Luxury Collection Resort, Los Cabos", role: "San José del Cabo candidate", inventory: "canonical Marriott inventory", source: "https://www.marriott.com/en-us/hotels/sjdlc-solaz-a-luxury-collection-resort-los-cabos/overview/", confidence: "needs verification" as Confidence, vegan: "requires planning" as VeganSupport, note: "Ocean View King and Panoramic Ocean View King categories fit the room brief. Verify an October refundable rate, all taxes and resort fees, Marriott Titanium benefits, and plant-based dining arrangements." },
      ],
      cost: { lodging: 5992, airfare: 900, transport: 250, meals: 1050, experiences: 450, contingency: 300, total: 8942, confidence: "estimated" as Confidence },
      monitoring: { checkedAt: "2026-08-26T06:44:55-07:00", previousTotal: null, deltaPercent: null, alert: false, availability: "Qualifying room categories published; exact-week inventory unverified", refundability: "El Ganzo policy published; selected rates need verification", summary: "Canonical pages still confirm El Ganzo Ocean View King and Solaz ocean-view king categories. El Ganzo publishes free cancellation through eight days before arrival, but no complete date-specific refundable, all-fee quote was exposed; the modeled total is unchanged." },
      flight: { origin: "PSP/SAN", destination: "SJD", cabin: "First class; nonstop preferred, no more than one stop", estimate: 900, confidence: "estimated" as Confidence },
      dining: ["Flora Farms — arrange vegan dishes ahead", "Acre — request a vegan dinner in advance", "Chubby Noodle Cabo — vegan-friendly options; reconfirm"],
      experiences: ["A long lunch and garden walk at Flora Farms", "A private sunset sail, if the final total allows"],
    },
    {
      id: "puerto-vallarta", name: "Puerto Vallarta", dates: "2026-10-20/2026-10-27",
      hero: "/places/casa-suhana.webp", alt: "An infinity pool terrace above the green hills of Puerto Vallarta",
      eyebrow: "Warmth, without a schedule", title: "Puerto Vallarta", stayName: "Casa Velas",
      publicCopy: "A week of garden mornings, warm evenings and dinners worth dressing for. Close enough to the city to follow our curiosity, quiet enough to let the days unfold on their own.",
      moments: ["A quiet, grown-up place to land", "Beautiful dinners close at hand", "The city whenever we feel like wandering"],
      properties: [
        { name: "Casa Velas", role: "primary", inventory: "canonical resort inventory", source: "https://www.hotelcasavelas.com/", confidence: "needs verification" as Confidence, vegan: "adequate vegan support" as VeganSupport, note: "Adults-only all-inclusive; request written vegan confirmation and a refundable full tax-and-fee total." },
        { name: "La Puesta Sayulita", role: "excluded unless terms change", inventory: "King Room available; Sunset Suite and King Plush sold out", source: "https://us2.cloudbeds.com/en/reservation/qs6leV/?currency=usd&checkin=2026-10-20&checkout=2026-10-27", confidence: "needs verification" as Confidence, vegan: "requires planning" as VeganSupport, note: "The available King Room is $1,859.07 for seven nights but is nonrefundable within 60 days and therefore does not qualify. Credit-card payments also add 3%." },
        { name: "Rivera del Rio Boutique Hotel", role: "Zona Romántica candidate", inventory: "19-room boutique hotel", source: "https://www.riveradelrio.com/", confidence: "needs verification" as Confidence, vegan: "requires planning" as VeganSupport, note: "In the heart of Zona Romántica on the Río Cuale. Prioritize a king room with water or bay views; verify Oct 20–27 availability, complete price, cancellation terms and plant-based breakfast options." },
        { name: "Garza Blanca Preserve Resort & Spa", role: "candidate", inventory: "canonical resort inventory", source: "https://bookings.puertovallarta.garzablancaresort.com/booking1?language=ENGLISH&numRooms=1&startDate=20/10/2026&endDate=27/10/2026&adultsRoom1=2&namespace=tafer-garza-vallarta", confidence: "needs verification" as Confidence, vegan: "requires planning" as VeganSupport, note: "Compare the monitored live offer with the resort’s direct rate; verify the room category, included taxes and fees, cancellation deadline and meal costs before booking." },
      ],
      cost: { lodging: 2700, airfare: 850, transport: 180, meals: 1150, experiences: 400, contingency: 300, total: 5580, confidence: "estimated" as Confidence },
      monitoring: { checkedAt: "2026-08-28T08:51:06-07:00", previousTotal: 5580, deltaPercent: 0, alert: true, availability: "Casa Velas exact-week refundable inventory needs verification", refundability: "La Puesta excluded as nonrefundable", summary: "La Puesta's available King Room does not qualify because it is nonrefundable. Casa Velas remains the primary planning candidate until a qualifying refundable, all-fee rate is verified; the prior modeled total is retained." },
      flight: { origin: "PSP/SAN", destination: "PVR", cabin: "First class; nonstop preferred, no more than one stop", estimate: 850, confidence: "estimated" as Confidence },
      dining: ["The Green Place — fully plant-based", "Veggitalia — vegan Italian", "Tintoque — arrange a vegan tasting menu ahead"],
      experiences: ["A private sunset sail on Banderas Bay", "A slow gallery-and-dinner evening in Centro"],
    },
  ],
} as const;

export const extraordinary = {
  id: "extraordinary", label: "Extraordinary", target: "$10K–$12K", preserved: true, updatedAt: "2026-08-28",
  note: "Existing approved collection. Its public presentation and behavior remain unchanged.",
  properties: [
    { destination: "Puerto Vallarta", name: "Casa Suhana", dates: "2026-10-20/2026-10-27", lodging: 7200, airfare: 1200, transport: 250, meals: 1450, experiences: 550, contingency: 500, total: 11150, confidence: "needs verification" as Confidence, inventory: "private villa inventory", dining: "strong vegan support" as VeganSupport, source: "https://www.casasuhana.com/", note: "Verify seven-night villa quote, staffing, meal inclusions, taxes, service charge, deposit and cancellation terms.", monitoring: { checkedAt: "2026-08-26T06:44:55-07:00", previousTotal: null, deltaPercent: null, alert: false, summary: "Canonical public results still do not expose exact-week availability, a refundable cancellation policy, or a complete all-fee villa total; the modeled total is unchanged." } },
    { destination: "Los Cabos", name: "Casa Rayrae", dates: "2026-10-13/2026-10-20", lodging: 7000, airfare: 1200, transport: 350, meals: 1500, experiences: 500, contingency: 500, total: 11050, confidence: "needs verification" as Confidence, inventory: "private villa inventory", dining: "adequate vegan support" as VeganSupport, source: "https://www.casarayrae.com/", note: "Verify canonical listing, occupancy terms, mandatory service charges, taxes and cancellation terms.", monitoring: { checkedAt: "2026-08-26T06:44:55-07:00", previousTotal: null, deltaPercent: null, alert: false, summary: "Canonical public results still do not expose exact-week availability, a refundable cancellation policy, or a complete all-fee villa total; the modeled total is unchanged." } },
    { destination: "Moʻorea", name: "The Lagoon House", dates: "2026-10-21/2026-10-27", lodging: 5200, airfare: 3600, transport: 650, meals: 1000, experiences: 450, contingency: 600, total: 11500, confidence: "needs verification" as Confidence, inventory: "private-villa inventory", dining: "requires planning" as VeganSupport, source: "https://www.airbnb.com/", note: "Confirm exact Maharepa listing, host identity, total fees, ferry logistics and cancellation terms. Never treat unverified inventory as authoritative.", monitoring: { checkedAt: "2026-08-26T06:44:55-07:00", previousTotal: null, deltaPercent: null, alert: false, summary: "A similarly named four-bedroom lagoon-access listing remains public, but its exact identity, planned-week price, fees, and cancellation terms are not verified; the modeled total is unchanged." } },
    { destination: "Hawaiʻi Island", name: "The Westin Hāpuna Beach Resort", dates: "2026-10-20/2026-10-27", lodging: 5950, airfare: 900, transport: 250, meals: 1050, experiences: 450, contingency: 300, total: 8900, confidence: "confirmed/current" as Confidence, inventory: "Premier Ocean King with balcony", dining: "adequate vegan support" as VeganSupport, source: "https://www.marriott.com/en-us/hotels/koawi-the-westin-hapuna-beach-resort/overview/", note: "Preferred Hawaiʻi stay. The room-specific third-party total includes breakfast and reported free cancellation; reconfirm the complete total and cancellation deadline at checkout.", monitoring: { checkedAt: "2026-08-27T17:30:00-07:00", previousTotal: null, deltaPercent: null, alert: false, summary: "Premier Ocean King priced at $5,950 for seven nights; conservative trip total is $8,900." } },
    { destination: "Kauaʻi", name: "Koloa Landing Resort at Poipu, Autograph Collection", dates: "2026-10-21/2026-10-28", lodging: 8528, airfare: 900, transport: 250, meals: 1050, experiences: 450, contingency: 300, total: 11478, confidence: "needs verification" as Confidence, inventory: "one-bedroom king villa with view and balcony preferred; full-week inventory currently unavailable", dining: "adequate vegan support" as VeganSupport, source: "https://www.marriott.com/en-us/hotels/lihak-koloa-landing-resort-at-poipu-autograph-collection/overview/", note: "Fallback only if Hāpuna is dropped. Monitor October 21–28 specifically for the one-bedroom villa with a king, view and balcony; do not substitute the oversized two-bedroom villa. Reconfirm the complete total and cancellation deadline before booking.", monitoring: { checkedAt: "2026-08-28T16:00:00-07:00", previousTotal: null, deltaPercent: null, alert: false, summary: "Koloa is now aligned to the lower-airfare October 21–28 week. The preferred one-bedroom king villa is not currently available for the complete seven-night stay; continue monitoring exact-week inventory." } },
  ],
} as const;
