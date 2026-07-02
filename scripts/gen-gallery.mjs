// Generates src/content/gallery.json from the images in public/gallery/.
// Runs automatically before `dev` and `build` (see package.json predev/prebuild).
import { readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { join, extname, basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const galleryDir = join(root, "public", "gallery");
const outFile = join(root, "src", "content", "gallery.json");

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

/** "annual-audit_2025.jpg" -> "Annual Audit 2025" */
function humanize(file) {
  const base = basename(file, extname(file))
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return base
    .split(" ")
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : word))
    .join(" ");
}

let files = [];
try {
  files = readdirSync(galleryDir).filter((f) =>
    IMAGE_EXTENSIONS.has(extname(f).toLowerCase()),
  );
} catch (err) {
  console.warn(`[gen-gallery] Could not read ${galleryDir}: ${err.message}`);
}

// Sort by filename, numeric-aware (IM2 before IM10).
files.sort((a, b) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }),
);

// Keep the original filename case — public URLs are case-sensitive on Vercel.
const manifest = files.map((file) => ({
  src: `/gallery/${file}`,
  alt: humanize(file) || "Directorate photo",
}));

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`[gen-gallery] Wrote ${manifest.length} image(s) to ${outFile}`);
