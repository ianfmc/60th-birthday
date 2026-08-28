import { execFileSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";

const key = execFileSync("aws", ["ssm", "get-parameter", "--name", "/60th-birthday/serpapi-api-key", "--with-decryption", "--query", "Parameter.Value", "--output", "text", "--region", "us-east-1"], { encoding: "utf8" }).trim();
const shifts = [-2, -1, 0, 1, 2];
const addDays = (date, days) => new Date(`${date}T12:00:00Z`).toISOString().slice(0, 10).replace(/.*/, value => {
  const d = new Date(`${value}T12:00:00Z`); d.setUTCDate(d.getUTCDate() + days); return d.toISOString().slice(0, 10);
});
const searches = [
  { id: "more-cabo", label: "Los Cabos · More Possibilities", from: "PSP,SAN", to: "SJD", out: "2026-10-13", back: "2026-10-20", cabins: [[4, "First"]], airlines: "UA,AA,AM", stops: 2 },
  { id: "original-cabo", label: "Los Cabos · Original", from: "PSP,SAN", to: "SJD", out: "2026-10-13", back: "2026-10-20", cabins: [[4, "First"]], airlines: "UA,AA,AM", stops: 2 },
  { id: "puerto-vallarta", label: "Puerto Vallarta", from: "PSP,SAN", to: "PVR", out: "2026-10-20", back: "2026-10-27", cabins: [[4, "First"]], airlines: "UA,AA,AM", stops: 2 },
  { id: "kauai", label: "Kauaʻi · More Possibilities", from: "LAX", to: "LIH", out: "2026-10-20", back: "2026-10-27", cabins: [[3, "First"], [2, "Premium Economy"]], airlines: "AS,UA,AA,HA", stops: 1 },
  { id: "big-island", label: "Big Island · Original", from: "LAX", to: "KOA", out: "2026-10-20", back: "2026-10-27", cabins: [[3, "First"], [2, "Premium Economy"]], airlines: "UA,HA,AA", stops: 1 },
  { id: "tahiti", label: "Tahiti · Original", from: "LAX", to: "PPT", out: "2026-10-21", back: "2026-10-27", cabins: [[2, "Premium Economy"]], airlines: "UA,TN", stops: 1 },
];

async function query(config, shift, cabin) {
  const params = new URLSearchParams({ engine: "google_flights", departure_id: config.from, arrival_id: config.to, outbound_date: addDays(config.out, shift), return_date: addDays(config.back, shift), travel_class: String(cabin[0]), adults: "2", stops: String(config.stops), include_airlines: config.airlines, currency: "USD", hl: "en", gl: "us", no_cache: "true", api_key: key });
  const response = await fetch(`https://serpapi.com/search.json?${params}`);
  const body = await response.json();
  const offers = [...(body.best_flights || []), ...(body.other_flights || [])];
  const best = offers.sort((a, b) => a.price - b.price)[0];
  if (!best) return null;
  return { shift, cabin: cabin[1], outboundDate: addDays(config.out, shift), returnDate: addDays(config.back, shift), price: best.price, airline: [...new Set(best.flights.map(f => f.airline))].join(" + "), flights: best.flights.map(f => f.flight_number).join(" / "), origin: best.flights[0].departure_airport.id, destination: config.to, durationMinutes: best.total_duration ?? null, bookingToken: best.booking_token ?? null };
}

let previous = { results: [] };
try { previous = JSON.parse(await readFile(new URL("../app/data/flight-monitor.json", import.meta.url), "utf8")); } catch {}
const previousById = Object.fromEntries((previous.results || []).map(result => [result.id, result]));
const results = [];
for (const config of searches) {
  const offers = [];
  for (const cabin of config.cabins) for (const shift of shifts) {
    const offer = await query(config, shift, cabin);
    if (offer) offers.push(offer);
  }
  offers.sort((a, b) => a.price - b.price);
  const prior = previousById[config.id]?.best ?? null;
  const best = offers[0] ?? prior;
  const deltaPercent = offers[0] && prior ? Number((((offers[0].price - prior.price) / prior.price) * 100).toFixed(1)) : null;
  results.push({ id: config.id, label: config.label, status: offers.length ? "current" : prior ? "stale" : "unavailable", best, previousPrice: prior?.price ?? null, deltaPercent, alert: deltaPercent !== null && Math.abs(deltaPercent) > 10, alternatives: offers.slice(1, 5) });
}
const output = { checkedAt: new Date().toISOString(), source: "Google Flights via SerpApi", travelers: 2, datePolicy: "Planned dates plus whole-trip shifts of ±1 and ±2 days", results };
await writeFile(new URL("../app/data/flight-monitor.json", import.meta.url), `${JSON.stringify(output, null, 2)}\n`);
console.log(`Wrote ${results.filter(r => r.best).length}/${results.length} live flight scenarios.`);
