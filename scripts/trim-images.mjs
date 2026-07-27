#!/usr/bin/env node
/**
 * Trims transparent pixels from all PNGs in public/samples/
 * and resizes to fit within a max dimension (default 400px).
 *
 * Usage: node scripts/trim-images.mjs [--max 400]
 */
import sharp from "sharp";
import { readdir } from "fs/promises";
import { join } from "path";

const SAMPLES_DIR = join(import.meta.dirname, "../public/samples");
const MAX_SIZE = parseInt(process.argv[process.argv.indexOf("--max") + 1]) || 800;

const files = (await readdir(SAMPLES_DIR)).filter((f) =>
  f.toLowerCase().endsWith(".png")
);

console.log(`Processing ${files.length} images (max ${MAX_SIZE}px)...\n`);

for (const file of files) {
  const filePath = join(SAMPLES_DIR, file);
  const original = sharp(filePath);
  const { width: origW, height: origH } = await original.metadata();

  const trimmed = await original.trim().toBuffer({ resolveWithObject: true });
  const { width: trimW, height: trimH } = trimmed.info;

  // Resize if larger than max
  let final = sharp(trimmed.data);
  let resized = false;
  if (trimW > MAX_SIZE || trimH > MAX_SIZE) {
    final = final.resize(MAX_SIZE, MAX_SIZE, { fit: "inside" });
    resized = true;
  }

  await final.png().toFile(filePath);

  const { width: finalW, height: finalH } = await sharp(filePath).metadata();
  console.log(
    `  ${file}: ${origW}x${origH} → trimmed ${trimW}x${trimH}${resized ? ` → resized ${finalW}x${finalH}` : ""}`
  );
}

console.log("\nDone.");
