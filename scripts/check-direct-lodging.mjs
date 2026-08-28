import { writeFile } from "node:fs/promises";

const checkedAt = new Date().toISOString();
const results = [];
const nightsBetween = (checkIn, checkOut) => (new Date(`${checkOut}T12:00:00Z`) - new Date(`${checkIn}T12:00:00Z`)) / 86_400_000;
const compactDate = value => new Date(`${value}T12:00:00Z`).toISOString().slice(0, 10).replaceAll("-", "");
const base = (value) => ({ collectionId: "extraordinary", official: true, refundable: null, room: null, cancellationUntil: null, ...value });

async function checkCasaSuhana() {
  const checkIn = "2026-10-20";
  const checkOut = "2026-10-27";
  const pageUrl = "https://agavevillas.com/property/casa-suhana/";
  const calendarUrl = "https://syncvacationrental.com/v1/iCal/casa-suhana";
  const [page, calendar] = await Promise.all([(await fetch(pageUrl)).text(), (await fetch(calendarUrl)).text()]);
  const start = compactDate(checkIn);
  const end = compactDate(checkOut);
  const bookings = [...calendar.matchAll(/DTSTART(?:;[^:]*)?:(\d{8})[^\n]*\nDTEND(?:;[^:]*)?:(\d{8})/g)];
  const available = !bookings.some(([, bookedStart, bookedEnd]) => bookedStart < end && bookedEnd > start);
  const lowSeasonRow = page.match(/Low Season<\/td>([\s\S]*?)<\/tr>/i)?.[1] ?? "";
  const nightly = Number(lowSeasonRow.match(/\$([\d,]+)/)?.[1]?.replaceAll(",", "")) || null;
  const total = available && nightly ? nightly * nightsBetween(checkIn, checkOut) : null;
  return base({ id: "casa-suhana", destinationId: "extraordinary-1", name: "Casa Suhana", checkIn, checkOut, status: available && total ? "current" : "unavailable", availability: available, matchedProperty: "Casa Suhana", matchScore: 1, room: "5BR low-season rate", total, nightly, source: "Agave Villas direct availability calendar and published rates", bookingLink: pageUrl, reason: available ? null : "Direct availability calendar shows a conflicting booking" });
}

async function checkCasaRayrae() {
  const checkIn = "2026-10-13";
  const checkOut = "2026-10-20";
  const pageUrl = "https://www.suncabo.com/rentals/casa-rayrae";
  const params = new URLSearchParams({ checkin: "10/13/2026", checkout: "10/20/2026", propertyID: "231", roomTypeID: "", propertyName: "Casa Rayrae", hash: "", adults: "2", children: "0" });
  const response = await fetch("https://www.suncabo.com/ajax/quote", { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded; charset=UTF-8", "x-requested-with": "XMLHttpRequest" }, body: params });
  const html = await response.text();
  const total = Number(html.match(/pdp-quote-total[\s\S]*?data-price="([\d.]+)"/)?.[1]) || null;
  const bookingLink = html.match(/id="bookNowURL"[^>]*value="([^"]+)"/)?.[1]?.replaceAll("&amp;", "&") ?? pageUrl;
  const available = response.ok && total !== null && html.trim() !== "No";
  return base({ id: "casa-rayrae", destinationId: "extraordinary-2", name: "Casa Rayrae", checkIn, checkOut, status: available ? "current" : "unavailable", availability: available, matchedProperty: "Casa Rayrae", matchScore: 1, room: "4-bedroom villa", total: available ? total : null, nightly: available && total ? Math.round((total / nightsBetween(checkIn, checkOut)) * 100) / 100 : null, source: "Sun Cabo direct booking engine; total includes taxes and mandatory fees", bookingLink, reason: available ? null : "Direct booking engine reports no availability or quote" });
}

async function checkHaleNaia() {
  const checkIn = "2026-10-20";
  const checkOut = "2026-10-27";
  const pageUrl = "https://gathervacations.com/vrp/unit/1086/";
  const params = new URLSearchParams({ vrpjax: "1", act: "checkavailability", par: "1", id: "446684", checkIn, checkOut, adults: "2", children: "0", pets: "0", promo: "" });
  const response = await fetch(`https://gathervacations.com/?${params}`);
  const body = await response.json();
  const total = typeof body?.breakdown?.total === "number" ? body.breakdown.total : null;
  const available = response.ok && total !== null;
  return base({ id: "hale-naia", destinationId: "extraordinary-3", name: "Hale Naiʻa", checkIn, checkOut, status: available ? "current" : "unavailable", availability: available, matchedProperty: "Hale Nai'a", matchScore: 1, room: "Entire home", total: available ? total : null, nightly: available ? Math.round((total / nightsBetween(checkIn, checkOut)) * 100) / 100 : null, source: "Gather Vacations direct booking engine", bookingLink: pageUrl, reason: available ? null : body.detail || "Direct booking engine reports no availability" });
}

async function checkWaikoloa() {
  const checkIn = "2026-10-20";
  const checkOut = "2026-10-27";
  const pageUrl = "https://waikoloabeachvillas.com/property/#booknow";
  const params = new URLSearchParams({ propertyKey: "b247b4d5-568a-4bcd-a785-9d700bf02e3d", widgetKey: "79ec1dce-d834-46b4-9ac8-96c4e90e8b54", arrivalDate: "Tue Oct 20 2026", departureDate: "Tue Oct 27 2026", adults: "2", children: "0", pets: "" });
  const response = await fetch(`https://app.ownerrez.com/widgets/quote?${params}`);
  const body = await response.json();
  const available = body.succeeded === true;
  const total = available && typeof body.total === "number" ? body.total : null;
  return { id: "waikoloa-villas", collectionId: "beautiful-week", destinationId: "big-island", name: "Waikoloa Beach Villas", checkIn, checkOut, status: available ? "current" : "unavailable", availability: available, matchedProperty: body.gaEvent?.or_property || "Waikoloa Beach Villas", matchScore: 1, room: "Entire villa", total, nightly: total ? Math.round((total / nightsBetween(checkIn, checkOut)) * 100) / 100 : null, source: "OwnerRez direct booking engine", official: true, refundable: null, cancellationUntil: null, bookingLink: pageUrl, quotedTotal: typeof body.total === "number" ? body.total : null, reason: available ? null : (body.errors || []).join(" ") || "Direct booking engine reports no availability" };
}

for (const check of [checkCasaSuhana, checkCasaRayrae, checkHaleNaia, checkWaikoloa]) {
  try {
    results.push(await check());
  } catch (error) {
    results.push({ id: check.name.replace(/^check/, "").toLowerCase(), collectionId: "extraordinary", destinationId: "unknown", name: check.name, status: "unavailable", availability: null, total: null, nightly: null, source: "Direct booking engine", official: true, refundable: null, bookingLink: null, reason: error instanceof Error ? error.message : "Unknown direct-engine error" });
  }
}

const output = { checkedAt, source: "Direct villa booking engines", travelers: 2, bookingPolicy: "Direct availability and complete totals when the property engine exposes them", results };
await writeFile(new URL("../app/data/direct-lodging-monitor.json", import.meta.url), `${JSON.stringify(output, null, 2)}\n`);
console.log(`Wrote ${results.filter(result => result.status === "current").length}/${results.length} directly verified villa prices; ${results.filter(result => result.availability === false).length} unavailable for the selected dates.`);
