import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("builds a complete self-contained S3 page", async () => {
  const html = await readFile(new URL("../dist/celebrating-sixty.html", import.meta.url), "utf8");

  assert.match(html, /Four beautiful ways/);
  assert.match(html, /Calimac Productions/);
  assert.match(html, /Casa Suhana/);
  assert.match(html, /Flora Farms/);
  assert.match(html, /Journey Café/);
  assert.match(html, /id="puerto-vallarta"/);
  assert.match(html, /All destinations/);
  assert.match(html, /Sixty is a special birthday/);
  assert.match(html, /That part belongs to you/);
  assert.match(html, /id="start"/);
  assert.match(html, /class="header-dedication" href="#">For Diane<\/a>/);
  assert.match(html, /class="book-it" href="#">Book it<\/a>/);
  assert.match(html, /data:image\/(?:jpeg|webp);base64,/);
  assert.doesNotMatch(html, /<script\b/i);
  assert.doesNotMatch(html, /(?:src|href)="\//i);
  assert.doesNotMatch(html, /http:\/\/localhost/i);
});

test("builds a private, self-contained More Possibilities chapter", async () => {
  const html = await readFile(new URL("../dist/more/index.html", import.meta.url), "utf8");
  assert.match(html, /I had a feeling/);
  assert.match(html, /It’s about going somewhere together/);
  assert.match(html, /Montecristo Estates/);
  assert.match(html, /Puerto Vallarta/);
  assert.match(html, /Waikoloa Beach Villas/);
  assert.match(html, /So… where to/);
  assert.match(html, /class="more-book-it" href="#">Book it<\/a>/);
  assert.doesNotMatch(html, /\$6K|budget|fallback|control plane|price confidence/i);
  assert.match(html, /data:image\/(?:jpeg|webp);base64,/);
  assert.doesNotMatch(html, /<script\b/i);
  assert.doesNotMatch(html, /(?:src|href)="\//i);
});

test("builds the Beautiful Week planning collection separately", async () => {
  const html = await readFile(new URL("../dist/control/index.html", import.meta.url), "utf8");
  assert.match(html, /Extraordinary/);
  assert.match(html, /Casa Suhana/);
  assert.match(html, /Casa Rayrae/);
  assert.match(html, /Hale Naiʻa/);
  assert.match(html, /The Lagoon House/);
  assert.match(html, /Horizon Overwater Villa/);
  assert.match(html, /Beautiful Week/);
  assert.match(html, /hard ceiling/);
  assert.match(html, /needs verification/);
  assert.match(html, /private-owner inventory/);
  assert.match(html, /Baseline established/);
  assert.match(html, /Previous valid total/);
  assert.match(html, /Flight assumption/);
  assert.match(html, /vegan/i);
  assert.match(html, /Latest monitoring check/);
  assert.match(html, /Hotel El Ganzo/);
  assert.match(html, /Solaz, a Luxury Collection Resort, Los Cabos/);
  assert.doesNotMatch(html, /Cabo Surf Hotel|Grand Miramar|Pueblo Bonito Pacifica|Pueblo Bonito Sunset Beach/);
  assert.doesNotMatch(html, /<script\b/i);
});
