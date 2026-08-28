import { execFileSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";

const apiKey = execFileSync("aws", ["ssm", "get-parameter", "--name", "/60th-birthday/serpapi-api-key", "--with-decryption", "--query", "Parameter.Value", "--output", "text", "--region", "us-east-1"], { encoding: "utf8" }).trim();

const stays = [
  { id: "casa-suhana", collectionId: "extraordinary", destinationId: "extraordinary-1", name: "Casa Suhana", query: "Casa Suhana Puerto Vallarta", checkIn: "2026-10-20", checkOut: "2026-10-27" },
  { id: "casa-rayrae", collectionId: "extraordinary", destinationId: "extraordinary-2", name: "Casa Rayrae", query: "Casa Rayrae Los Cabos", checkIn: "2026-10-13", checkOut: "2026-10-20" },
  { id: "lagoon-house", collectionId: "extraordinary", destinationId: "extraordinary-3", name: "The Lagoon House", query: "The Lagoon House Moorea", checkIn: "2026-10-21", checkOut: "2026-10-27" },
  { id: "manava-moorea", collectionId: "extraordinary", destinationId: "extraordinary-4", name: "Hotel Manava Beach Resort & Spa Moorea", query: "Hotel Manava Beach Resort & Spa Moorea", checkIn: "2026-10-21", checkOut: "2026-10-27", roomPattern: /(king.*overwater|overwater.*king)/i },
  { id: "westin-hapuna", collectionId: "extraordinary", destinationId: "extraordinary-5", name: "The Westin Hāpuna Beach Resort", query: "Westin Hapuna Beach Resort", checkIn: "2026-10-20", checkOut: "2026-10-27", roomPattern: /(king.*(ocean|view|balcony)|(ocean|view|balcony).*king)/i },
  { id: "koloa-landing", collectionId: "extraordinary", destinationId: "extraordinary-6", name: "Koloa Landing Resort at Poipu, Autograph Collection", query: "Koloa Landing Resort Poipu", checkIn: "2026-10-20", checkOut: "2026-10-27", roomPattern: /(king.*(ocean|view|balcony)|(ocean|view|balcony).*king)/i },
  { id: "montecristo", collectionId: "beautiful-week", destinationId: "cabo", name: "Montecristo Estates", query: "Montecristo Estates Los Cabos", checkIn: "2026-10-13", checkOut: "2026-10-20", roomPattern: /((3|three) bedrooms?.*(ocean|view)|(ocean|view).*(3|three) bedrooms?)/i },
  { id: "el-ganzo", collectionId: "beautiful-week", destinationId: "cabo", name: "Hotel El Ganzo", query: "Hotel El Ganzo Los Cabos", checkIn: "2026-10-13", checkOut: "2026-10-20", roomPattern: /(king.*(ocean|view)|(ocean|view).*king)/i },
  { id: "solaz", collectionId: "beautiful-week", destinationId: "cabo", name: "Solaz, a Luxury Collection Resort, Los Cabos", query: "Solaz Luxury Collection Resort Los Cabos", checkIn: "2026-10-13", checkOut: "2026-10-20", roomPattern: /(king.*(ocean|sea|view)|(ocean|sea|view).*king)/i },
  { id: "casa-velas", collectionId: "beautiful-week", destinationId: "puerto-vallarta", name: "Casa Velas", query: "Casa Velas Puerto Vallarta", checkIn: "2026-10-20", checkOut: "2026-10-27", roomPattern: /(king.*(ocean|water|view)|(ocean|water|view).*king)/i },
  { id: "la-puesta-sayulita", collectionId: "beautiful-week", destinationId: "puerto-vallarta", name: "La Puesta Sayulita", query: "La Puesta Sayulita", checkIn: "2026-10-20", checkOut: "2026-10-27", roomPattern: /(king.*(ocean|water|view|sunset)|(ocean|water|view|sunset).*king)/i },
  { id: "rivera-del-rio", collectionId: "beautiful-week", destinationId: "puerto-vallarta", name: "Rivera del Rio Boutique Hotel", query: "Rivera del Rio Boutique Hotel Puerto Vallarta", checkIn: "2026-10-20", checkOut: "2026-10-27", roomPattern: /(king.*(ocean|river|water|bay|view)|(ocean|river|water|bay|view).*king)/i },
  { id: "garza-blanca", collectionId: "beautiful-week", destinationId: "puerto-vallarta", name: "Garza Blanca Preserve Resort & Spa", query: "Garza Blanca Preserve Resort Puerto Vallarta", checkIn: "2026-10-20", checkOut: "2026-10-27", roomPattern: /(king.*(ocean|water|view)|(ocean|water|view).*king)/i },
];

const normalize = value => value.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, " ").trim();
const scoreMatch = (candidate, target) => {
  const words = normalize(target).split(" ").filter(word => word.length > 2);
  const haystack = normalize(candidate);
  return words.filter(word => haystack.includes(word)).length / Math.max(words.length, 1);
};
const numeric = value => typeof value === "number" ? value : null;

