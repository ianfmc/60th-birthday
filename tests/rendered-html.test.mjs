import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("builds a complete self-contained S3 page", async () => {
  const html = await readFile(new URL("../dist/celebrating-sixty.html", import.meta.url), "utf8");

  assert.match(html, /Five beautiful ways/);
  assert.match(html, /Casa Suhana/);
  assert.match(html, /Flora Farms/);
  assert.match(html, /Journey Café/);
  assert.match(html, /data:image\/(?:jpeg|webp);base64,/);
  assert.doesNotMatch(html, /<script\b/i);
  assert.doesNotMatch(html, /(?:src|href)="\//i);
  assert.doesNotMatch(html, /http:\/\/localhost/i);
});
