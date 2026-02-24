import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const repoRoot = path.resolve(import.meta.dirname, "..");

const dataFile = path.join(repoRoot, "src", "components", "portable-catalog", "data.ts");
const staticWikiDir = path.join(repoRoot, "static", "img", "wiki");

const MAX_DIMENSION = 1600;
const WEBP_QUALITY = 82;

function unique(items) {
  return Array.from(new Set(items));
}

function extractPortableCatalogPngs(source) {
  const matches = source.matchAll(/\/img\/wiki\/([^"')\s]+\.png)/g);
  return unique(Array.from(matches, (m) => m[1]));
}

async function ensureWebpForFile(pngFilename) {
  const inputPath = path.join(staticWikiDir, pngFilename);
  const outputFilename = pngFilename.replace(/\.png$/i, ".webp");
  const outputPath = path.join(staticWikiDir, outputFilename);

  if (!fs.existsSync(inputPath)) {
    return { pngFilename, status: "missing_input", inputPath };
  }

  const inputStat = fs.statSync(inputPath);
  const outputExists = fs.existsSync(outputPath);
  const outputStat = outputExists ? fs.statSync(outputPath) : null;

  if (outputExists && outputStat && outputStat.mtimeMs >= inputStat.mtimeMs) {
    return { pngFilename, status: "skipped_uptodate", outputPath };
  }

  const image = sharp(inputPath, { failOn: "none" });
  const metadata = await image.metadata();
  const width = metadata.width ?? 0;
  const height = metadata.height ?? 0;

  const resized =
    width > MAX_DIMENSION || height > MAX_DIMENSION
      ? image.resize({
          width: MAX_DIMENSION,
          height: MAX_DIMENSION,
          fit: "inside",
          withoutEnlargement: true,
        })
      : image;

  await resized.webp({ quality: WEBP_QUALITY }).toFile(outputPath);
  return { pngFilename, status: "converted", outputPath };
}

async function main() {
  const source = fs.readFileSync(dataFile, "utf8");
  const pngs = extractPortableCatalogPngs(source);

  if (pngs.length === 0) {
    console.error("No /img/wiki/*.png references found in portable catalog data.");
    process.exitCode = 1;
    return;
  }

  console.log(`Found ${pngs.length} PNG(s) referenced by portable catalog.`);

  let converted = 0;
  let skipped = 0;
  let missing = 0;

  for (const pngFilename of pngs) {
    // eslint-disable-next-line no-await-in-loop
    const result = await ensureWebpForFile(pngFilename);
    if (result.status === "converted") converted += 1;
    else if (result.status === "skipped_uptodate") skipped += 1;
    else if (result.status === "missing_input") {
      missing += 1;
      console.warn(`Missing: ${pngFilename}`);
    }
  }

  console.log(`Done. converted=${converted}, skipped=${skipped}, missing=${missing}`);
  if (missing > 0) process.exitCode = 2;
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