async function fetchHotels(stay) {
  const params = new URLSearchParams({ engine: "google_hotels", q: stay.query, check_in_date: stay.checkIn, check_out_date: stay.checkOut, adults: "2", children: "0", currency: "USD", gl: "us", hl: "en", no_cache: "true", api_key: apiKey });
  const response = await fetch(`https://serpapi.com/search.json?${params}`);
  if (!response.ok) throw new Error(`SerpApi HTTP ${response.status}`);
  return response.json();
}

async function fetchPropertyDetails(stay, propertyToken) {
  const params = new URLSearchParams({ engine: "google_hotels", q: stay.query, property_token: propertyToken, check_in_date: stay.checkIn, check_out_date: stay.checkOut, adults: "2", children: "0", currency: "USD", gl: "us", hl: "en", api_key: apiKey });
  const response = await fetch(`https://serpapi.com/search.json?${params}`);
  if (!response.ok) throw new Error(`SerpApi property details HTTP ${response.status}`);
  return response.json();
}

function completeOffers(property) {
  const propertyLevel = numeric(property?.total_rate?.extracted_lowest) !== null
    ? [{ source: property.price_source || "Google Hotels lowest listed offer", official: false, room: null, link: property.link || null, free_cancellation: property.free_cancellation === true, free_cancellation_until_date: null, rate_per_night: property.rate_per_night, total_rate: property.total_rate }]
    : [];
  const simple = (property?.prices || []).map(price => ({ ...price, room: null }));
  const featured = (property?.featured_prices || []).flatMap(price => [
    { ...price, room: null },
    ...(price.rooms || []).flatMap(room => (room.rates || []).map(rate => ({ ...rate, source: price.source, official: price.official === true, room: room.name, link: rate.link || room.link || price.link }))),
  ]);
  return [...propertyLevel, ...simple, ...featured].filter(price => price.free_cancellation === true && numeric(price.total_rate?.extracted_lowest) !== null);
}

let previous = { results: [] };
try { previous = JSON.parse(await readFile(new URL("../app/data/lodging-monitor.json", import.meta.url), "utf8")); } catch {}
const previousById = Object.fromEntries((previous.results || []).map(result => [result.id, result]));
const results = [];
for (const stay of stays) {
  try {
    const body = await fetchHotels(stay);
    const directProperty = body.search_information?.hotels_results_state === "Showing results for property details" && body.name ? body : null;
    const candidates = [...(directProperty ? [directProperty] : []), ...(body.properties || [])].map(property => ({ property, score: scoreMatch(property.name || "", stay.name) })).sort((a, b) => b.score - a.score);
    const match = candidates[0]?.score >= 0.8 ? candidates[0].property : null;
    const detailsResponse = match?.property_token && match !== directProperty ? await fetchPropertyDetails(stay, match.property_token) : null;
    const details = detailsResponse?.name ? detailsResponse : match;
    const offers = completeOffers(details);
    const qualifyingOffers = stay.roomPattern ? offers.filter(offer => stay.roomPattern.test(offer.room || "")) : offers;
    const offer = qualifyingOffers.sort((a, b) => Number(b.official === true) - Number(a.official === true) || (numeric(a.total_rate?.extracted_lowest) ?? Infinity) - (numeric(b.total_rate?.extracted_lowest) ?? Infinity))[0] ?? null;
    const total = numeric(offer?.total_rate?.extracted_lowest);
    results.push({ ...stay, roomPattern: undefined, status: offer && total ? "current" : "unavailable", matchedProperty: details?.name ?? match?.name ?? null, matchScore: candidates[0]?.score ?? 0, room: offer?.room ?? null, total, nightly: numeric(offer?.rate_per_night?.extracted_lowest), source: offer?.source ?? null, official: offer?.official === true, refundable: offer ? true : null, cancellationUntil: offer?.free_cancellation_until_date ?? null, bookingLink: offer?.link ?? null, reason: body.error || (!match ? "Property not found in Google Hotels" : !offers.length ? "No refundable offer with a complete total returned" : !qualifyingOffers.length ? "No refundable king-with-view offer with a complete total returned" : !total ? "Refundable offer did not include a complete total" : null) });
  } catch (error) {
    const prior = previousById[stay.id];
    results.push(prior?.total ? { ...prior, ...stay, status: "stale", reason: `Refresh failed; prior valid result preserved. ${error instanceof Error ? error.message : "Unknown error"}` } : { ...stay, status: "unavailable", matchedProperty: null, matchScore: 0, total: null, nightly: null, source: null, official: false, refundable: null, bookingLink: null, reason: error instanceof Error ? error.message : "Unknown error" });
  }
}

const output = { checkedAt: new Date().toISOString(), source: "Google Hotels via SerpApi; refundable offers with complete totals", travelers: 2, bookingPolicy: "Refundable rates only; totals must include taxes and mandatory fees when returned", results };
await writeFile(new URL("../app/data/lodging-monitor.json", import.meta.url), `${JSON.stringify(output, null, 2)}\n`);
console.log(`Wrote ${results.filter(result => result.status === "current").length}/${results.length} lodging prices with complete totals.`);
