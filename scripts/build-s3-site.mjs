import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, extname, resolve } from "node:path";

const root = process.cwd();
const mimeTypes = {
  ".css": "text/css",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

const localPath = (url) => resolve(root, url.startsWith("/_next/") ? `out${url}` : `public${url}`);
const asDataUrl = async (url) => {
  const file = localPath(url);
  const mime = mimeTypes[extname(file).toLowerCase()];
  if (!mime) throw new Error(`Unsupported embedded asset: ${url}`);
  return `data:${mime};base64,${(await readFile(file)).toString("base64")}`;
};

const pages = [
  ["out/index.html", "dist/celebrating-sixty.html"],
  ["out/more/index.html", "dist/more/index.html"],
  ["out/control/index.html", "dist/control/index.html"],
];

for (const [source, output] of pages) {
  let html = await readFile(resolve(root, source), "utf8");
  if (source === "out/index.html") {
    const moreUrl = (process.env.MORE_URL || "#").replaceAll("&", "&amp;");
    html = html.replace('href="/more/"', `href="${moreUrl}"`);
  }
  const stylesheets = [...html.matchAll(/<link rel="stylesheet" href="([^"]+)"[^>]*>/g)];
  for (const match of stylesheets) {
    const css = await readFile(localPath(match[1]), "utf8");
    html = html.replace(match[0], `<style>${css}</style>`);
  }
  const imageUrls = new Set(
    [...html.matchAll(/(?:src|href|content)="(\/(?:places\/[^"?#]+|restaurants\/[^"?#]+|favicon\.svg|og\.png))"/g)].map((match) => match[1]),
  );
  for (const url of imageUrls) html = html.replaceAll(url, await asDataUrl(url));
  html = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "")
    .replace(/<link rel="preload"[^>]+as="script"[^>]*>/g, "")
    .replace(/<link rel="preload"[^>]+href="\/_next\/[^>]*>/g, "")
    .replace(/<link rel="modulepreload"[^>]*>/g, "")
    .replace(/<!--\$-->|<!--\/\$-->/g, "");
  const outputPath = resolve(root, output);
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html);
  console.log(`Built ${outputPath}`);
}
